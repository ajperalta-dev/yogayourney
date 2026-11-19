import test from "node:test";
import assert from "node:assert/strict";
import { startLesson, answer, metrics, emptyPath, finishLesson, unlocked } from "../src/lib/path/engine";
import { parseState, defaultState } from "../src/lib/storage";
import { pathUnits, pathExercises } from "../src/content/path";
const lesson = pathUnits[0].lessons[0];
function complete() { let s = startLesson(lesson); while (!s.finished) s = answer(s, true); return s; }
test("errors go to the end, progress requires a successful answer", () => {
 const s = startLesson(lesson), failed = answer(s, false);
 assert.equal(failed.queue.at(-1), s.queue[0]); assert.equal(failed.mastered.length, 0);
 let done = failed; while (!done.finished) done = answer(done, true);
 assert.equal(done.attempts, lesson.exerciseIds.length + 1); assert.equal(metrics(done).progress, 1);
 assert.ok(metrics(done).accuracy < 1); assert.ok(metrics(done).xp < metrics(complete()).xp);
 assert.deepEqual(answer(done, false), done);
});
test("completion awards XP, tracks streak by calendar date, and unlocks only successors", () => {
 const done = complete(); const p = finishLesson(emptyPath(), done, "2026-11-19");
 assert.equal(p.xp, lesson.exerciseIds.length * 10); assert.equal(p.streak, 1);
 assert.equal(finishLesson(p, done, "2026-11-19").streak, 1);
 assert.equal(finishLesson(p, complete(), "2026-11-20").streak, 2);
 assert.equal(finishLesson(p, complete(), "2026-11-22").streak, 1);
 assert.throws(() => finishLesson(p, complete(), "2026-11-18"));
 const next = { ...lesson, id: "next" };
 assert.equal(unlocked(next.id, [lesson, next], emptyPath()), false);
 assert.equal(unlocked(next.id, [lesson, next], p), true);
 assert.equal(unlocked("absent", [lesson], p), false);
 assert.equal(p.nodes[lesson.id].nextReview, "2026-11-21");
});
test("Leitner resets after an error and mastery stays bounded", () => {
 let s = answer(startLesson(lesson), false); while (!s.finished) s = answer(s, true);
 const p = finishLesson(emptyPath(), s, "2026-11-19"); assert.equal(p.nodes[lesson.id].box, 0);
 assert.equal(p.nodes[lesson.id].nextReview, "2026-11-20"); assert.equal(Object.values(p.errors)[0], 1);
});
test("old backups retain reviews and quizzes; invalid new data resets only Path", () => {
 const old = { ...defaultState, path: undefined, cards: { legacy: { reviewedAt: "2026-11-19", known: true } } };
 const parsed = parseState(JSON.stringify(old)); assert.deepEqual(parsed.cards, old.cards); assert.equal(parsed.path?.xp, 0);
 assert.equal(parseState(JSON.stringify({ ...old, path: { xp: -1 } })).path?.xp, 0);
});
test("all units have valid bilingual lessons referencing real generated exercises", () => {
 assert.equal(pathUnits.length, 11); const ids = new Set(pathExercises.map(e => e.id)); assert.equal(ids.size, pathExercises.length);
 for (const unit of pathUnits) { assert.ok(unit.lessons.length); for (const l of unit.lessons) {
 assert.ok(l.exerciseIds.length >= 8 && l.exerciseIds.length <= 12); assert.ok(l.exerciseIds.every(id => ids.has(id)));
 }}
 for (const e of pathExercises) { assert.ok(e.prompt.es && e.prompt.en && e.explanation.es && e.explanation.en); if ("options" in e) { assert.equal(e.options.length, e.type === "true-false" ? 2 : 4); assert.ok(e.options[e.correct]); } }
});
