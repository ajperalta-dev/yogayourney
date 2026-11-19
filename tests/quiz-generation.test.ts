import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildHatha } from "../scripts/quiz/build-hatha";
import { validateBank } from "../scripts/quiz/validate-bank";
import { gradeExercise } from "../src/lib/path/grading";
import type { QuestionBank } from "../scripts/quiz/model";

test("Hatha generation is reproducible and snapshot matches current source data", () => {
 const bank = buildHatha();
 assert.deepEqual(bank, buildHatha());
 assert.deepEqual(bank, JSON.parse(readFileSync("src/content/path/generated/hatha.json", "utf8")));
 assert.equal(bank.unit.lessons.length,6); assert.equal(bank.exercises.length,60);
 assert.equal(Object.values(bank.sources).filter(s=>s.mode==="curated").length,20);
 const result = validateBank(bank); assert.deepEqual(result.errors,[]);
 for(const counts of Object.values(result.distribution)) assert.ok(Object.keys(counts).length>=3);
});
test("each stored correct response is accepted in both languages", () => {
 for(const e of buildHatha().exercises) for(const language of ["es","en"] as const) {
  const response = "correct"in e ? e.correct : e.type==="matching"?e.matches:e.correctOrder[language];
  assert.equal(gradeExercise(e,response,language),true,e.id);
 }
});
test("validation catches broken identifiers, duplicates, incomplete translations and image paths", () => {
 const mutate = (change:(bank:QuestionBank)=>void, pattern:RegExp) => {
  const bank = structuredClone(buildHatha()); change(bank);
  assert.ok(validateBank(bank).errors.some(e=>pattern.test(e)));
 };
 mutate(b=>{b.exercises[1].id=b.exercises[0].id;},/duplicate exercise/);
 mutate(b=>{b.exercises[0].contentId="absent";},/missing content/);
 mutate(b=>{b.exercises[0].prompt.en="";},/empty text/);
 mutate(b=>{Reflect.deleteProperty(b.exercises[0].prompt,"en");},/missing en/);
 mutate(b=>{const e=b.exercises[0];if("options"in e)e.options[1]={...e.options[0]};},/duplicate .* options/);
 mutate(b=>{const e=b.exercises[0];if("correct"in e)e.correct=99;},/invalid exercise/);
 mutate(b=>{const e=b.exercises.find(e=>e.type==="image-to-name")!;if("image"in e&&e.image)e.image.src="/images/absent.svg";},/missing\/non-local image/);
 mutate(b=>{b.unit.lessons[0].exerciseIds.pop();},/ten exercises/);
 mutate(b=>{const e=b.exercises[0];b.sources[e.id].contentIds=["absent"];},/provenance/);
});
