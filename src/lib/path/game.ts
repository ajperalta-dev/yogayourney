import type { PathProgress, Session } from "./models";
import { l } from "../utils";
export const gameState = (p:PathProgress): NonNullable<PathProgress["game"]> => p.game ?? {correctAnswers:0,goal:{type:"minutes",target:5},days:{},frozenWeeks:[],badges:[]};
export const ranks = [l("Śiṣya · Estudiante","Śiṣya · Student"),l("Sādhaka · Practicante","Sādhaka · Practitioner"),l("Abhyāsin · Perseverante","Abhyāsin · Consistent practitioner"),l("Yogī · En el camino","Yogī · On the path")];
export function rank(xp:number) { const index=Math.min(ranks.length-1,Math.floor(xp/500));return {name:ranks[index],percent:index===ranks.length-1?100:(xp%500)/5,next:ranks[index+1]}; }
export const badgeNames:Record<string,ReturnType<typeof l>> = {first:l("Primer paso","First step"),week:l("Siete días de constancia","Seven days of consistency"),hundred:l("100 respuestas correctas","100 correct answers"),unit:l("Unidad explorada","Unit explored"),perfect:l("Lección sin errores","Error-free lesson")};
const stamp=(n:number)=>new Date(n*86400000).toISOString().slice(0,10);
const week=(date:string)=>{const n=Date.parse(date)/86400000;return stamp(n-((new Date(date).getUTCDay()+6)%7));};
export function streakReward(p:PathProgress,date:string) {
 const gap=p.lastActivity?(Date.parse(date)-Date.parse(p.lastActivity))/86400000:null;
 const weeks=[...gameState(p).frozenWeeks];
 if(gap===2) { const missed=stamp(Date.parse(date)/86400000-1),key=week(missed);if(!weeks.includes(key)){weeks.push(key);return {streak:p.streak+1,weeks,frozen:true};} }
 return {streak:gap===0?p.streak:gap===1?p.streak+1:1,weeks,frozen:false};
}
export function awardAnswer(p:PathProgress,next:Session):{progress:PathProgress;session:Session} {
 const previous=p.active;
 if(!previous||previous.id!==next.id||next.correct<=previous.correct)return {progress:p,session:next};
 const delta=next.correct-previous.correct,xp=delta*10,g=gameState(p);
 return {progress:{...p,xp:p.xp+xp,game:{...g,correctAnswers:g.correctAnswers+delta}},session:{...next,awardedXp:(previous.awardedXp??0)+xp}};
}
export function finishGame(before:PathProgress,after:PathProgress,session:Session,date:string):PathProgress {
 if(before.rewardedSessions.includes(session.id))return after;
 const stored=gameState(after),g={...stored,correctAnswers:stored.correctAnswers+session.correct-(session.awardedXp??0)/10},old=g.days[date]??{seconds:0,lessons:0};
 const regular=!session.reviewOnly&&!session.lessonId.endsWith("-checkpoint")&&!session.lessonId.endsWith("-placement");
 const streak=streakReward(before,date);
 const badges=new Set(g.badges);
 if(regular)badges.add("first");if(after.streak>=7)badges.add("week");if(g.correctAnswers>=100)badges.add("hundred");
 if(after.completed.some(id=>id.endsWith("-checkpoint")))badges.add("unit");if(regular&&!session.mistakes.length)badges.add("perfect");
 return {...after,game:{...g,frozenWeeks:streak.weeks,badges:[...badges],days:{...g.days,[date]:{seconds:old.seconds+Math.max(0,(session.seconds??0)-(session.awardedSeconds??0)),lessons:old.lessons+Number(regular)}}}};
}
export function awardTime(p:PathProgress,session:Session,seconds:number,date:string) {
 const g=gameState(p),old=g.days[date]??{seconds:0,lessons:0};
 return {progress:{...p,game:{...g,days:{...g.days,[date]:{...old,seconds:old.seconds+seconds}}}},session:{...session,seconds:(p.active?.seconds??0)+seconds,awardedSeconds:(p.active?.awardedSeconds??0)+seconds}};
}
export function dailyGoal(p:PathProgress,date:string) {const g=gameState(p),d=g.days[date]??{seconds:0,lessons:0};const value=g.goal.type==="minutes"?d.seconds/60:d.lessons;return {value,target:g.goal.target,type:g.goal.type,percent:Math.min(100,Math.round(value/g.goal.target*100))};}
