import { prisma } from '../prisma';
import { Rank } from '@prisma/client';

export async function getOrCreateHunter(hunterId: string = 'ankit-shadow-monarch') {
  let hunter = await prisma.hunter.findUnique({
    where: { id: hunterId },
    include: {
      quests: { where: { completedAt: null }, take: 5 },
      bosses: { where: { completed: false }, take: 1 },
      penalties: { where: { resolved: false } }
    }
  });

  if (!hunter) {
    hunter = await prisma.hunter.create({
      data: {
        id: hunterId,
        level: 1,
        rank: Rank.E,
        strength: 10,
        intelligence: 10,
        endurance: 10,
        focus: 10,
        discipline: 10,
        mana: 100,
        fatigue: 0,
        exp: 0,
        gold: 0,
      },
      include: {
        quests: true,
        bosses: true,
        penalties: true
      }
    });
  }

  return hunter;
}
