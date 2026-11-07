import type { PersonalState, Sequence } from "./models";
export const STORAGE_KEY = "yoga-journey:v1";
export const defaultState: PersonalState = {
  version: 1,
  language: "es",
  theme: "system",
  favorites: [],
  notes: {},
  visited: {},
  lastPath: "",
  sessions: [],
  quizzes: [],
  cards: {},
  sequences: [],
};
function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
const stages = [
  "centering",
  "pranayama",
  "warm-up",
  "asanas",
  "peak-pose",
  "cool-down",
  "savasana",
  "meditation",
];
function sequence(value: unknown): value is Sequence {
  if (
    !record(value) ||
    typeof value.id !== "string" ||
    !record(value.name) ||
    typeof value.name.es !== "string" ||
    typeof value.name.en !== "string" ||
    !record(value.description) ||
    typeof value.description.es !== "string" ||
    typeof value.description.en !== "string" ||
    !["ashtanga", "hatha", "yin", "aerial"].includes(String(value.style)) ||
    !Array.isArray(value.steps) ||
    typeof value.demo !== "boolean"
  )
    return false;
  return (
    value.steps.length > 0 &&
    value.steps.length <= 200 &&
    value.steps.every(
      (s) =>
        record(s) &&
        typeof s.key === "string" &&
        typeof s.contentId === "string" &&
        typeof s.duration === "number" &&
        Number.isInteger(s.duration) &&
        s.duration >= 5 &&
        s.duration <= 3600 &&
        stages.includes(String(s.stage)),
    )
  );
}
export function parseState(raw: string): PersonalState {
  if (raw.length > 5_000_000) throw new Error("Backup too large");
  const v: unknown = JSON.parse(raw);
  if (
    !record(v) ||
    v.version !== 1 ||
    !["es", "en"].includes(String(v.language)) ||
    !["light", "dark", "system"].includes(String(v.theme)) ||
    !Array.isArray(v.favorites) ||
    !v.favorites.every((x) => typeof x === "string") ||
    !record(v.notes) ||
    !record(v.visited) ||
    typeof v.lastPath !== "string" ||
    !Array.isArray(v.sessions) ||
    !Array.isArray(v.quizzes) ||
    !record(v.cards) ||
    !Array.isArray(v.sequences)
  )
    throw new Error("Invalid backup");
  if (
    !Object.values(v.notes).every(
      (n) =>
        record(n) &&
        typeof n.contentId === "string" &&
        typeof n.text === "string" &&
        typeof n.updatedAt === "string",
    ) ||
    !Object.values(v.visited).every((x) => typeof x === "string") ||
    !Object.values(v.cards).every(
      (c) =>
        record(c) &&
        typeof c.known === "boolean" &&
        typeof c.reviewedAt === "string",
    ) ||
    !v.sequences.every(sequence)
  )
    throw new Error("Invalid data");
  if (
    !v.sessions.every(
      (s) =>
        record(s) &&
        typeof s.id === "string" &&
        typeof s.sequenceId === "string" &&
        typeof s.completedAt === "string" &&
        typeof s.seconds === "number" &&
        Number.isFinite(s.seconds) &&
        s.seconds >= 0,
    ) ||
    !v.quizzes.every(
      (q) =>
        record(q) &&
        typeof q.id === "string" &&
        typeof q.score === "number" &&
        typeof q.total === "number" &&
        q.total > 0 &&
        q.score >= 0 &&
        q.score <= q.total &&
        typeof q.date === "string" &&
        typeof q.category === "string",
    )
  )
    throw new Error("Invalid progress");
  return v as unknown as PersonalState;
}
