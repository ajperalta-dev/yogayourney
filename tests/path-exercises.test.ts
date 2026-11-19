import test from "node:test";
import assert from "node:assert/strict";
import type { Exercise, ExerciseBase, PairExercise, OrderExercise } from "../src/lib/path/models";
import { gradeExercise, isResponseComplete, validExercise } from "../src/lib/path/grading";
import { skipExercise, startLesson, answer, metrics } from "../src/lib/path/engine";
import { pathUnits, pathExercises } from "../src/content/path";
const text = (es: string, en = es) => ({ es, en });
const base: ExerciseBase = { id: "test", unitId: "hatha", lessonId: "test-lesson", difficulty: 1, prompt: text("Elige", "Choose"), explanation: text("Explicación", "Explanation"), contentId: "tadasana" };
const options = [text("A"), text("B"), text("C"), text("D")];
test("choice variants use explicit keys, four options, and reject unanswered selections", () => {
 for (const type of ["multiple-choice", "fill-blank", "odd-one-out", "teacher-scenario", "true-false", "image-to-name", "name-to-image"] as const) {
  const image = { src: "/images/poses/tadasana.svg", alt: text("Persona de pie", "Standing person") };
  const exercise: Exercise = { ...base, type, options: type === "true-false" ? options.slice(0, 2) : options, correct: 1, image, optionImages: options.map(() => image) };
  assert.equal(validExercise(exercise), true);
  for (const language of ["es", "en"] as const) { assert.equal(gradeExercise(exercise, 1, language), true); assert.equal(gradeExercise(exercise, 0, language), false); assert.equal(isResponseComplete(exercise, -1, language), false); }
 }
 assert.equal(validExercise({ ...base, type: "multiple-choice", options: options.slice(0, 3), correct: 0 }), false);
 assert.equal(validExercise({ ...base, type: "image-to-name", options, correct: 0 }), false);
});
test("pair matching requires complete, unique associations and grades every pair", () => {
 const exercise: PairExercise = { ...base, type: "matching", left: [{id: "a",label:text("A")},{id:"b",label:text("B")}], right:[{id:"x",label:text("X")},{id:"y",label:text("Y")}], matches:{a:"y",b:"x"} };
 assert.equal(gradeExercise(exercise, {a:"y",b:"x"}, "es"), true);
 assert.equal(gradeExercise(exercise, {a:"x",b:"y"}, "es"), false);
 assert.equal(isResponseComplete(exercise, {a:"x",b:"x"}, "en"), false);
 assert.equal(isResponseComplete(exercise, {a:"y"}, "es"), false);
});
test("steps and words use locale-specific ordering and support repeated words via stable IDs", () => {
 for (const type of ["sequence-order", "word-order"] as const) {
 const exercise: OrderExercise = {...base, type, tokens:[{id:"a",label:text("la","the")},{id:"b",label:text("la","the")}], correctOrder:{es:["a","b"],en:["b","a"]}};
 assert.equal(gradeExercise(exercise, ["a","b"], "es"), true);
 assert.equal(gradeExercise(exercise, ["b","a"], "en"), true);
 assert.equal(gradeExercise(exercise, ["b","a"], "es"), false);
 assert.equal(gradeExercise(exercise, ["a","a"], "es"), false);
 assert.equal(isResponseComplete(exercise, ["a"], "en"), false);
 }
});
test("skip requeues without counting guesses, XP, progress, or mistakes even with one remaining", () => {
 const session = startLesson(pathUnits[0].lessons[0]);
 const skipped = skipExercise(session);
 assert.equal(skipped.queue.at(-1), session.queue[0]); assert.equal(session.queue.length, skipped.queue.length);
 assert.deepEqual(metrics(skipped), metrics(session)); assert.equal(skipped.attempts, 0); assert.deepEqual(skipped.mistakes, []);
 let last = session; while (last.queue.length > 1) last = answer(last, true);
 assert.deepEqual(skipExercise(last), last);
 const done = answer(last, true); assert.deepEqual(skipExercise(done), done);
});
test("word order supports different word counts in ES and EN", () => {
 const es = [{id:"a", label:text("a")},{id:"b", label:text("b")}];
 const en = [...es, {id:"c",label:text("c")}];
 const exercise: OrderExercise = {...base, type:"word-order", tokens:[], tokensByLanguage:{es,en}, correctOrder:{es:["a","b"], en:["a","b","c"]}};
 assert.equal(validExercise(exercise), true);
 assert.equal(gradeExercise(exercise,["a","b"],"es"), true);
 assert.equal(gradeExercise(exercise,["a","b"],"en"), false);
 assert.equal(gradeExercise(exercise,["a","b","c"],"en"), true);
});
test("current recognition bank satisfies the four-option component contract", () => {
 assert.ok(pathExercises.every(validExercise));
});
