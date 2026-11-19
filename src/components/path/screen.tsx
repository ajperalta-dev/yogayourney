"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Check, Flag, LockKeyhole, Play, Star, Trophy, X } from "lucide-react";
import { pathUnits, pathExercises } from "@/content/path";
import { sections } from "@/content/sections";
import { emptyPath, metrics, startLesson } from "@/lib/path/engine";
import { assessment, canStart, completePathSession, localDay, nodeState, streakToday } from "@/lib/path/graph";
import type { Lesson, Session, Unit } from "@/lib/path/models";
import { Button } from "../ui/button";
import { EmptyState, ProgressBar, SectionHeader } from "../common";
import { useLocal } from "../providers";
import { SessionExercise } from "./exercise";

const units = [...pathUnits].sort((a,b) => (a.id === "hatha" ? -1 : b.id === "hatha" ? 1 : pathUnits.indexOf(a)-pathUnits.indexOf(b)));
const exercises = new Map(pathExercises.map(e=>[e.id,e]));
const allLessons = units.flatMap(unit=>[...unit.lessons, assessment(unit,pathExercises,"checkpoint"),assessment(unit,pathExercises,"placement")].filter((l):l is Lesson=>!!l));
const offset = (i:number) => [0, 68, 90, 0, -90, -68][i%6];

function NodeDialog({unit, lesson, reward, close, start, available, completed, replaces}: {unit:Unit;lesson?:Lesson;reward?:boolean;close:()=>void;start:(lesson:Lesson)=>void;available:boolean;completed:boolean;replaces?:boolean}) {
  const {state,t} = useLocal();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(()=>{ const dialog=ref.current; dialog?.showModal(); return ()=>dialog?.close(); },[]);
  return <dialog className="path-node-dialog" ref={ref} onCancel={e=>{e.preventDefault();close();}} aria-labelledby="path-dialog-title">
    <Button variant="ghost" size="icon" onClick={close} aria-label={t("Cerrar","Close")}><X size={20}/></Button>
    <h2 id="path-dialog-title">{reward?t("Un momento para celebrar","A moment to celebrate"):lesson?.name[state.language] ?? t("Punto de control","Checkpoint")}</h2>
    <p>{unit.name[state.language]}</p>
    {reward ? <><Trophy aria-hidden="true"/><p>{completed?t("Completaste el punto de control de esta unidad. Tu constancia merece una pausa de reconocimiento.","You completed this unit's checkpoint. Take a moment to appreciate your consistency."):t("Este premio simbólico se abre al superar el punto de control.","This symbolic reward opens when you pass the checkpoint.")}</p></> : lesson ? <>
      <p>{lesson.minutes} {t("min estimados","estimated min")} · {t("Hasta","Up to")} {lesson.exerciseIds.length*10} XP</p>
      {(lesson.checkpoint || lesson.id.endsWith("-placement")) && <p>{t("Necesitás al menos 80 % de precisión. Los fallos vuelven al final; cuentan para la precisión.","You need at least 80% accuracy. Mistakes return at the end and count toward accuracy.")}</p>}
      {lesson.id.endsWith("-placement") && <p>{t("Superarla abre los nodos de esta unidad; no los marca como completados.","Passing opens this unit's nodes without marking them completed.")}</p>}
      {!available && <p>{t("Completá el nodo anterior o superá la prueba para saltar adelante.","Complete the previous node or pass the skip-ahead test.")}</p>}
      {replaces&&<p>{t("Al comenzar otra lección se reemplaza la sesión pausada. Tus logros anteriores se conservan.","Starting another lesson replaces the paused session. Your earlier achievements are preserved.")}</p>}
      <Button disabled={!available} onClick={()=>start(lesson)}>{t("Comenzar","Start")}</Button>
    </> : <p>{t("Este punto de control necesita 15 preguntas distintas. Se abrirá cuando ampliemos el banco de esta unidad.","This checkpoint needs 15 distinct questions. It will open when this unit's bank is expanded.")}</p>}
  </dialog>;
}

export function PathScreen() {
  const {state,ready,error,t,update} = useLocal();
  const progress=state.path ?? emptyPath();
  const today=localDay();
  const [selected,setSelected]=useState<{unit:Unit;lesson?:Lesson;reward?:boolean}|null>(null);
  const [showMap,setShowMap]=useState(false);
  const goal = Math.min(100, Math.round((progress.lastActivity===today?progress.dailyXp:0)/progress.dailyGoal*100));
  const session=progress.active;
  const lesson=allLessons.find(l=>l.id===session?.lessonId);
  const activeUnit=units.find(u=>u.id===lesson?.unitId);
  const validSession=!!session && !!lesson && [...session.queue,...session.mastered].every(id=>lesson.exerciseIds.includes(id)) && session.total===lesson.exerciseIds.length;

  function start(lesson:Lesson) {
    const unit=units.find(u=>u.id===lesson.unitId)!;
    if (!canStart(lesson,unit,progress)) return;
    if (session?.lessonId===lesson.id&&!session.finished&&validSession) {setSelected(null);setShowMap(false);return;}
    const active=startLesson(lesson);
    update(s=>({...s,path:{...(s.path??emptyPath()),active}})); setSelected(null);
    setShowMap(false);
  }
  function change(next:Session) {
    if (!lesson) return;
    update(s=>{
      const previous=s.path??emptyPath();
      if(previous.active?.id!==next.id || previous.active.attempts>next.attempts) return s;
      return {...s,path:next.finished?completePathSession(previous,next,lesson,today):{...previous,active:next}};
    });
  }
  function leave() {update(s=>({...s,path:{...(s.path??emptyPath()),active:undefined}}));}

  if (!ready) return <p role="status">{t("Preparando tu camino…","Preparing your path…")}</p>;
  return <div className="path-screen">
    <header className="path-stats" aria-label={t("Tu actividad","Your activity")}>
      <span><strong>{streakToday(progress,today)}</strong> {t("días de racha","day streak")}</span><span><strong>{progress.xp}</strong> XP</span>
      <div className="path-daily-goal"><div className="path-goal-ring" style={{"--goal":`${goal}%`} as CSSProperties} role="progressbar" aria-label={t("Meta diaria","Daily goal")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={goal}>{goal}%</div><span>{t("Meta diaria","Daily goal")}<small>{progress.lastActivity===today?progress.dailyXp:0}/{progress.dailyGoal} XP</small></span></div>
      <span>{t("Nivel","Level")} <strong>{Math.floor(progress.xp/500)+1}</strong></span>
    </header>
    <SectionHeader eyebrow={t("ESTUDIO / CAMINO","STUDY / PATH")} title={t("Tu camino, paso a paso","Your path, step by step")} description={t("Hatha es un buen comienzo. Elegí una unidad y avanzá a tu ritmo; tu actividad se guarda en este dispositivo.","Hatha is a good place to start. Choose a unit and move at your own pace; activity is saved on this device.")}/>
    {error && <p role="alert">{t("No pudimos guardar la última actualización. Evitá cerrar la página hasta poder exportar tus datos desde Progreso.","We could not save the latest update. Keep this page open until you can export your data from Progress.")}</p>}
    {session && !validSession && <div className="panel"><p role="status">{t("El banco cambió desde tu última lección. Podés volver al camino; tus logros se conservan.","The bank changed since your last lesson. Return to the path; your achievements are preserved.")}</p><Button onClick={leave}>{t("Volver al camino","Back to path")}</Button></div>}
    {validSession && session && lesson && activeUnit && !showMap ? <section aria-label={lesson.name[state.language]} className="path-active">
      <h2>{activeUnit.name[state.language]} · {lesson.name[state.language]}</h2>
      {session.finished ? <div className="panel path-session-summary" role="status">
        <h3>{lesson.checkpoint||lesson.id.endsWith("-placement")?metrics(session).accuracy>=.8?t("¡Prueba superada!","Test passed!"):t("Un paso más de aprendizaje","Another step in learning"):t("¡Lección completada!","Lesson complete!")}</h3>
        <p>{Math.round(metrics(session).accuracy*100)} % {t("de precisión","accuracy")} · +{metrics(session).xp} XP</p>
        {(lesson.checkpoint||lesson.id.endsWith("-placement"))&&metrics(session).accuracy<.8&&<p>{t("Podés repasar y volver a intentarlo. Necesitás 80 % para superar la prueba.","Review and try again. You need 80% to pass the test.")}</p>}
        <Button onClick={leave}>{t("Volver al camino","Back to path")}</Button>
      </div> : <>
        <SessionExercise session={session} exercise={exercises.get(session.queue[0])!} onSessionChange={change}/>
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
    {selected&&<NodeDialog {...selected} close={()=>setSelected(null)} start={start} replaces={!!session&&!session.finished&&session.lessonId!==selected.lesson?.id} available={!!selected.lesson&&canStart(selected.lesson,selected.unit,progress)} completed={progress.completed.includes(`${selected.unit.id}-checkpoint`)}/>}
  </div>;
}
