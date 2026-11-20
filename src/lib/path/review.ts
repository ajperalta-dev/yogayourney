import type { Exercise,Lesson,PathProgress,Session,Unit } from "./models";
import type { PersonalState } from "../models";
import { l } from "../utils";
const addDays=(date:string,n:number)=>new Date(Date.parse(date)+n*86400000).toISOString().slice(0,10);
export function selectReview(exercises:Exercise[],state:PersonalState,date:string,errorsOnly=false):Exercise[] {
 const p=state.path, unique=[...new Map(exercises.map(e=>[e.id,e])).values()];
 const rank=(e:Exercise)=>{
  const r=p?.reviews?.[e.id],legacy=e.type==="flashcard"?state.cards[e.flashcardId]:undefined;
  const wrong=r?r.wrong>0&&r.box===0:!!p?.errors[e.id]||legacy?.known===false;
  const due=r?r.due<=date:legacy?legacy.reviewedAt.slice(0,10)<=addDays(date,legacy.known?-7:0):(p?.nodes[e.lessonId]?.nextReview??"9999")<=date;
  return {wrong,due,group:wrong?0:due?1:!r&&!legacy?2:3,weak:r?(r.wrong+1)/(r.correct+1)+(5-r.box):p?.errors[e.id]??0,date:r?.due??legacy?.reviewedAt.slice(0,10)??"9999"};
 };
 return unique.filter(e=>!errorsOnly||rank(e).wrong).sort((a,b)=>{
  const x=rank(a),y=rank(b);return x.group-y.group||y.weak-x.weak||x.date.localeCompare(y.date)||a.id.localeCompare(b.id);
 }).slice(0,errorsOnly?15:10);
}
export function makeReview(exercises:Exercise[],id="personal-review"): {lesson:Lesson;session:Session}|null {
 if(!exercises.length)return null;
 const ids=[...new Set(exercises.map(e=>e.id))].slice(0,15);
 return {lesson:{id,unitId:exercises[0].unitId,name:l("Práctica personalizada","Personal practice"),minutes:4,exerciseIds:ids},session:{id:crypto.randomUUID(),lessonId:id,queue:ids,total:ids.length,mastered:[],attempts:0,correct:0,mistakes:[],finished:false,reviewOnly:true,seconds:0}};
}
export function recordReview(p:PathProgress,before:Session,next:Session,exercise:Exercise,date:string):PathProgress {
 if(next.attempts!==before.attempts+1)return p;
 const correct=next.correct>before.correct;
 const old=p.reviews?.[exercise.id], advance=!old||old.due<=date, box=correct?(advance?Math.min(5,(old?.box??0)+1):old.box):0;
 return {...p,reviews:{...p.reviews,[exercise.id]:{box,due:correct&&!advance?old!.due:addDays(date,correct?[0,1,2,4,7,14][box]:0),correct:(old?.correct??0)+Number(correct),wrong:(old?.wrong??0)+Number(!correct),last:date,contentId:exercise.contentId,...(exercise.type==="flashcard"?{flashcardId:exercise.flashcardId}:{})}}};
}
/** The legacy card view shares the same memory record without replacing a paused Path session. */
export function recordLegacyCard(p:PathProgress,exercise:Exercise,known:boolean,date:string):PathProgress {
 const before:Session={id:"legacy-card",lessonId:"personal-review",queue:[exercise.id],total:1,mastered:[],attempts:0,correct:0,mistakes:[],finished:false};
 return recordReview(p,before,{...before,attempts:1,correct:Number(known)},exercise,date);
}
export function syncMastery(p:PathProgress,units:Unit[]):PathProgress {
 const nodes={...p.nodes};
 for(const unit of units)for(const lesson of unit.lessons){if(!p.completed.includes(lesson.id)||!lesson.exerciseIds.some(id=>p.reviews?.[id]))continue;
 const mastery=Math.round(lesson.exerciseIds.reduce((n,id)=>n+(p.reviews?.[id]?.box??nodes[lesson.id]?.mastery??0),0)/lesson.exerciseIds.length);
 nodes[lesson.id]={...(nodes[lesson.id]??{box:0,nextReview:"9999-12-31"}),mastery};}
 return {...p,nodes};
}
export function learningStats(state:PersonalState,total:number) {
 const seen=new Set(Object.keys(state.visited)),mastery=new Map<string,number>(),cards=new Set(Object.keys(state.cards));
 for(const [id,r]of Object.entries(state.path?.reviews??{})){mastery.set(r.contentId,Math.max(mastery.get(r.contentId)??0,r.box/5));cards.add(r.flashcardId??id);}
 const credit=seen.size+[...mastery].reduce((n,[id,level])=>n+(seen.has(id)?0:level),0);
 return {percent:Math.min(100,Math.round(credit/Math.max(1,total)*100)),reviewed:cards.size,sessions:new Set([...state.sessions.map(s=>s.id),...(state.path?.rewardedSessions??[])]).size,xp:state.path?.xp??0,mastered:[...mastery.values()].filter(n=>n===1).length};
}
