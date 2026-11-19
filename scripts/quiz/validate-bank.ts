import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { byId } from "../../src/content/catalog";
import { sequences } from "../../src/content/sequences";
import { validExercise, orderTokens } from "../../src/lib/path/grading";
import { normalize } from "../../src/lib/utils";
import type { QuestionBank } from "./model";

export function validateBank(bank: QuestionBank): { errors: string[]; distribution: Record<string, Record<string, number>> } {
  const errors: string[] = [], ids = new Set<string>(), lessonIds = new Set<string>(), signatures = new Set<string>();
  const distribution: Record<string, Record<string, number>> = {};
  const fail = (id: string, rule: string) => errors.push(`${id}: ${rule}`);
  if (bank.unit.lessons.length < 6) fail(bank.unit.id, "fewer than six lessons");
  const walk = (value: unknown, id: string): void => {
    if (typeof value === "string") {
      if (!value.trim()) fail(id, "empty text");
      if (/lorem ipsum|placeholder|coming soon|\bTBD\b/i.test(value)) fail(id, "placeholder");
    } else if (Array.isArray(value)) value.forEach(v => walk(v, id));
    else if (value && typeof value === "object") {
      const record = value as Record<string, unknown>;
      if ("es" in record || "en" in record) for (const language of ["es", "en"]) if (typeof record[language] !== "string" && !Array.isArray(record[language])) fail(id, `missing ${language}`);
      Object.values(record).forEach(v => walk(v, id));
    }
  };
  const image = (src: string, id: string) => {
    const root = path.resolve("public"), resolved = path.resolve(root, src.replace(/^\//u, ""));
    if (!src.startsWith("/images/") || !resolved.startsWith(root + path.sep) || !existsSync(resolved)) fail(id, "missing/non-local image");
  };
  walk(bank, bank.unit.id);
  for (const exercise of bank.exercises) {
    if (ids.has(exercise.id)) fail(exercise.id, "duplicate exercise id"); ids.add(exercise.id);
    if (exercise.unitId !== bank.unit.id || !bank.unit.lessons.some(l => l.id === exercise.lessonId)) fail(exercise.id, "invalid unit/lesson");
    if (!byId[exercise.contentId]) fail(exercise.id, "missing content reference");
    let valid = false;
    try { valid = validExercise(exercise); } catch { /* Report malformed localized data by ID. */ }
    const types = ["multiple-choice", "true-false", "fill-blank", "odd-one-out", "teacher-scenario", "image-to-name", "name-to-image", "matching", "sequence-order", "word-order"];
    if (!valid || !types.includes(exercise.type) || ![1,2,3].includes(exercise.difficulty)) { fail(exercise.id, "invalid exercise shape/key"); continue; }
    const signature = JSON.stringify([exercise.type, exercise.prompt, "options" in exercise ? exercise.options : "tokens" in exercise ? exercise.tokens : exercise.left]);
    if (signatures.has(signature)) fail(exercise.id, "duplicate question"); signatures.add(signature);
    const source = bank.sources[exercise.id];
    if (!source || !source.contentIds.includes(exercise.contentId) || source.contentIds.some(id => !byId[id])) fail(exercise.id, "missing/invalid provenance");
    if (source?.sequenceId && !sequences.some(s => s.id === source.sequenceId)) fail(exercise.id, "missing sequence reference");
    if ("options" in exercise) {
      for (const language of ["es", "en"] as const) if (new Set(exercise.options.map(o => normalize(o[language]))).size !== exercise.options.length) fail(exercise.id, `duplicate ${language} options`);
      if (exercise.image) image(exercise.image.src, exercise.id);
      exercise.optionImages?.forEach(i => image(i.src, exercise.id));
      if (exercise.type === "name-to-image" && new Set(exercise.optionImages?.map(i=>i.src)).size !== exercise.options.length) fail(exercise.id, "duplicate image options");
    } else if (exercise.type === "matching") {
      for (const language of ["es", "en"] as const) for (const side of [exercise.left, exercise.right]) if (new Set(side.map(i=>normalize(i.label[language]))).size !== side.length) fail(exercise.id, "ambiguous pairs");
    } else for (const language of ["es", "en"] as const) {
      const tokens = orderTokens(exercise, language);
      if (new Set(tokens.map(t=>normalize(t.label[language]))).size !== tokens.length) fail(exercise.id, "ambiguous repeated words");
    }
  }
  const members = new Set<string>();
  for (const lesson of bank.unit.lessons) {
    if (lessonIds.has(lesson.id)) fail(lesson.id,"duplicate lesson"); lessonIds.add(lesson.id);
    if (lesson.unitId !== bank.unit.id || ![3,4,5].includes(lesson.minutes)) fail(lesson.id,"invalid unit or duration");
    if (lesson.exerciseIds.length !== 10) fail(lesson.id, "must contain ten exercises");
    const counts: Record<string, number> = {};
    for (const id of lesson.exerciseIds) {
      const exercise = bank.exercises.find(e => e.id === id);
      if (members.has(id)) fail(id, "exercise belongs to multiple nodes"); members.add(id);
      if (!exercise || exercise.lessonId !== lesson.id) fail(id, "invalid lesson membership");
      else counts[exercise.type] = (counts[exercise.type] ?? 0) + 1;
    }
    distribution[lesson.id] = counts;
    if (Object.keys(counts).length < 3) fail(lesson.id, "fewer than three exercise types");
  }
  if (members.size !== ids.size) fail(bank.unit.id, "orphaned exercises");
  return { errors, distribution };
}

export function readBanks(): QuestionBank[] {
  const directory = "src/content/path/generated";
  return existsSync(directory) ? readdirSync(directory).filter(f => f.endsWith(".json")).sort().map(f => JSON.parse(readFileSync(path.join(directory, f), "utf8")) as QuestionBank) : [];
}
