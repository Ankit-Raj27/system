import { prisma } from '../prisma';
import { QuestType, Category, Difficulty } from '@prisma/client';

export async function runDailySystemReset() {
  const hunters = await prisma.hunter.findMany();

  for (const hunter of hunters) {
    // 1. Restore Mana to max (assume 100 for now or add to model)
    await prisma.hunter.update({
      where: { id: hunter.id },
      data: { mana: 100 },
    });

    // 2. Check for incomplete daily quests from yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const incompleteDailies = await prisma.quest.findMany({
      where: {
        hunterId: hunter.id,
        type: QuestType.DAILY,
        completedAt: null,
        createdAt: {
          gte: yesterday,
        },
      },
    });

    if (incompleteDailies.length > 0) {
      // 2.1 Generate Penalty Quests
      for (const missed of incompleteDailies) {
        await prisma.penalty.create({
          data: {
            hunterId: hunter.id,
            reason: `Failed to complete daily quest: ${missed.title}`,
          },
        });
        
        // Mark as failed
        await prisma.quest.update({
          where: { id: missed.id },
          data: { failedAt: new Date() }
        });
      }
      
      // Reset streak if dailies missed
      await prisma.hunter.update({
        where: { id: hunter.id },
        data: { streakDays: 0 }
      });
    } else {
      // If all dailies done, increment streak
      await prisma.hunter.update({
        where: { id: hunter.id },
        data: { streakDays: { increment: 1 } }
      });
    }

    // 3. Generate 4 new Daily Quests
    const dailyCategories = [Category.WORK, Category.LEARNING, Category.FITNESS, Category.LIFE];
    
    for (const cat of dailyCategories) {
      await prisma.quest.create({
        data: {
          hunterId: hunter.id,
          type: QuestType.DAILY,
          category: cat,
          title: `Daily ${cat.toLowerCase()} ritual`,
          description: `Maintain consistency in your ${cat.toLowerCase()} path.`,
          difficulty: Difficulty.D,
          expReward: 50,
          goldReward: 10,
          deadline: new Date(new Date().setHours(23, 59, 59, 999)),
        }
      });
    }
  }
}
