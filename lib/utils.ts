import { LEVEL_XP_TABLE, TIER_CONFIG, type RankTier, type User } from "./data";

export function getLevelProgress(xp: number, level: number) {
  const currentLevelXp = LEVEL_XP_TABLE[level - 1] ?? 0;
  const nextLevelXp = LEVEL_XP_TABLE[level] ?? LEVEL_XP_TABLE[level - 1] + 1000;
  const progress = ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
  return { progress: Math.min(100, Math.max(0, progress)), nextLevelXp, currentLevelXp };
}

export function getTierForLevel(level: number): RankTier {
  const tiers = Object.entries(TIER_CONFIG) as [RankTier, typeof TIER_CONFIG[RankTier]][];
  const sorted = tiers.sort((a, b) => b[1].minLevel - a[1].minLevel);
  return sorted.find(([, v]) => level >= v.minLevel)?.[0] ?? "seedling";
}

export function formatCo2(kg: number): string {
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)}t`;
  return `${kg.toFixed(1)}kg`;
}

export function formatXp(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
  return `${xp}`;
}

export function getXpForVehicle(vehicle: string, km: number): number {
  const rates: Record<string, number> = { walk: 30, bike: 25, ebike: 20, scooter: 18, metro: 15, bus: 12, carpool: 8 };
  return Math.round((rates[vehicle] ?? 10) * km);
}

export function getCo2Saved(vehicle: string, km: number): number {
  const avgCarEmission = 0.21; // kg CO2 per km
  const rates: Record<string, number> = { walk: 0, bike: 0, ebike: 0.02, scooter: 0.05, metro: 0.04, bus: 0.06, carpool: 0.08 };
  return Math.round(((avgCarEmission - (rates[vehicle] ?? 0.1)) * km) * 100) / 100;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
