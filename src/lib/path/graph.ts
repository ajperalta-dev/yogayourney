import { finishGame, streakReward } from "./game";
import type { Exercise, Lesson, PathProgress, Session, Unit } from "./models";
import { finishLesson, metrics, unlocked } from "./engine";
import { l } from "../utils";

export function assessment(unit: Unit, exercises: Exercise[], mode: "checkpoint" | "placement"): Lesson | null {
  const pool = exercises.filter(e => e.unitId === unit.id);
  // Interleave lessons and types; do not inflate small banks by duplicating questions.
  const selected: Exercise[] = [];
  const pending = [...pool];
  while (pending.length) {
    const previous = selected.at(-1);
    let index = pending.findIndex(e => e.lessonId !== previous?.lessonId && e.type !== previous?.type);
    if (index < 0) index = pending.findIndex(e => e.type !== previous?.type);
    selected.push(pending.splice(Math.max(0, index), 1)[0]);
  }
  const count = mode === "checkpoint" ? 15 : 8;
  if (selected.length < count) return null;
  return { id: `${unit.id}-${mode}`, unitId: unit.id, name: mode === "checkpoint" ? l("Punto de control", "Checkpoint") : l("Saltar adelante", "Skip ahead"), minutes: mode === "checkpoint" ? 5 : 3, checkpoint: mode === "checkpoint", exerciseIds: selected.slice(0, count).map(e => e.id) };
}
export function canStart(lesson: Lesson, unit: Unit, progress: PathProgress): boolean {
  if (lesson.id === `${unit.id}-placement`) return true;
  if (lesson.id === `${unit.id}-checkpoint`) return unit.lessons.every(l => progress.completed.includes(l.id)) || !!progress.unlockedUnits?.includes(unit.id);
  return unit.lessons.some(l => l.id === lesson.id) && (unlocked(lesson.id, unit.lessons, progress) || !!progress.unlockedUnits?.includes(unit.id));
}
export function nodeState(lesson: Lesson, unit: Unit, progress: PathProgress) {
  if (progress.nodes[lesson.id]?.mastery === 5) return "mastered";
  if (progress.completed.includes(lesson.id)) return "completed";
  if (progress.active?.lessonId === lesson.id && !progress.active.finished) return "in-progress";
  return canStart(lesson, unit, progress) ? "available" : "locked";
}
export function completePathSession(progress: PathProgress, session: Session, lesson: Lesson, date: string): PathProgress {
  if (progress.rewardedSessions.includes(session.id)) return { ...progress, active: session };
  const next = finishLesson(progress, session, date);
  const exam = lesson.checkpoint || lesson.id.endsWith("-placement");
  if (exam && metrics(session).accuracy < .8) next.completed = [...progress.completed];
  if (!session.reviewOnly && lesson.id.endsWith("-placement") && metrics(session).accuracy >= .8) next.unlockedUnits = [...new Set([...(progress.unlockedUnits ?? []), lesson.unitId])];
  if (session.reviewOnly) {next.completed=[...progress.completed];next.nodes={...progress.nodes};next.unlockedUnits=progress.unlockedUnits;}
  return finishGame(progress,{ ...next, active: session },session,date);
}
export function localDay(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}
export function streakToday(progress: PathProgress, today: string) {
  if (!progress.lastActivity) return 0;
  const gap = (Date.parse(today) - Date.parse(progress.lastActivity)) / 86400000;
  return gap >= 0 && (gap <= 1 || gap === 2 && streakReward(progress,today).frozen) ? progress.streak : 0;
}
