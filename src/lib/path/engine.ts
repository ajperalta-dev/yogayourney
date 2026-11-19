import type { Lesson, PathProgress, Session } from "./models";
export const emptyPath = (): PathProgress => ({ version: 1, rewardedSessions: [], completed: [], nodes: {}, xp: 0, streak: 0, dailyGoal: 20, dailyXp: 0, lastActivity: null, errors: {}, legacyImported: true });
export function startLesson(lesson: Lesson): Session {
  if (lesson.exerciseIds.length < 8 || lesson.exerciseIds.length > 12 || new Set(lesson.exerciseIds).size !== lesson.exerciseIds.length) throw new Error("Invalid lesson");
  return { id: crypto.randomUUID(), lessonId: lesson.id, queue: [...lesson.exerciseIds], total: lesson.exerciseIds.length, mastered: [], attempts: 0, correct: 0, mistakes: [], finished: false };
}
export function answer(session: Session, correct: boolean): Session {
  if (session.finished || !session.queue.length) return session;
  const [id, ...rest] = session.queue;
  const queue = correct ? rest : [...rest, id];
  return { ...session, queue, attempts: session.attempts + 1, correct: session.correct + Number(correct), mastered: correct ? [...session.mastered, id] : session.mastered, mistakes: correct ? session.mistakes : [...session.mistakes, id], finished: queue.length === 0 };
}
export function metrics(session: Session) {
  const accuracy = session.attempts ? session.correct / session.attempts : 0;
  return { progress: session.mastered.length / session.total, accuracy, xp: session.finished ? Math.round(accuracy * session.total * 10) : 0 };
}
export function unlocked(lessonId: string, lessons: Lesson[], progress: PathProgress): boolean {
  const index = lessons.findIndex(l => l.id === lessonId);
  return index >= 0 && (index === 0 || progress.completed.includes(lessons[index - 1].id));
}
// Calendar dates are supplied by the caller in the device's local timezone.
const day = (date: string) => { if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new Error("Invalid date"); return Date.parse(date) / 86400000; };
export function finishLesson(progress: PathProgress, session: Session, date: string): PathProgress {
  if (!session.finished) throw new Error("Lesson unfinished");
  if (progress.rewardedSessions.includes(session.id)) return progress;
  const today = day(date), last = progress.lastActivity ? day(progress.lastActivity) : null;
  if (last !== null && today < last) throw new Error("Activity cannot move backwards");
  const accuracy = metrics(session).accuracy;
  const old = progress.nodes[session.lessonId];
  const box = session.mistakes.length ? 0 : Math.min(5, (old?.box ?? 0) + 1);
  const nextReview = new Date((today + [1, 2, 4, 7, 14, 30][box]) * 86400000).toISOString().slice(0, 10);
  const errors = { ...progress.errors };
  session.mistakes.forEach(id => { errors[id] = (errors[id] ?? 0) + 1; });
  const xp = metrics(session).xp;
  return { ...progress, rewardedSessions: [...progress.rewardedSessions, session.id], completed: [...new Set([...progress.completed, session.lessonId])], nodes: { ...progress.nodes, [session.lessonId]: { box, nextReview, mastery: Math.min(5, Math.max(0, (old?.mastery ?? 0) + (accuracy >= .8 ? 1 : -1))) } }, xp: progress.xp + xp, dailyXp: (last === today ? progress.dailyXp : 0) + xp, streak: last === today ? progress.streak : last === today - 1 ? progress.streak + 1 : 1, lastActivity: date, errors };
}
