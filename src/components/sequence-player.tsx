"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import type { ContentItem, Sequence } from "@/lib/models";
import { useLocal } from "./providers";
import { Button } from "./ui/button";
import {
  SectionHeader,
  ProgressBar,
  SafetyAlert,
  FavoriteButton,
  EmptyState,
} from "./common";
import { Timer } from "./timer";
export function SequencePlayer({
  sequence,
  items,
}: {
  sequence: Sequence;
  items: ContentItem[];
}) {
  const { state, t, update } = useLocal();
  const [position, setPosition] = useState(0);
  const [finished, setFinished] = useState(false);
  const [done, setDone] = useState<number[]>([]);
  const [mode, setMode] = useState<"study" | "practice">("practice");
  const itemsById = new Map(items.map((item) => [item.id, item]));
  const step = sequence.steps[position];
  const item = step && itemsById.get(step.contentId);
  const restricted = items.some((i) => i.studyOnly);
  const effectiveStudy = mode === "study" || restricted;
  if (!item || sequence.steps.some((step) => !itemsById.has(step.contentId)))
    return (
      <EmptyState
        title={t(
          "La secuencia contiene una ficha no disponible",
          "This sequence contains an unavailable entry",
        )}
      >
        <Link href="/teach/builder/">
          {t("Revisar en el constructor", "Review in the builder")}
        </Link>
      </EmptyState>
    );
  const lang = state.language;
  const section =
    item.kind === "asana"
      ? "hatha"
      : item.kind === "mantra"
        ? "mantras"
        : item.kind === "kriya"
          ? "kriyas"
          : item.kind;
  const instructions =
    item.kind === "asana" ||
    item.kind === "pranayama" ||
    item.kind === "meditation"
      ? item.instructions
      : item.kind === "yin" || item.kind === "aerial"
        ? item.entry
        : item.summary;
  function finish() {
    if (finished) return;
    setFinished(true);
    update((s) => ({
      ...s,
      sessions: [
        ...s.sessions,
        {
          id: crypto.randomUUID(),
          sequenceId: sequence.id,
          completedAt: new Date().toISOString(),
          seconds: sequence.steps.reduce((sum, s) => sum + s.duration, 0),
        },
      ],
    }));
  }
  return (
    <>
      <Link className="text-link" href="/practice/">
        <ArrowLeft size={15} />
        {t("Todas las prácticas", "All practices")}
      </Link>
      <SectionHeader
        eyebrow={sequence.style.toUpperCase()}
        title={sequence.name[lang]}
        description={sequence.description[lang]}
        action={<FavoriteButton id={sequence.id} />}
      />
      {restricted && (
        <SafetyAlert>
          {t(
            "Esta secuencia contiene yoga aéreo supervisado. El reproductor permite repasar las fichas; el temporizador autónomo está desactivado.",
            "This sequence includes supervised aerial yoga. The player supports study review; the independent practice timer is disabled.",
          )}
        </SafetyAlert>
      )}
      <div className="filter-tabs">
        <button onClick={() => setMode("study")} aria-pressed={effectiveStudy}>
          {t("Modo estudio", "Study mode")}
        </button>
        <button
          disabled={restricted}
          onClick={() => setMode("practice")}
          aria-pressed={!effectiveStudy}
        >
          {t("Modo práctica", "Practice mode")}
        </button>
      </div>
      {finished ? (
        <div className="completion panel">
          <Check size={44} />
          <h2>{t("Un momento para integrar", "A moment to integrate")}</h2>
          <p>
            {t(
              "Sesión guardada en tu progreso local.",
              "Session saved to your local progress.",
            )}
          </p>
          <Button asChild>
            <Link href="/study/progress/">
              {t("Ver progreso", "View progress")}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="player-layout">
          <div className="player-visual">
            <Image
              src={item.image}
              alt={item.name[lang]}
              fill
              sizes="(max-width: 800px) 95vw, 60vw"
              priority
            />
            <span className="badge">
              {t("Ilustración orientativa", "Illustrative placeholder")}
            </span>
          </div>
          <div className="panel player-info">
            <div className="row between">
              <span className="eyebrow">
                {t("PASO", "STEP")} {position + 1} / {sequence.steps.length}
              </span>
              <span className="small">
                {Math.round(((position + 1) / sequence.steps.length) * 100)}%
              </span>
            </div>
            <ProgressBar
              value={((position + 1) / sequence.steps.length) * 100}
              label={t("Progreso de secuencia", "Sequence progress")}
            />
            <h2>{item.name[lang]}</h2>
            {item.sanskrit && <p className="sanskrit">{item.sanskrit}</p>}
            <p>{instructions[lang]}</p>
            {item.kind === "asana" && <p className="small muted">{item.hold[lang]}</p>}
            <div className="breath-note">
              {item.breathing[lang]}
              {item.kind === "asana" && (
                <p>
                  <strong>Drishti:</strong> {item.drishti[lang]}
                </p>
              )}
            </div>
            {item.kind === "yin" && (
              <p className="small">{item.rebound[lang]}</p>
            )}
            {effectiveStudy ? (
              <>
                <SafetyAlert>{item.safety[lang]}</SafetyAlert>
                <Button variant="outline" asChild>
                  <Link href={`/${section}/${item.id}/`}>
                    {t("Abrir ficha completa", "Open complete study entry")}
                    <ExternalLink size={15} />
                  </Link>
                </Button>
              </>
            ) : (
              <Timer
                key={`${sequence.id}-${position}`}
                seconds={step.duration}
                onComplete={() =>
                  setDone((d) => (d.includes(position) ? d : [...d, position]))
                }
                compact
              />
            )}
            <div className="player-controls">
              <Button
                variant="outline"
                disabled={position === 0}
                onClick={() => setPosition((p) => p - 1)}
                aria-label={t("Anterior", "Previous")}
              >
                <ArrowLeft size={17} />
              </Button>
              <Button
                variant="outline"
                disabled={position === sequence.steps.length - 1}
                onClick={() => setPosition((p) => p + 1)}
              >
                {t("Siguiente", "Next")}
                <ArrowRight size={17} />
              </Button>
            </div>
            {!effectiveStudy && (
              <>
                <Button
                  variant="ghost"
                  disabled={done.includes(position)}
                  onClick={() => setDone((d) => [...d, position])}
                >
                  <Check size={15} />
                  {done.includes(position)
                    ? t("Paso completado", "Step complete")
                    : t("Marcar paso completado", "Mark step complete")}
                </Button>
                <Button
                  disabled={done.length !== sequence.steps.length}
                  onClick={finish}
                >
                  {t("Finalizar sesión", "Finish session")}
                </Button>
                <span className="small muted">
                  {done.length}/{sequence.steps.length}{" "}
                  {t("pasos completados", "steps complete")}
                </span>
              </>
            )}
          </div>
        </div>
      )}
      <div className="sequence-outline">
        {sequence.steps.map((s, i) => (
          <button
            key={s.key}
            aria-current={i === position ? "step" : undefined}
            onClick={() => {
              setPosition(i);
            }}
          >
            <span>{done.includes(i) ? "✓" : i + 1}</span>
            {itemsById.get(s.contentId)?.name[lang] || s.contentId}
            <small>{Math.ceil(s.duration / 60)} min</small>
          </button>
        ))}
      </div>
    </>
  );
}
