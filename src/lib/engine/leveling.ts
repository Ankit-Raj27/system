export enum Rank {
  E = 'E',
  D = 'D',
  C = 'C',
  B = 'B',
  A = 'A',
  S = 'S',
}

export interface LevelStats {
  level: number;
  rank: Rank;
  currentExp: number;
  expToNextLevel: number;
  totalExpToNext: number;
}

/**
 * Calculates level and rank based on cumulative experience.
 * Formula: expForLevel(L) = 100 * (L)^1.5
 * Rank Thresholds: 
 * E: 1-10, D: 11-20, C: 21-35, B: 36-55, A: 56-80, S: 81-100
 */
export function calculateLevelRankAndRollover(totalExp: number): LevelStats {
  let level = 1;
  let expRequired = 100; // Requirement for Level 1 -> 2

  while (totalExp >= expRequired) {
    totalExp -= expRequired;
    level++;
    expRequired = Math.floor(100 * Math.pow(level, 1.5));
  }

  const rank = calculateRank(level);

  return {
    level,
    rank,
    currentExp: totalExp,
    expToNextLevel: expRequired,
    totalExpToNext: expRequired - totalExp,
  };
}

function calculateRank(level: number): Rank {
  if (level <= 10) return Rank.E;
  if (level <= 20) return Rank.D;
  if (level <= 35) return Rank.C;
  if (level <= 55) return Rank.B;
  if (level <= 80) return Rank.A;
  return Rank.S;
}
