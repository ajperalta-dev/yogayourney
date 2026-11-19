import test from "node:test";
import assert from "node:assert/strict";
import { pathUnits,pathExercises } from "../src/content/path";
import { assessment,canStart,completePathSession,nodeState,streakToday } from "../src/lib/path/graph";
import { answer,emptyPath,startLesson } from "../src/lib/path/engine";
import { parseState,defaultState } from "../src/lib/storage";
import type { Lesson } from "../src/lib/path/models";
const unit=pathUnits.find(u=>u.id==="hatha")!;
function finish(lesson:Lesson, errors=0) {
 let s=startLesson(lesson);
 while(errors-->0)s=answer(s,false);
 while(!s.finished)s=answer(s,true);
 return s;
}
test("nodes unlock sequentially and retain mastered states",()=>{
 const p=emptyPath(),first=unit.lessons[0],second=unit.lessons[1];
 assert.equal(nodeState(first,unit,p),"available"); assert.equal(nodeState(second,unit,p),"locked");
 const active=startLesson(first); assert.equal(nodeState(first,unit,{...p,active}),"in-progress");
 const completed=completePathSession(p,finish(first),first,"2026-11-19");
 assert.equal(nodeState(first,unit,completed),"completed");assert.equal(nodeState(second,unit,completed),"available");
 completed.nodes[first.id].mastery=5;assert.equal(nodeState(first,unit,completed),"mastered");
});
test("placement opens a unit without granting fictitious lesson completions",()=>{
 const lesson=assessment(unit,pathExercises,"placement")!;
 const p=completePathSession(emptyPath(),finish(lesson),lesson,"2026-11-19");
 assert.equal(lesson.exerciseIds.length,8); assert.ok(canStart(unit.lessons.at(-1)!,unit,p));
 assert.ok(!unit.lessons.some(l=>p.completed.includes(l.id)));
 const failed=completePathSession(emptyPath(),finish(lesson,4),lesson,"2026-11-19");
 assert.equal(failed.completed.length,0);assert.ok(!failed.unlockedUnits?.includes(unit.id));
});
test("checkpoint requires 15 distinct exercises, progression and 80% accuracy",()=>{
 const lesson=assessment(unit,pathExercises,"checkpoint")!;
 assert.equal(lesson.exerciseIds.length,15);assert.equal(new Set(lesson.exerciseIds).size,15);
 assert.equal(canStart(lesson,unit,emptyPath()),false);
 const before={...emptyPath(),completed:unit.lessons.map(l=>l.id)};
 assert.equal(canStart(lesson,unit,before),true);
 const session=finish(lesson),done=completePathSession(before,session,lesson,"2026-11-19");
 assert.ok(done.completed.includes(lesson.id));assert.equal(completePathSession(done,session,lesson,"2026-11-19").xp,done.xp);
 assert.equal(completePathSession(before,finish(lesson,5),lesson,"2026-11-19").completed.includes(lesson.id),false);
 const small=pathUnits.find(u=>u.id==="aerial")!;assert.equal(assessment(small,pathExercises,"checkpoint"),null);
 assert.throws(()=>startLesson({...unit.lessons[0],exerciseIds:lesson.exerciseIds}));
});
test("paused sessions survive device backups; corrupt sessions do not erase achievements",()=>{
 const active=answer(startLesson(unit.lessons[0]),true);
 const p={...emptyPath(),active,xp:90};
 const read=parseState(JSON.stringify({...defaultState,path:p}));assert.deepEqual(read.path?.active,active);
 const bad=parseState(JSON.stringify({...defaultState,path:{...p,active:{...active,total:1}}}));
 assert.equal(bad.path?.active,undefined);assert.equal(bad.path?.xp,90);
 assert.equal(streakToday({...p,streak:3,lastActivity:"2026-11-19"},"2026-11-21"),0);
 assert.equal(streakToday({...p,streak:3,lastActivity:"2026-11-19"},"2026-11-20"),3);
});
