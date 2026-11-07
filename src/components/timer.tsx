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
}: {
  inhale: number;
  exhale: number;
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
  const phase = elapsed % (inhale + exhale);
  const breathingIn = phase < inhale;
  return (
    <div className="breathing-guide">
      <div
        className={`breath-orb ${active && breathingIn ? "inhale" : ""}`}
        style={{ transitionDuration: `${breathingIn ? inhale : exhale}s` }}
      >
        <span>
          {active
            ? breathingIn
              ? t("Inspira", "Breathe in")
              : t("Espira", "Breathe out")
            : t("Respira", "Breathe")}
          <strong>
            {active
              ? breathingIn
                ? inhale - phase
                : inhale + exhale - phase
              : "4 : 4"}
          </strong>
        </span>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          started.current = Date.now();
          setElapsed(0);
          setActive(!active);
        }}
      >
        {active
          ? t("Detener guía", "Stop guide")
          : t("Iniciar guía visual", "Start visual guide")}
      </Button>
      <p className="small muted">
        {t(
          "Sin retenciones. Sigue tu propio ritmo si lo prefieres.",
          "No breath holds. Follow your own rhythm if you prefer.",
        )}
      </p>
    </div>
  );
}
