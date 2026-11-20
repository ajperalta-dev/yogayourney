"use client";

import Image from "next/image";
import Link from "next/link";
import { byId, sectionFor } from "@/content/catalog";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ProgressBar } from "../common";
import { useLocal } from "../providers";
import { answer, metrics, skipExercise } from "@/lib/path/engine";
import { gradeExercise, isResponseComplete, orderTokens, validExercise } from "@/lib/path/grading";
import type { Exercise, ExerciseImage, ExerciseResponse, Session } from "@/lib/path/models";

function PoseImage({ image }: { image: ExerciseImage }) {
  const { state, t } = useLocal();
  const [failed, setFailed] = useState(false);
  return <div className="path-exercise-image">{failed ?
    <p role="img" aria-label={image.alt[state.language]}>{t("Imagen no disponible. Usa la descripción:", "Image unavailable. Use the description:")} {image.alt[state.language]}</p> :
    <Image src={image.src} alt={image.alt[state.language]} width={640} height={480} sizes="(max-width: 600px) 90vw, 400px" onError={() => setFailed(true)} />}</div>;
}

async function playFeedback(correct: boolean, sound: boolean, vibration: boolean) {
  try { if (vibration && typeof navigator.vibrate === "function") navigator.vibrate(correct ? 30 : [20, 40, 20]); } catch { /* Optional device capability. */ }
  if (!sound || typeof AudioContext === "undefined") return;
  let context: AudioContext | undefined;
  try {
    context = new AudioContext();
    await context.resume();
    const tone = context.createOscillator(), gain = context.createGain();
    tone.frequency.value = correct ? 520 : 240;
    gain.gain.setValueAtTime(.04, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .15);
    tone.connect(gain); gain.connect(context.destination);
    tone.start(); tone.stop(context.currentTime + .16);
    tone.onended = () => { void context?.close(); };
  } catch { void context?.close(); }
}

export interface ExerciseProps {
  exercise: Exercise;
  onContinue: (correct: boolean) => void;
  onSkip: () => void;
  turn?: number | string;
}

/** Keep this wrapper mounted across exercises to retain optional effects. */
export function PathExercise(props: ExerciseProps) {
  const { state, t } = useLocal();
  const [sound, setSound] = useState(false), [vibration, setVibration] = useState(false);
  if (!validExercise(props.exercise)) return <div className="panel"><p role="alert">{t("Este ejercicio necesita revisión. Puedes saltarlo.", "This exercise needs review. You can skip it.")}</p><Button type="button" onClick={props.onSkip}>{t("Saltar", "Skip")}</Button></div>;
  return <section className="panel path-exercise">
    <fieldset className="path-effects"><legend>{t("Efectos opcionales", "Optional effects")}</legend>
      <label><input type="checkbox" checked={sound} onChange={e => setSound(e.target.checked)} />{t("Sonido", "Sound")}</label>
      <label><input type="checkbox" checked={vibration} onChange={e => setVibration(e.target.checked)} />{t("Vibración (si está disponible)", "Vibration (if supported)")}</label>
    </fieldset>
    {byId[props.exercise.contentId]&&<Link className="text-link" href={`/${sectionFor(byId[props.exercise.contentId])}/${props.exercise.contentId}/`} target="_blank" rel="noopener noreferrer">{t("Ver la ficha (otra pestaña)","View entry (new tab)")}</Link>}
    {props.exercise.type==="flashcard"?<FlashcardBody sound={sound} vibration={vibration} key={`${props.exercise.id}-${props.turn??0}`} {...props}/>:<ExerciseBody key={`${props.exercise.id}-${props.turn ?? 0}-${state.language}`} {...props} sound={sound} vibration={vibration} />}
  </section>;
}

function FlashcardBody({exercise,onContinue,onSkip,sound,vibration}:ExerciseProps&{sound:boolean;vibration:boolean}){
 const heading=useRef<HTMLHeadingElement>(null),back=useRef<HTMLParagraphElement>(null),feedback=useRef<HTMLParagraphElement>(null);
 useEffect(()=>{heading.current?.focus();},[]);
 function assess(value:boolean){setKnown(value);void playFeedback(value,sound,vibration);requestAnimationFrame(()=>feedback.current?.focus());}
 const {state,t}=useLocal();const [revealed,reveal]=useState(false),[known,setKnown]=useState<boolean|null>(null);const sent=useRef(false);
 return <div className="path-exercise-body"><h2 ref={heading} tabIndex={-1}>{exercise.prompt[state.language]}</h2><p>{t("Autoevaluación: intentá recordar antes de comprobar.","Self-assessment: try to recall before checking.")}</p>
 {!revealed?<Button onClick={()=>{reveal(true);requestAnimationFrame(()=>back.current?.focus());}}>{t("Comprobar","Check")}</Button>:<><p ref={back} tabIndex={-1} role="status">{exercise.explanation[state.language]}</p>{known===null?<div className="path-exercise-actions"><Button onClick={()=>assess(true)}>{t("La sabía","I knew it")}</Button><Button variant="outline" onClick={()=>assess(false)}>{t("Todavía no","Not yet")}</Button></div>:<><p ref={feedback} tabIndex={-1} role="status">{known?t("¡Bien! Continuá cuando quieras.","Well done! Continue when ready."):t("Volverá a la cola para practicarla.","It will return to the queue for practice.")}</p><Button onClick={()=>{if(!sent.current){sent.current=true;onContinue(known);}}}>{t("Continuar","Continue")}</Button></>}</>}
 {known===null&&<Button variant="ghost" onClick={()=>{if(!sent.current){sent.current=true;onSkip();}}}>{t("Saltar","Skip")}</Button>}</div>;
}

function ExerciseBody({ exercise, onContinue, onSkip, sound, vibration }: ExerciseProps & { sound: boolean; vibration: boolean }) {
  const { state, t } = useLocal();
  const language = state.language;
  const uid = useId();
  const [response, setResponse] = useState<ExerciseResponse>(exercise.type === "matching" ? {} : exercise.type === "sequence-order" || exercise.type === "word-order" ? [] : -1);
  const [result, setResult] = useState<boolean | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const sent = useRef(false);
  const feedback = useRef<HTMLDivElement>(null);
  const prompt = useRef<HTMLHeadingElement>(null);
  const bank = useRef<HTMLDivElement>(null);
  const checkButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { prompt.current?.focus(); }, []);
  function focusNextToken() {
    requestAnimationFrame(() => (bank.current?.querySelector<HTMLButtonElement>("button") ?? checkButton.current)?.focus());
  }
  const locked = result !== null;
  const complete = isResponseComplete(exercise, response, language);

  function check() {
    if (locked || !complete) return;
    const correct = gradeExercise(exercise, response, language);
    setResult(correct);
    void playFeedback(correct, sound, vibration);
    requestAnimationFrame(() => feedback.current?.focus());
  }

  const ordered = "tokens" in exercise ? response as string[] : [];
  const tokens = "tokens" in exercise ? orderTokens(exercise, language) : [];
  return <div className="path-exercise-body">
    <h2 ref={prompt} tabIndex={-1} id={`${uid}-prompt`}>{exercise.prompt[language]}</h2>
    <p id={`${uid}-help`} className="muted">{"tokens" in exercise ? t("Elige cada elemento en orden. Puedes quitarlo o empezar de nuevo.", "Choose each item in order. You can remove items or start again.") : exercise.type === "matching" ? t("Elige una pareja distinta para cada elemento.", "Choose a different match for each item.") : t("Elige una respuesta y pulsa Comprobar.", "Choose an answer and press Check.")}</p>

    {"image" in exercise && exercise.image && <PoseImage image={exercise.image} />}

    {"options" in exercise && <fieldset disabled={locked} aria-describedby={`${uid}-help`} className="path-choices">
      <legend className="sr-only">{exercise.prompt[language]}</legend>
      {exercise.options.map((option, index) => <label key={index} className="path-choice">
        <input type="radio" name={uid} value={index} checked={response === index} onChange={() => setResponse(index)} />
        {exercise.type === "name-to-image" && exercise.optionImages?.[index] && <PoseImage image={exercise.optionImages[index]} />}
        <span>{option[language]}</span>
      </label>)}
    </fieldset>}

    {exercise.type === "matching" && <fieldset disabled={locked} className="path-pairs" aria-describedby={`${uid}-help`}>
      <legend className="sr-only">{exercise.prompt[language]}</legend>
      {exercise.left.map(item => <label key={item.id}>
        <span>{item.label[language]}</span>
        <select value={(response as Record<string, string>)[item.id] ?? ""} onChange={e => setResponse({ ...response as Record<string, string>, [item.id]: e.target.value })}>
          <option value="">{t("Elegir pareja", "Choose match")}</option>
          {exercise.right.map(right => <option key={right.id} value={right.id} disabled={Object.entries(response as Record<string, string>).some(([left, value]) => left !== item.id && value === right.id)}>{right.label[language]}</option>)}
        </select>
      </label>)}
    </fieldset>}

    {"tokens" in exercise && <fieldset disabled={locked} aria-describedby={`${uid}-help`} className="path-order">
      <legend>{t("Tu orden", "Your order")}</legend>
      <ol>{ordered.map((id, index) => <li key={id}>
        <span>{tokens.find(token => token.id === id)?.label[language]}</span>
        <Button type="button" variant="ghost" onClick={() => { setResponse(ordered.filter(token => token !== id)); setAnnouncement(t("Elemento quitado", "Item removed")); focusNextToken(); }} aria-label={`${t("Quitar posición", "Remove position")} ${index + 1}`}>{t("Quitar", "Remove")}</Button>
      </li>)}</ol>
      <div ref={bank} className="path-token-bank">{tokens.filter(token => !ordered.includes(token.id)).map(token => <Button type="button" key={token.id} variant="outline" onClick={() => {
        setResponse([...ordered, token.id]); setAnnouncement(`${token.label[language]} · ${ordered.length + 1}`); focusNextToken();
      }}>{token.label[language]}</Button>)}</div>
      <Button type="button" variant="ghost" disabled={!ordered.length} onClick={() => { setResponse([]); setAnnouncement(t("Orden reiniciado", "Order reset")); }}>{t("Empezar de nuevo", "Start again")}</Button>
    </fieldset>}

    <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
    <div className="path-feedback" data-result={result === null ? "pending" : result ? "correct" : "incorrect"} ref={feedback} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true" aria-label={t("Resultado", "Result")}>
      {locked && <><h3 id={`${uid}-feedback`}>{result ? t("¡Bien hecho!", "Well done!") : t("Buen intento. Lo repasaremos de nuevo.", "Good try. We'll review this again.")}</h3><p>{exercise.explanation[language]}</p></>}
    </div>
    <div className="path-exercise-actions">
      {!locked ? <><Button ref={checkButton} type="button" disabled={!complete} onClick={check}>{t("Comprobar", "Check")}</Button><Button type="button" variant="ghost" onClick={() => { if (!sent.current) { sent.current = true; onSkip(); } }}>{t("Saltar", "Skip")}</Button></> :
        <Button type="button" onClick={() => { if (!sent.current) { sent.current = true; onContinue(result); } }}>{t("Continuar", "Continue")}</Button>}
    </div>
  </div>;
}

/** Host adapter: scoring/requeueing stay in the pure lesson engine. */
export function SessionExercise({ session, exercise, onSessionChange }: { session: Session; exercise: Exercise; onSessionChange: (session: Session) => void }) {
  const { t } = useLocal();
  const [turn, setTurn] = useState(0);
  if (session.finished || session.queue[0] !== exercise.id) return null;
  return <>
    <ProgressBar value={Math.round(metrics(session).progress * 100)} label={t("Progreso de la lección", "Lesson progress")} />
    <PathExercise turn={`${session.id}-${turn}`} exercise={exercise} onContinue={correct => { onSessionChange(answer(session, correct)); setTurn(n => n + 1); }} onSkip={() => { onSessionChange(skipExercise(session)); setTurn(n => n + 1); }} />
  </>;
}
