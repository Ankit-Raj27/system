import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { prisma } from '@/lib/prisma';
import { calculateLevelRankAndRollover } from '@/lib/engine/leveling';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { notionPageId, hunterId, type } = await req.json();

    // 1. Fetch the Quest details from Notion to validate reward
    const page: any = await notion.pages.retrieve({ page_id: notionPageId });
    const properties = page.properties;

    // Detect properties based on database type (DSA, LLD, HLD, etc.)
    const title = properties.Quest?.title[0]?.plain_text || properties.Concept?.title[0]?.plain_text || properties.Module?.title[0]?.plain_text;
    const rankValue = properties.Rank?.select?.name || 'E-Rank (Easy)';
    
    // Calculate Reward based on Rank
    let expReward = 50;
    let goldReward = 10;
    if (rankValue.includes('C')) expReward = 100;
    if (rankValue.includes('S')) expReward = 250;

    // 2. Update Notion: Mark as Cleared
    await notion.pages.update({
      page_id: notionPageId,
      properties: {
        'Status': { select: { name: type === 'DSA' ? 'Dungeon Cleared' : 'Mastered' } }
      }
    });

    // 3. Update Prisma: Grant Hunter Rewards
    const hunter = await prisma.hunter.update({
      where: { id: hunterId || 'ankit-shadow-monarch' },
      data: {
        exp: { increment: expReward },
        gold: { increment: goldReward },
        discipline: { increment: 1 },
        intelligence: { increment: type === 'HLD' || type === 'LLD' ? 2 : 0 },
        strength: { increment: type === 'FITNESS' ? 2 : 0 }
      }
    });

    // 4. Handle Leveling/Ranking
    const newStats = calculateLevelRankAndRollover(hunter.exp);
    await prisma.hunter.update({
      where: { id: hunter.id },
      data: {
        level: newStats.level,
        rank: newStats.rank as any
      }
    });

    return NextResponse.json({ 
      success: true, 
      title,
      reward: { exp: expReward, gold: goldReward },
      newLevel: newStats.level,
      newRank: newStats.rank
    });

  } catch (error: any) {
    console.error("Completion Bridge Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
