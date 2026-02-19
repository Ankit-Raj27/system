import { prisma } from '../prisma';

export async function updateVitalsFromDaily(hunterId: string = 'ankit-shadow-monarch', health: number, mana: number) {
  const fatigue = Math.max(0, Math.min(100, (10 - health) * 10));
  const updatedHunter = await prisma.hunter.update({
    where: { id: hunterId },
    data: {
      fatigue: fatigue,
      mana: Math.max(0, Math.min(100, mana)),
      lastActiveAt: new Date()
    }
  });
  return updatedHunter;
}

export async function addExperience(hunterId: string = 'ankit-shadow-monarch', amount: number) {
  const hunter = await prisma.hunter.findUnique({ where: { id: hunterId } });
  if (!hunter) return null;
  let newExp = hunter.exp + amount;
  let newLevel = hunter.level;
  while (newExp >= 1000) {
    newExp -= 1000;
    newLevel += 1;
  }
  return await prisma.hunter.update({
    where: { id: hunterId },
    data: { exp: newExp, level: newLevel }
  });
}
