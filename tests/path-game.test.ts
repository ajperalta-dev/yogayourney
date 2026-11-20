import test from "node:test";
import assert from "node:assert/strict";
import { awardAnswer,awardTime,dailyGoal,gameState,rank,streakReward } from "../src/lib/path/game";
import { answer,emptyPath,startLesson,metrics } from "../src/lib/path/engine";
import { completePathSession } from "../src/lib/path/graph";
import { pathUnits } from "../src/content/path";
import { defaultState,parseState } from "../src/lib/storage";
const lesson=pathUnits.find(u=>u.id==="hatha")!.lessons[0];
test("correct answers award 10 XP immediately; completion adds only the 20 XP bonus",()=>{
 let s=startLesson(lesson),p={...emptyPath(),active:s};
 while(!s.finished){const a=awardAnswer(p,answer(s,true));s=a.session;p={...a.progress,active:s};}
 assert.equal(p.xp,100);assert.equal(gameState(p).correctAnswers,10);
 const done=completePathSession(p,s,lesson,"2026-11-20");assert.equal(done.xp,120);assert.equal(metrics(s).bonus,20);
 assert.equal(completePathSession(done,s,lesson,"2026-11-20").xp,120);
 assert.ok(gameState(done).badges.includes("first"));assert.ok(gameState(done).badges.includes("perfect"));
});
test("wrong answers cost no XP and cannot earn a perfect bonus",()=>{
 const s=startLesson(lesson),p={...emptyPath(),active:s};const a=awardAnswer(p,answer(s,false));assert.equal(a.progress.xp,0);
 let done=a.session;while(!done.finished)done=answer(done,true);
 assert.equal(metrics(done).bonus,0);assert.equal(metrics(done).xp,100);
});
test("one missed day is protected once per ISO week, not an unlimited freeze",()=>{
 const p={...emptyPath(),lastActivity:"2026-11-16",streak:3};
 const a=streakReward(p,"2026-11-18");assert.equal(a.streak,4);assert.equal(a.frozen,true);
 const used={...p,lastActivity:"2026-11-18",streak:4,game:{...gameState(p),frozenWeeks:a.weeks}};
 assert.equal(streakReward(used,"2026-11-20").streak,1);
 assert.equal(streakReward({...used,lastActivity:"2026-11-23"},"2026-11-25").frozen,true);
 assert.equal(streakReward(p,"2026-11-19").streak,1);
});
test("active time is assigned by local date, persists, and isn't counted twice at completion",()=>{
 let s=startLesson(lesson),p={...emptyPath(),active:s};
 const timed=awardTime(p,s,300,"2026-11-20");s=timed.session;p={...timed.progress,active:s};
 assert.equal(dailyGoal(p,"2026-11-20").percent,100);assert.equal(dailyGoal(p,"2026-11-21").percent,0);
 while(!s.finished)s=answer(s,true);
 const done=completePathSession(p,s,lesson,"2026-11-20");assert.equal(gameState(done).days["2026-11-20"].seconds,300);
 assert.equal(gameState(done).days["2026-11-20"].lessons,1);
 assert.equal(parseState(JSON.stringify({...defaultState,path:done})).path?.game?.goal.type,"minutes");
 assert.equal(rank(500).name.en,"Sādhaka · Practitioner");assert.equal(rank(500).percent,0);
});
test("error-only reviews do not unlock nodes, create perfect badges or count as a lesson",()=>{
 let s={...startLesson(lesson),reviewOnly:true};while(!s.finished)s=answer(s,true) as typeof s;
 const done=completePathSession(emptyPath(),s,lesson,"2026-11-20");assert.equal(done.completed.length,0);
 assert.equal(gameState(done).days["2026-11-20"].lessons,0);assert.equal(metrics(s).bonus,0);
});
