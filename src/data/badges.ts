import type { BadgeDef } from '@/types';

export const BADGES: Record<string, BadgeDef> = {
  eco_starter:      { icon: '🌱', name: 'Eco Starter' },
  detective:        { icon: '🔎', name: 'Environmental Detective' },
  investigator:     { icon: '🔬', name: 'Science Investigator' },
  climate_explorer: { icon: '🌍', name: 'Climate Explorer' },
  waste_warrior:    { icon: '♻️', name: 'Waste Warrior' },
  biodiversity:     { icon: '🌳', name: 'Biodiversity Guardian' },
  data_detective:   { icon: '📊', name: 'Data Detective' },
  critical_thinker: { icon: '🧠', name: 'Critical Thinker' },
  problem_solver:   { icon: '🌏', name: 'Eco Problem Solver' },
};

export const MASTERY_THRESHOLD = 80;