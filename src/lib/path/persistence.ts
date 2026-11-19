import { emptyPath } from "./engine";
import type { PathProgress } from "./models";
// Legacy quiz/card data remain authoritative in PersonalState. Aggregate results
// cannot identify Path nodes, so they never award XP or unlock new lessons.
export function parsePath(value: unknown): PathProgress {
  const fallback = emptyPath();
  if (value === undefined) return fallback;
  if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;
  const p = value as PathProgress;
  const integer = (v: unknown) => typeof v === "number" && Number.isSafeInteger(v) && v >= 0;
  const date = (v: unknown) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && Number.isFinite(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v;
  if (p.version !== 1 || !Array.isArray(p.rewardedSessions) || !p.rewardedSessions.every(id => typeof id === "string") || !Array.isArray(p.completed) || !p.completed.every(id => typeof id === "string") || !integer(p.xp) || !integer(p.streak) || !integer(p.dailyXp) || !integer(p.dailyGoal) || p.dailyGoal < 1 || !(p.lastActivity === null || date(p.lastActivity)) || !p.nodes || Array.isArray(p.nodes) || typeof p.nodes !== "object" || !p.errors || Array.isArray(p.errors) || typeof p.errors !== "object" || !Object.values(p.errors).every(integer) || !Object.values(p.nodes).every(n => n && integer(n.mastery) && n.mastery <= 5 && integer(n.box) && n.box <= 5 && date(n.nextReview))) return fallback;
  return { ...p, legacyImported: true };
}
