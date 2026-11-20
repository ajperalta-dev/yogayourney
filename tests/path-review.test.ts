import test from "node:test";
import assert from "node:assert/strict";
import { byId,catalog } from "../src/content/catalog";
import { pathExercises,pathUnits } from "../src/content/path";
import { reviewCards } from "../src/content/path/review-cards";
import { defaultState,parseState } from "../src/lib/storage";
import { emptyPath,startLesson,answer,skipExercise } from "../src/lib/path/engine";
import { learningStats,makeReview,recordReview,recordLegacyCard,selectReview,syncMastery } from "../src/lib/path/review";
const pool=[...pathExercises,...reviewCards];const day="2026-11-20";
test("all study entries and legacy cards have valid references in the unified pool",()=>{
 assert.equal(reviewCards.length,46);assert.ok(reviewCards.every(c=>byId[c.contentId]));
 const ids=new Set(pool.map(e=>e.contentId));assert.ok(catalog.every(c=>ids.has(c.id)));
});
test("personal practice has ten distinct exercises; legacy errors and due nodes lead",()=>{
 const card=reviewCards[0],state={...defaultState,path:emptyPath(),cards:{[card.flashcardId]:{known:false,reviewedAt:day}}};
 const picked=selectReview(pool,state,day);assert.equal(picked.length,10);assert.equal(new Set(picked.map(e=>e.id)).size,10);assert.equal(picked[0].id,card.id);
 const errors=selectReview(pool,state,day,true);assert.equal(errors.length,1);assert.equal(errors[0].id,card.id);
 const due={...defaultState,path:{...emptyPath(),nodes:{[pathExercises[0].lessonId]:{mastery:1,box:1,nextReview:"2026-11-19"}}}};
 assert.equal(selectReview(pathExercises,due,day)[0].lessonId,pathExercises[0].lessonId);
});
test("review records reset on error, advance on recall, ignore skips and persist",()=>{
 const lesson=pathUnits[0].lessons[0],s=startLesson(lesson),e=pool.find(e=>e.id===s.queue[0])!;
 const skipped=recordReview(emptyPath(),s,skipExercise(s),e,day);assert.equal(skipped.reviews,undefined);
 const failed=recordReview(emptyPath(),s,answer(s,false),e,day);assert.equal(failed.reviews?.[e.id].box,0);assert.equal(failed.reviews?.[e.id].due,day);
 const success=recordReview(failed,s,answer(s,true),e,day);assert.equal(success.reviews?.[e.id].box,1);assert.equal(success.reviews?.[e.id].due,"2026-11-21");
 assert.deepEqual(parseState(JSON.stringify({...defaultState,path:success})).path?.reviews,success.reviews);
 assert.equal(selectReview([e],{...defaultState,path:success},day,true).length,0);
 const again=recordReview(success,s,answer(s,true),e,day);assert.equal(again.reviews?.[e.id].box,1);assert.equal(again.reviews?.[e.id].due,"2026-11-21");
});
test("unified metrics preserve legacy exploration, sessions and card counts without double counting",()=>{
 const card=reviewCards[0];const s={...defaultState,visited:{[card.contentId]:day},cards:{[card.flashcardId]:{known:true,reviewedAt:day}},path:{...emptyPath(),xp:40,rewardedSessions:["study"],reviews:{[card.id]:{box:5,due:day,last:day,correct:5,wrong:0,contentId:card.contentId,flashcardId:card.flashcardId}}}};
 const metrics=learningStats(s,146);assert.equal(metrics.reviewed,1);assert.equal(metrics.sessions,1);assert.equal(metrics.xp,40);assert.equal(metrics.mastered,1);
 assert.ok(metrics.percent>=Math.round(1/146*100));
 assert.equal(learningStats({...defaultState,visited:Object.fromEntries(catalog.map(c=>[c.id,day]))},146).percent,100);
});
test("mastery sync never unlocks lessons, and incomplete card sessions can contain one question",()=>{
 const p=emptyPath(),synced=syncMastery(p,pathUnits);assert.equal(synced.completed.length,0);
 const run=makeReview([reviewCards[0],reviewCards[0]])!;assert.equal(run.session.total,1);assert.equal(run.session.reviewOnly,true);
 assert.equal(parseState(JSON.stringify({...defaultState,path:{...p,active:run.session}})).path?.active?.total,1);
 assert.equal(makeReview([]),null);
});
test("the legacy card view updates shared memory without replacing a paused session",()=>{
 const active=startLesson(pathUnits[0].lessons[0]),before={...emptyPath(),active,xp:40};
 const failed=recordLegacyCard(before,reviewCards[0],false,day);
 assert.equal(failed.reviews?.[reviewCards[0].id].box,0);assert.equal(failed.active?.id,active.id);
 const corrected=recordLegacyCard(failed,reviewCards[0],true,day);
 assert.equal(corrected.reviews?.[reviewCards[0].id].box,1);assert.equal(corrected.xp,40);
});
