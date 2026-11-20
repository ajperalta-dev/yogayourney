"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { runtimeUnits as pathUnits,runtimeEntries,loadAllBanks,loadExerciseBanks,loadUnit } from "@/lib/path/banks";
import { makeReview,recordReview,selectReview,syncMastery } from "@/lib/path/review";
import { awardAnswer, awardTime, badgeNames, dailyGoal, gameState, rank } from "@/lib/path/game";
import { Check, Flag, LockKeyhole, Play, Star, Trophy, X } from "lucide-react";

import { sections } from "@/content/sections";
import { emptyPath, metrics, startLesson } from "@/lib/path/engine";
import { assessment, canStart, completePathSession, localDay, nodeState, streakToday } from "@/lib/path/graph";
import type { Exercise, Lesson, Session, Unit } from "@/lib/path/models";
import { Button } from "../ui/button";
import { EmptyState, ProgressBar, SectionHeader } from "../common";
import { useLocal } from "../providers";
import { SessionExercise } from "./exercise";

const units = [...pathUnits].sort((a,b) => (a.id === "hatha" ? -1 : b.id === "hatha" ? 1 : pathUnits.indexOf(a)-pathUnits.indexOf(b)));
const pathExercises=runtimeEntries.filter(e=>e.type!=="flashcard");
const knownIds=new Set(runtimeEntries.map(e=>e.id));
const allLessons = units.flatMap(unit=>[...unit.lessons, assessment(unit,pathExercises,"checkpoint"),assessment(unit,pathExercises,"placement")].filter((l):l is Lesson=>!!l));
const offset = (i:number) => [0, 68, 90, 0, -90, -68][i%6];

function NodeDialog({unit, lesson, reward, close, start, available, completed, replaces, loading, loadFailed}: {unit:Unit;lesson?:Lesson;reward?:boolean;close:()=>void;start:(lesson:Lesson)=>void;available:boolean;completed:boolean;replaces?:boolean;loading?:boolean;loadFailed?:boolean}) {
  const {state,t} = useLocal();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(()=>{ const dialog=ref.current; dialog?.showModal(); return ()=>dialog?.close(); },[]);
  return <dialog className="path-node-dialog" ref={ref} onKeyDown={e=>{
    if(e.key!=="Tab")return;
    const controls=[...e.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],select:not(:disabled),input:not(:disabled),[tabindex="0"]')];
    const first=controls[0],last=controls.at(-1);
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
  }} onCancel={e=>{e.preventDefault();close();}} aria-labelledby="path-dialog-title" aria-busy={loading}>
    <Button variant="ghost" size="icon" onClick={close} aria-label={t("Cerrar","Close")}><X size={20}/></Button>
    <h2 id="path-dialog-title">{reward?t("Un momento para celebrar","A moment to celebrate"):lesson?.name[state.language] ?? t("Punto de control","Checkpoint")}</h2>
    <p>{unit.name[state.language]}</p>
    {reward ? <><Trophy aria-hidden="true"/><p>{completed?t("Completaste el punto de control de esta unidad. Tu constancia merece una pausa de reconocimiento.","You completed this unit's checkpoint. Take a moment to appreciate your consistency."):t("Este premio simbólico se abre al superar el punto de control.","This symbolic reward opens when you pass the checkpoint.")}</p></> : lesson ? <>
      <p>{lesson.minutes} {t("min estimados","estimated min")} · {t("Hasta","Up to")} {lesson.exerciseIds.length*10+20} XP</p>
      {(lesson.checkpoint || lesson.id.endsWith("-placement")) && <p>{t("Necesitás al menos 80 % de precisión. Los fallos vuelven al final; cuentan para la precisión.","You need at least 80% accuracy. Mistakes return at the end and count toward accuracy.")}</p>}
      {lesson.id.endsWith("-placement") && <p>{t("Superarla abre los nodos de esta unidad; no los marca como completados.","Passing opens this unit's nodes without marking them completed.")}</p>}
      {!available && <p>{t("Completá el nodo anterior o superá la prueba para saltar adelante.","Complete the previous node or pass the skip-ahead test.")}</p>}
      {replaces&&<p>{t("Al comenzar otra lección se reemplaza la sesión pausada. Tus logros anteriores se conservan.","Starting another lesson replaces the paused session. Your earlier achievements are preserved.")}</p>}
      {loading&&<p role="status">{t("Cargando la unidad…","Loading the unit…")}</p>}
      {loadFailed&&<p role="alert">{t("No pudimos descargar esta unidad. Conectate y volvé a intentar; tu progreso se conserva.","We could not download this unit. Reconnect and try again; your progress is preserved.")}</p>}
      <Button disabled={!available||loading} onClick={()=>start(lesson)}>{t("Comenzar","Start")}</Button>
    </> : <p>{t("Este punto de control necesita 15 preguntas distintas. Se abrirá cuando ampliemos el banco de esta unidad.","This checkpoint needs 15 distinct questions. It will open when this unit's bank is expanded.")}</p>}
  </dialog>;
}

export function PathScreen() {
  const {state,ready,error,t,update} = useLocal();
  const progress=state.path ?? emptyPath();
  const [loaded,setLoaded]=useState<Exercise[]>([]),[busy,setBusy]=useState(false),[bankError,setBankError]=useState(false);
  const exercises=new Map(loaded.map(e=>[e.id,e]));
  function merge(items:Exercise[]){setLoaded(previous=>[...new Map([...previous,...items].map(e=>[e.id,e])).values()]);}
  const today=localDay();
  const timer=useRef(0);
  const [selected,setSelected]=useState<{unit:Unit;lesson?:Lesson;reward?:boolean}|null>(null);
  const [showMap,setShowMap]=useState(false);
  const [noReview,setNoReview]=useState(false);
  const daily=dailyGoal(progress,today), goal=daily.percent, game=gameState(progress), currentRank=rank(progress.xp);
  const session=progress.active;
  const search=useSearchParams();
  const cardId=search.get("card"), flashcardMode=search.get("mode")==="flashcards";
  const cardExercises=cardId?runtimeEntries.filter(e=>e.contentId===cardId):[];
  const personalized:Lesson|undefined=session?.lessonId==="personal-review"&&session.reviewOnly?{id:"personal-review",unitId:runtimeEntries.find(e=>e.id===[...session.queue,...session.mastered][0])?.unitId??"hatha" as const,name:{es:"Práctica personalizada",en:"Personal practice"},minutes:4 as const,exerciseIds:[...session.queue,...session.mastered]}:undefined;
  const lesson=personalized??allLessons.find(l=>l.id===session?.lessonId);
  const activeUnit=units.find(u=>u.id===lesson?.unitId);
  const validSession=!!session && !!lesson && [...session.queue,...session.mastered].every(id=>knownIds.has(id)&&lesson.exerciseIds.includes(id)) && (session.reviewOnly || session.total===lesson.exerciseIds.length);

  async function start(lesson:Lesson) {
    const unit=units.find(u=>u.id===lesson.unitId)!;
    if (!canStart(lesson,unit,progress)) return;
    if (session?.lessonId===lesson.id&&!session.finished&&validSession) {setSelected(null);setShowMap(false);return;}
    timer.current=performance.now();
    setBusy(true);setBankError(false);setNoReview(false);
    try {merge(await loadUnit(lesson.unitId));}catch{setBankError(true);setBusy(false);return;}
    setBusy(false);
    const active=startLesson(lesson);
    update(s=>({...s,path:{...(s.path??emptyPath()),active}})); setSelected(null);
    setShowMap(false);
  }
  function change(next:Session) {
    if (!lesson) return;
    update(s=>{
      const previous=s.path??emptyPath();
      if(previous.active?.id!==next.id || previous.active.attempts>next.attempts) return s;
      const timed={...next,seconds:previous.active.seconds??0,awardedSeconds:previous.active.awardedSeconds??0};
      const reviewed=recordReview(previous,previous.active,timed,exercises.get(previous.active.queue[0])!,localDay());
      const awarded=awardAnswer(reviewed,timed);
      const p=syncMastery(timed.finished?completePathSession(awarded.progress,awarded.session,lesson,localDay()):{...awarded.progress,active:awarded.session},units);
      const ex=exercises.get(previous.active.queue[0]);
      const cards=ex?.type==="flashcard"&&timed.attempts>previous.active.attempts?{...s.cards,[ex.flashcardId]:{reviewedAt:new Date().toISOString(),known:timed.correct>previous.active.correct}}:s.cards;
      return {...s,cards,path:p};
    });
  }
  const activeId=session?.id, activeFinished=session?.finished;
  useEffect(()=>{
    timer.current=performance.now();
    if(!activeId||activeFinished||showMap)return;
    const id=setInterval(()=>{const elapsed=!document.hidden?Math.min(10,Math.floor((performance.now()-timer.current)/1000)):0;timer.current=performance.now();if(elapsed)update(s=>{if(s.path?.active?.id!==activeId)return s;const timed=awardTime(s.path,s.path.active,elapsed,localDay());return {...s,path:{...timed.progress,active:timed.session}};});},1000);
    return ()=>clearInterval(id);
  },[activeId,activeFinished,showMap,update]);
  function reviewErrors(){if(!session||!lesson)return;const ids=[...new Set(session.mistakes)];if(!ids.length)return;const active:Session={id:crypto.randomUUID(),lessonId:lesson.id,queue:ids,total:ids.length,mastered:[],attempts:0,correct:0,mistakes:[],finished:false,reviewOnly:true,seconds:0};update(s=>({...s,path:{...(s.path??emptyPath()),active}}));}
  async function startReview(mode:"personal"|"cards"|"errors"|"entry"="personal") {
    setBusy(true);setBankError(false);setNoReview(false);
    try {const all=mode==="entry"?await loadExerciseBanks(cardExercises.map(e=>e.id)):await loadAllBanks();merge(all);
      const pool=mode==="entry"?all.filter(e=>e.contentId===cardId).slice(0,10):selectReview(mode==="cards"||flashcardMode?all.filter(e=>e.type==="flashcard"):all,state,today,mode==="errors");
      const run=makeReview(pool);setNoReview(!run);if(run){update(s=>({...s,path:{...(s.path??emptyPath()),active:run.session}}));setShowMap(false);}
    }catch{setBankError(true);}finally{setBusy(false);}
  }
  const required=session?[...session.queue,...session.mastered].sort().join("|"):"";
  useEffect(()=>{if(!required)return;let live=true;loadExerciseBanks(required.split("|")).then(items=>{if(live)setLoaded(previous=>[...new Map([...previous,...items].map(e=>[e.id,e])).values()]);}).catch(()=>{if(live)setBankError(true);});return ()=>{live=false;};},[required]);
  function leave() {update(s=>({...s,path:{...(s.path??emptyPath()),active:undefined}}));}

  if (!ready) return <div className="path-loading"><p role="status">{t("Preparando tu camino…","Preparing your path…")}</p></div>;
  return <div className="path-screen">
    <header className="path-stats" aria-label={t("Tu actividad","Your activity")}>
      <span><strong>{streakToday(progress,today)}</strong> {t("días de racha","day streak")}</span><span><strong>{progress.xp}</strong> XP</span>
      <div className="path-daily-goal"><div className="path-goal-ring" style={{"--goal":`${goal}%`} as CSSProperties} role="progressbar" aria-label={t("Meta diaria","Daily goal")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={goal}>{goal}%</div><span>{t("Meta diaria","Daily goal")}<small>{Math.floor(daily.value)}/{daily.target} {daily.type==="minutes"?t("minutos","minutes"):t("lecciones","lessons")}</small></span></div>
      <span>{t("Nivel","Level")} <strong>{Math.floor(progress.xp/500)+1}</strong> · {currentRank.name[state.language]}</span>
    </header>
    <ProgressBar value={currentRank.percent} label={currentRank.next?`${t("Próximo rango","Next rank")}: ${currentRank.next[state.language]}`:t("Último rango personal","Final personal rank")}/>
    <details className="panel path-goal-settings"><summary>{t("Tu meta y tus logros","Your goal and achievements")}</summary>
      <p>{t("Los rangos son símbolos de estudio, no certificaciones ni grados espirituales. La racha protege automáticamente un día omitido una vez por semana (lunes a domingo), gratis.","Ranks are study symbols, not certifications or spiritual grades. Your streak automatically protects one missed day per week (Monday to Sunday), free of charge.")}</p>
      <label>{t("Meta diaria","Daily goal")}<select value={`${game.goal.type}:${game.goal.target}`} onChange={e=>{const [type,target]=e.target.value.split(":");update(s=>({...s,path:{...(s.path??emptyPath()),game:{...gameState(s.path??emptyPath()),goal:{type:type as "minutes"|"lessons",target:Number(target)}}}}));}}>
      {[5,10,15,20].map(n=><option key={`m${n}`} value={`minutes:${n}`}>{n} {t("minutos","minutes")}</option>)}{[1,2,3,4].map(n=><option key={`l${n}`} value={`lessons:${n}`}>{n} {t("lecciones","lessons")}</option>)}</select></label>
      <ul>{Object.entries(badgeNames).map(([id,name])=><li key={id}>{game.badges.includes(id)?"✓ ":"○ "}{name[state.language]} · {game.badges.includes(id)?t("Obtenido","Earned"):t("Por descubrir","To discover")}</li>)}</ul>
    </details>
    <div className="panel path-review-actions"><Button disabled={busy} onClick={()=>startReview()}>{t("Practicar · 10 ejercicios","Practice · 10 exercises")}</Button><Button variant="outline" disabled={busy} onClick={()=>startReview("errors")}>{t("Repasar errores","Review mistakes")}</Button><Button variant="ghost" disabled={busy} onClick={()=>startReview("cards")}>{t("Repasar flashcards","Review flashcards")}</Button>
      <p>{t("Primero los errores y repasos vencidos, después nuevas preguntas. Comenzar reemplaza una sesión pausada.","Errors and due reviews first, then new questions. Starting replaces a paused session.")}</p>
      {cardId&&<><p>{cardExercises.length?t("Ejercicios de la ficha seleccionada.","Exercises for the selected entry."):t("Esta ficha todavía no tiene ejercicios asociados.","This entry has no linked exercises yet.")}</p><Button disabled={!cardExercises.length} onClick={()=>startReview("entry")}>{t("Practicar esta ficha","Practice this entry")}</Button></>}
    </div>
    <SectionHeader eyebrow={t("ESTUDIO / CAMINO","STUDY / PATH")} title={t("Tu camino, paso a paso","Your path, step by step")} description={t("Hatha es un buen comienzo. Elegí una unidad y avanzá a tu ritmo; tu actividad se guarda en este dispositivo.","Hatha is a good place to start. Choose a unit and move at your own pace; activity is saved on this device.")}/>
    {noReview&&<p role="status">{t("No hay errores pendientes en este repaso. Podés elegir Practicar para continuar.","There are no pending mistakes in this review. Choose Practice to continue.")}</p>}
    {busy&&<p role="status">{t("Preparando los ejercicios…","Preparing exercises…")}</p>}
    {bankError&&<div className="panel" role="alert"><p>{t("No pudimos cargar el banco. Tu progreso está guardado; conectate para abrir una unidad aún no descargada.","We could not load the bank. Your progress is saved; connect to open a unit not yet downloaded.")}</p><Button onClick={()=>{setBankError(false);if(session)loadExerciseBanks([...session.queue,...session.mastered]).then(merge).catch(()=>setBankError(true));}}>{t("Reintentar","Retry")}</Button></div>}
    {error && <p role="alert">{t("No pudimos guardar la última actualización. Evitá cerrar la página hasta poder exportar tus datos desde Progreso.","We could not save the latest update. Keep this page open until you can export your data from Progress.")}</p>}
    {session && !validSession && <div className="panel"><p role="status">{t("El banco cambió desde tu última lección. Podés volver al camino; tus logros se conservan.","The bank changed since your last lesson. Return to the path; your achievements are preserved.")}</p><Button onClick={leave}>{t("Volver al camino","Back to path")}</Button></div>}
    {validSession && session && lesson && activeUnit && !showMap ? <section aria-label={lesson.name[state.language]} className="path-active">
      <h2>{personalized?lesson.name[state.language]:`${activeUnit.name[state.language]} · ${lesson.name[state.language]}`}</h2>
      {session.finished ? <div className="panel path-session-summary path-celebration" role="status">
        <h3>{lesson.checkpoint||lesson.id.endsWith("-placement")?metrics(session).accuracy>=.8?t("¡Prueba superada!","Test passed!"):t("Un paso más de aprendizaje","Another step in learning"):t("¡Lección completada!","Lesson complete!")}</h3>
        <p>{Math.round(metrics(session).accuracy*100)} % {t("de precisión","accuracy")} · +{metrics(session).xp} XP</p>
        {(lesson.checkpoint||lesson.id.endsWith("-placement"))&&metrics(session).accuracy<.8&&<p>{t("Podés repasar y volver a intentarlo. Necesitás 80 % para superar la prueba.","Review and try again. You need 80% to pass the test.")}</p>}
        <p>{t("Tiempo de práctica activa","Active practice time")}: {Math.floor((session.seconds??0)/60)}:{String((session.seconds??0)%60).padStart(2,"0")}</p>
        {metrics(session).bonus>0&&<p>{t("Bonus por lección sin errores","Error-free lesson bonus")}: +20 XP</p>}
        <p>{t("Cada vuelta a la práctica cuenta. Podés continuar o descansar.","Every return to practice counts. You can continue or rest.")}</p>
        <Button onClick={leave}>{t("Continuar","Continue")}</Button>{session.mistakes.length>0&&<Button variant="outline" onClick={reviewErrors}>{t("Repasar errores","Review mistakes")}</Button>}
      </div> : <>
        {exercises.has(session.queue[0])?<SessionExercise session={session} exercise={exercises.get(session.queue[0])!} onSessionChange={change}/>:<p role="status">{t("Cargando tu lección…","Loading your lesson…")}</p>}
        <Button variant="ghost" onClick={()=>setShowMap(true)}>{t("Ver el recorrido","View the path")}</Button>
        <p className="muted">{t("Podés volver más tarde: el avance se guarda al continuar o saltar.","You can return later: progress is saved when you continue or skip.")}</p>
        <Link className="text-link" href="/study/">{t("Pausar y volver a Estudio","Pause and return to Study")}</Link>
      </>}
    </section> : (!session||showMap) && <>
      {session&&!session.finished&&validSession&&<div className="panel"><p>{t("Tu lección está en curso.","Your lesson is in progress.")}</p><Button onClick={()=>setShowMap(false)}>{t("Continuar lección","Resume lesson")}</Button></div>}
      {progress.xp===0 && <div className="panel"><h2>{t("Un primer paso pequeño","One small first step")}</h2><p>{t("Tocá un nodo disponible. Los errores vuelven para que puedas practicar y no hay vidas ni penalizaciones por saltar.","Choose an available node. Mistakes return for practice; there are no lives and no penalty for skipping.")}</p></div>}
      {!units.length && <EmptyState title={t("Tu camino se está preparando","Your path is being prepared")} description={t("Volvé pronto para encontrar nuevas lecciones.","Come back soon for new lessons.")}/>}
      {units.map((unit,index)=>{
        const section=sections.find(s=>s.id===unit.id)!;
        const checkpoint=assessment(unit,pathExercises,"checkpoint");
        const placement=assessment(unit,pathExercises,"placement");
        const done=unit.lessons.filter(l=>progress.completed.includes(l.id)).length;
        const checkpointDone=progress.completed.includes(`${unit.id}-checkpoint`);
        const nodes=[...unit.lessons.map(lesson=>({lesson,reward:false})),{lesson:checkpoint??undefined,reward:false},{lesson:undefined,reward:true}];
        const path=nodes.map((_,i)=>`${i===0?"M":"S"} ${200+offset(i)} ${i*184+40}${i===0?"":` ${200+offset(i)} ${i*184+40}`}`).join(" ");
        return <section key={unit.id} className="path-unit" aria-labelledby={`unit-${unit.id}`}>
          <div className={`panel path-unit-heading ${section.color}`}><span className="eyebrow">{t("UNIDAD","UNIT")} {index+1}</span><h2 id={`unit-${unit.id}`}>{unit.name[state.language]}</h2>
            <p>{done}/{unit.lessons.length} {t("lecciones completadas","lessons completed")}</p><ProgressBar value={done/unit.lessons.length*100} label={unit.name[state.language]}/>
            {placement&&<Button variant="outline" onClick={()=>setSelected({unit,lesson:placement})}>{t("Saltar adelante","Skip ahead")}</Button>}
          </div>
          <div className="path-traversal">
            <svg viewBox={`0 0 400 ${nodes.length*184}`} preserveAspectRatio="none" className="path-trail" aria-hidden="true"><path d={path}/></svg>
          <ol className="path-nodes">
            {nodes.map((node,i)=>{
              const status=node.reward?checkpointDone?"completed":"locked":node.lesson?nodeState(node.lesson,unit,progress):"locked";
              const name=node.reward?t("Premio de la unidad","Unit reward"):node.lesson?.name[state.language]??t("Punto de control","Checkpoint");
              const label=({locked:t("Bloqueado","Locked"),available:t("Disponible","Available"),"in-progress":t("En curso","In progress"),completed:t("Completado","Completed"),mastered:t("Dominado","Mastered")})[status];
              const stars=node.lesson?progress.nodes[node.lesson.id]?.mastery??0:0;
              return <li key={node.lesson?.id??(node.reward?"reward":"checkpoint")} style={{"--node-offset":`${offset(i)/4}%`} as CSSProperties}>
                <button type="button" className="path-node" data-state={status} onClick={()=>setSelected({unit,lesson:node.lesson,reward:node.reward})} aria-label={`${name}. ${label}${stars?`. ${stars}/5 ${t("estrellas","stars")}`:""}`}>
                  {node.reward?<Trophy aria-hidden="true"/>:status==="locked"?<LockKeyhole aria-hidden="true"/>:status==="completed"||status==="mastered"?<Check aria-hidden="true"/>:node.lesson?.checkpoint?<Flag aria-hidden="true"/>:<Play aria-hidden="true"/>}
                </button><span className="path-node-title">{name}</span><small>{label}</small>
                {stars>0&&<span className="path-stars" aria-hidden="true">{Array.from({length:5},(_,n)=><Star key={n} size={12} fill={n<stars?"currentColor":"none"}/>)}</span>}
              </li>;
            })}
          </ol>
          </div>
        </section>;
      })}
    </>}
    {selected&&<NodeDialog {...selected} loading={busy} loadFailed={bankError} close={()=>setSelected(null)} start={start} replaces={!!session&&!session.finished&&session.lessonId!==selected.lesson?.id} available={!!selected.lesson&&canStart(selected.lesson,selected.unit,progress)} completed={progress.completed.includes(`${selected.unit.id}-checkpoint`)}/>}
  </div>;
}
