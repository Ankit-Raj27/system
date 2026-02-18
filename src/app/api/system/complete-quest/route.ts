import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateLevelRankAndRollover } from '@/lib/engine/leveling';

export async function POST(req: NextRequest) {
  try {
    const { questId, hunterId } = await req.json();

    // 1. Fetch Quest and Hunter
    const quest = await prisma.quest.findUnique({
      where: { id: questId },
    });

    if (!quest || quest.completedAt || quest.failedAt) {
      return NextResponse.json({ error: "Quest invalid or already completed" }, { status: 400 });
    }

    if (quest.deadline && new Date() > quest.deadline) {
      return NextResponse.json({ error: "Quest deadline passed" }, { status: 400 });
    }

    // 2. Grant Rewards
    const hunter = await prisma.hunter.update({
      where: { id: hunterId },
      data: {
        exp: { increment: quest.expReward },
        gold: { increment: quest.goldReward },
        // Apply stat rewards if JSON exists
        ...(quest.statReward as any)
      }
    });

    // 3. Mark Quest Completed
    await prisma.quest.update({
      where: { id: questId },
      data: { completedAt: new Date() }
    });

    // 4. Check for Boss HP reduction (if quest difficulty >= B)
    if (quest.difficulty === 'B' || quest.difficulty === 'A' || quest.difficulty === 'S') {
      const activeBoss = await prisma.boss.findFirst({
        where: { hunterId, completed: false }
      });
      
      if (activeBoss) {
        const damage = Math.floor(quest.expReward / 10);
        const newHp = Math.max(0, activeBoss.hp - damage);
        
        await prisma.boss.update({
          where: { id: activeBoss.id },
          data: { 
            hp: newHp,
            completed: newHp === 0
          }
        });
      }
    }

    // 5. Recalculate Rank and Level
    const newStats = calculateLevelRankAndRollover(hunter.exp);
    
    await prisma.hunter.update({
      where: { id: hunterId },
      data: {
        level: newStats.level,
        rank: newStats.rank as any
      }
    });

    return NextResponse.json({ 
      success: true, 
      hunter: {
        level: newStats.level,
        rank: newStats.rank,
        exp: hunter.exp
      } 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
