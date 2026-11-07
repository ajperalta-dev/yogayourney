"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { useLocal } from "./providers";
import { clockTime } from "@/lib/utils";
export function Timer({
  seconds = 180,
  onComplete,
  compact = false,
}: {
  seconds?: number;
  onComplete?: () => void;
  compact?: boolean;
}) {
  const { t } = useLocal();
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);
  const notified = useRef(false);
  const callback = useRef(onComplete);
  useEffect(() => {
    callback.current = onComplete;
  }, [onComplete]);
  const tick = useCallback(() => {
    const next = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
    setRemaining(next);
    if (next === 0) {
      setRunning(false);
      if (!notified.current) {
        notified.current = true;
        callback.current?.();
      }
    }
  }, []);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(tick, 200);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [running, tick]);
  return (
    <div className={`timer ${compact ? "compact" : ""}`}>
      <div
        className="timer-digits"
        role="timer"
        aria-label={t("Tiempo restante", "Time remaining")}
      >
        {clockTime(remaining)}
      </div>
      <div className="row center">
        <Button
          disabled={remaining === 0}
          variant={compact ? "outline" : "default"}
          aria-label={
            running
              ? t("Pausar temporizador", "Pause timer")
              : t("Iniciar temporizador", "Start timer")
          }
          onClick={() => {
            if (running) {
              tick();
              setRunning(false);
            } else {
              deadline.current = Date.now() + remaining * 1000;
              setRunning(true);
            }
          }}
        >
          {running ? <Pause size={16} /> : <Play size={16} />}{" "}
          {running ? t("Pausar", "Pause") : t("Comenzar", "Start")}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("Reiniciar temporizador", "Reset timer")}
          onClick={() => {
            setRunning(false);
            setRemaining(seconds);
            notified.current = false;
          }}
        >
          <RotateCcw size={17} />
        </Button>
      </div>
      {remaining === 0 && (
        <p role="status" className="small">
          {t(
            "Tiempo completado. Sal con calma.",
            "Time complete. Come out gently.",
          )}
        </p>
      )}
    </div>
  );
}
export function BreathingGuide({
  inhale,
  exhale,
  hold = 0,
  instructorLed = false,
}: {
  inhale: number;
  exhale: number;
  hold?: number;
  instructorLed?: boolean;
}) {
  const { t } = useLocal();
  const [active, setActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const started = useRef(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - started.current) / 1000)),
      200,
    );
    return () => clearInterval(id);
  }, [active]);
  const cycle = inhale + hold + exhale;
  const phase = elapsed % cycle;
  const currentPhase =
    phase < inhale ? "inhale" : phase < inhale + hold ? "hold" : "exhale";
  const phaseDuration =
    currentPhase === "inhale"
      ? inhale
      : currentPhase === "hold"
        ? hold
        : exhale;
  const phaseStart =
    currentPhase === "inhale" ? 0 : currentPhase === "hold" ? inhale : inhale + hold;
  const phaseRemaining = phaseDuration - (phase - phaseStart);
  const ratio = `${inhale} : ${hold} : ${exhale}`;
  return (
    <div className="breathing-guide">
      <div
        className={`breath-orb ${active && currentPhase === "inhale" ? "inhale" : ""}`}
        style={{ transitionDuration: `${phaseDuration}s` }}
      >
        <span>
          {instructorLed
            ? t("Solo con instructor", "With a teacher only")
            : active
              ? currentPhase === "inhale"
                ? t("Inspira", "Breathe in")
                : currentPhase === "hold"
                  ? t("Retén suavemente", "Hold gently")
                  : t("Espira", "Breathe out")
              : t("Respira", "Breathe")}
          <strong>
            {active && !instructorLed ? Math.ceil(phaseRemaining) : ratio}
          </strong>
        </span>
      </div>
      {!instructorLed && (
        <Button
          variant="outline"
          onClick={() => {
            if (active) {
              setActive(false);
              return;
            }
            started.current = Date.now();
            setElapsed(0);
            setActive(true);
          }}
        >
          {active
            ? t("Detener guía", "Stop guide")
            : t("Iniciar guía visual", "Start visual guide")}
        </Button>
      )}
      <p className="small muted">
        {t(
          instructorLed
            ? "No uses el conteo en solitario; el temporizador general es solo para registrar la práctica con tu instructor."
            : "Cada conteo dura aproximadamente un segundo en esta guía. Adaptá el ritmo o detenela si deja de ser cómodo; no hay retenciones.",
          instructorLed
            ? "Do not use the count on your own; the general timer is only for tracking practice with your teacher."
            : "Each count lasts about one second in this guide. Adjust the pace or stop if it becomes uncomfortable; no breath holds are used.",
        )}
      </p>
    </div>
  );
}
