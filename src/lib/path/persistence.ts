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
  const active = p.active;
  const strings = (v: unknown): v is string[] => Array.isArray(v) && v.every(id => typeof id === "string");
  const validActive = active && typeof active.id === "string" && typeof active.lessonId === "string" && strings(active.queue) && strings(active.mastered) && strings(active.mistakes) && integer(active.total) && active.total >= 1 && active.total <= 15 && integer(active.attempts) && integer(active.correct) && active.correct === active.mastered.length && active.attempts === active.correct + active.mistakes.length && active.queue.length + active.mastered.length === active.total && new Set([...active.queue,...active.mastered]).size === active.total && active.finished === (active.queue.length === 0) && (active.seconds === undefined || integer(active.seconds)) && (active.awardedSeconds === undefined || integer(active.awardedSeconds) && active.awardedSeconds <= (active.seconds??0)) && (active.awardedXp === undefined || integer(active.awardedXp) && active.awardedXp <= active.correct*10) && (active.reviewOnly === undefined || typeof active.reviewOnly === "boolean");
  const g=p.game;
  const validGame=g && integer(g.correctAnswers) && g.goal && ["minutes","lessons"].includes(g.goal.type) && (g.goal.type==="minutes"?[5,10,15,20]:[1,2,3,4]).includes(g.goal.target) && g.days && typeof g.days==="object" && !Array.isArray(g.days) && Object.entries(g.days).every(([key,d])=>date(key)&&d&&integer(d.seconds)&&integer(d.lessons)) && strings(g.frozenWeeks)&&g.frozenWeeks.every(date)&&strings(g.badges);
  const r=p.reviews;
  const validReviews=r && typeof r==="object"&&!Array.isArray(r)&&Object.values(r).every(v=>v&&integer(v.box)&&v.box<=5&&date(v.due)&&date(v.last)&&integer(v.correct)&&integer(v.wrong)&&typeof v.contentId==="string"&&(v.flashcardId===undefined||typeof v.flashcardId==="string"));
  return { ...p, reviews:validReviews?r:undefined, game:validGame?g:undefined, active: validActive ? active : undefined, unlockedUnits: strings(p.unlockedUnits) ? p.unlockedUnits : [], legacyImported: true };
}
