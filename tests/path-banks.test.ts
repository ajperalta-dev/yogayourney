import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync,existsSync } from "node:fs";
import { loadUnit,runtimeEntries,runtimeUnits } from "../src/lib/path/banks";
import { pathUnits,pathExercises } from "../src/content/path";
import { reviewCards } from "../src/content/path/review-cards";
import { gradeExercise } from "../src/lib/path/grading";
import { startLesson,answer } from "../src/lib/path/engine";
const payload=(id:string)=>readFileSync(`public/data/path/${id}.json`,"utf8");
test("light manifest and prepared payloads match original banks and WebP assets",()=>{
 assert.equal(runtimeEntries.length,pathExercises.length+reviewCards.length);
 assert.deepEqual(runtimeUnits,pathUnits);
 for(const unit of runtimeUnits){const bank=JSON.parse(payload(unit.id));assert.equal(bank.exercises.length,runtimeEntries.filter(e=>e.unitId===unit.id).length);
 for(const e of bank.exercises){for(const image of [...(e.image?[e.image]:[]),...(e.optionImages??[])]) {assert.match(image.src,/\.webp$/);assert.ok(existsSync(`public${image.src}`));}if(e.type!=="flashcard"){const response="correct"in e?e.correct:e.type==="matching"?e.matches:e.correctOrder.es;assert.equal(gradeExercise(e,response,"es"),true);}}
 }
});
test("unit fetch is deferred, deduplicated, retriable and supports cached offline banks",async()=>{
 const originalFetch=globalThis.fetch, originalCache=Object.getOwnPropertyDescriptor(globalThis,"caches");
 const cached=new Map<string,Response>();let calls=0;
 Object.defineProperty(globalThis,"caches",{configurable:true,value:{match:async(url:string)=>cached.get(url)?.clone(),open:async()=>({put:async(url:string,response:Response)=>cached.set(url,response.clone())})}});
 try{
 globalThis.fetch=async()=>{calls++;return new Response(payload("hatha"),{status:200});};
 await Promise.all([loadUnit("hatha"),loadUnit("hatha")]);assert.equal(calls,1);
 globalThis.fetch=async()=>{throw new Error("offline");};
 const manifest=JSON.parse(readFileSync("src/content/path/manifest.json","utf8"));cached.set(`/data/path/yin.json?v=${manifest.fingerprints.yin}`,new Response(payload("yin")));
 assert.ok((await loadUnit("yin")).length>0);
 await assert.rejects(loadUnit("aerial"));
 globalThis.fetch=async()=>new Response(payload("aerial"));assert.ok((await loadUnit("aerial")).length>0);
 await assert.rejects(loadUnit("absent"));
 }finally{globalThis.fetch=originalFetch;if(originalCache)Object.defineProperty(globalThis,"caches",originalCache);else Reflect.deleteProperty(globalThis,"caches");}
});
test("lesson responses and progress do not require any network",()=>{
 const original=globalThis.fetch;globalThis.fetch=async()=>{throw new Error("offline");};
 try{const lesson=pathUnits[0].lessons[0];let s=startLesson(lesson);while(!s.finished)s=answer(s,true);assert.equal(s.correct,lesson.exerciseIds.length);assert.deepEqual(JSON.parse(JSON.stringify(s)),s);}finally{globalThis.fetch=original;}
});
