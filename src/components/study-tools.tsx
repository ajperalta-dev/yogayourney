"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import {
  ArrowRight,
  Check,
  RotateCcw,
  Download,
  Upload,
  BookOpen,
  Heart,
  GraduationCap,
  ChartNoAxesColumn,
} from "lucide-react";
import { useLocal } from "./providers";
import { Button } from "./ui/button";
import { SectionHeader, ProgressBar, EmptyState, ContentCard } from "./common";
import { flashcards, quizQuestions } from "@/content/study";
import { parseState } from "@/lib/storage";
import type { SearchEntry } from "@/content/catalog";
import type { PersonalState } from "@/lib/models";
export function StudyHome() {
  const { t } = useLocal();
  const tools = [
    {
      id: "flashcards",
      es: "Flashcards",
      en: "Flashcards",
      descEs: "Una pregunta. Una nueva conexión.",
      descEn: "One question. One new connection.",
      icon: BookOpen,
    },
    {
      id: "quiz",
      es: "Pon a prueba lo aprendido",
      en: "Test what you have learned",
      descEs: "Pequeños repasos para consolidar.",
      descEn: "Short reviews to make learning stick.",
      icon: GraduationCap,
    },
    {
      id: "favorites",
      es: "Tus favoritos",
      en: "Your favorites",
      descEs: "Un lugar para lo que te inspira.",
      descEn: "A place for what inspires you.",
      icon: Heart,
    },
    {
      id: "progress",
      es: "Tu progreso",
      en: "Your progress",
      descEs: "Observa cómo crece tu práctica.",
      descEn: "See how your practice grows.",
      icon: ChartNoAxesColumn,
    },
  ];
  return (
    <>
      <SectionHeader
        eyebrow="STUDY"
        title={t("Aprender también es volver", "Learning is also returning")}
        description={t(
          "Repasa a tu ritmo, con curiosidad.",
          "Review at your own pace, with curiosity.",
        )}
      />
      <div className="tool-grid">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            className="tool-card panel"
            href={`/study/${tool.id}/`}
          >
            <tool.icon />
            <h2>{t(tool.es, tool.en)}</h2>
            <p className="muted">{t(tool.descEs, tool.descEn)}</p>
            <ArrowRight size={18} />
          </Link>
        ))}
      </div>
    </>
  );
}
export function Flashcards() {
  const { state, t, update } = useLocal();
  const [category, setCategory] = useState("all");
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [complete, setComplete] = useState(false);
  const cards = flashcards.filter(
    (c) => category === "all" || c.category === category,
  );
  const card = cards[position];
  function review(known: boolean) {
    update((s) => ({
      ...s,
      cards: {
        ...s.cards,
        [card.id]: { reviewedAt: new Date().toISOString(), known },
      },
    }));
    setFlipped(false);
    if (position === cards.length - 1) setComplete(true);
    else setPosition((p) => p + 1);
  }
  return (
    <>
      <SectionHeader
        eyebrow="STUDY / FLASHCARDS"
        title={t("Una idea cada vez", "One idea at a time")}
      />
      <div className="filter-tabs">
        {["all", ...new Set(flashcards.map((c) => c.category))].map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setPosition(0);
              setFlipped(false);
              setComplete(false);
            }}
          >
            {c === "all" ? t("Todas", "All") : c}
          </button>
        ))}
      </div>
      {complete ? (
        <div className="completion panel">
          <Check size={40} />
          <h2>{t("Repaso completado", "Review complete")}</h2>
          <p>
            {t(
              "Tus respuestas se han guardado.",
              "Your responses have been saved.",
            )}
          </p>
          <Button
            onClick={() => {
              setPosition(0);
              setComplete(false);
            }}
          >
            <RotateCcw size={16} />
            {t("Volver a repasar", "Review again")}
          </Button>
        </div>
      ) : (
        <div className="flashcard-workspace">
          <div className="row between small">
            <span>{card.category}</span>
            <span>
              {position + 1} / {cards.length}
            </span>
          </div>
          <ProgressBar
            value={(position / cards.length) * 100}
            label={t("Progreso de tarjetas", "Card progress")}
          />
          <button
            className={`flashcard ${flipped ? "flipped" : ""}`}
            aria-label={t("Girar tarjeta", "Flip card")}
            onClick={() => setFlipped(!flipped)}
          >
            <span className="eyebrow">
              {flipped ? t("RESPUESTA", "ANSWER") : t("PREGUNTA", "QUESTION")}
            </span>
            <h2>{(flipped ? card.back : card.front)[state.language]}</h2>
            <span className="small muted">
              {t("Toca para girar", "Tap to flip")} ↻
            </span>
          </button>
          <div className="row center wrap">
            <Button
              variant="outline"
              disabled={!flipped}
              onClick={() => review(false)}
            >
              {t("Repasar de nuevo", "Review again")}
            </Button>
            <Button disabled={!flipped} onClick={() => review(true)}>
              <Check size={16} />
              {t("Lo recuerdo", "I remembered")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
export function Quiz() {
  const { state, t, update } = useLocal();
  const [category, setCategory] = useState("all");
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const saving = useRef(false);
  const questions = quizQuestions.filter(
    (q) => category === "all" || q.category === category,
  );
  const question = questions[answers.length];
  function next() {
    if (selected === null || saving.current) return;
    const values = [...answers, selected];
    if (values.length === questions.length) {
      saving.current = true;
      const score = values.reduce(
        (sum, a, i) => sum + (a === questions[i].correct ? 1 : 0),
        0,
      );
      setResult(score);
      update((s) => ({
        ...s,
        quizzes: [
          ...s.quizzes,
          {
            id: crypto.randomUUID(),
            score,
            total: questions.length,
            date: new Date().toISOString(),
            category,
          },
        ],
      }));
    } else {
      setAnswers(values);
      setSelected(null);
    }
  }
  function reset(c = category) {
    setCategory(c);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    saving.current = false;
  }
  return (
    <>
      <SectionHeader
        eyebrow="STUDY / QUIZ"
        title={t("Haz espacio para recordar", "Make room to remember")}
        description={t(
          "Sin prisa. Cada respuesta es una oportunidad para aprender.",
          "No rush. Every answer is a chance to learn.",
        )}
      />
      <div className="filter-tabs">
        {["all", ...new Set(quizQuestions.map((q) => q.category))].map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => reset(c)}
          >
            {c === "all" ? t("Todas", "All") : c}
          </button>
        ))}
      </div>
      {result !== null ? (
        <div className="completion panel">
          <GraduationCap size={40} />
          <h2>
            {result} / {questions.length}
          </h2>
          <p>
            {t(
              "Resultado guardado en tu progreso.",
              "Result saved to your progress.",
            )}
          </p>
          <Button onClick={() => reset()}>
            {t("Volver a intentar", "Try again")}
          </Button>
        </div>
      ) : (
        <div className="quiz panel">
          <span className="eyebrow">
            {question.category} · {answers.length + 1}/{questions.length}
          </span>
          <h2>{question.question[state.language]}</h2>
          <div className="quiz-options">
            {question.options.map((option, i) => (
              <button
                key={i}
                disabled={selected !== null}
                aria-pressed={selected === i}
                className={
                  selected !== null
                    ? i === question.correct
                      ? "correct"
                      : i === selected
                        ? "incorrect"
                        : ""
                    : ""
                }
                onClick={() => setSelected(i)}
              >
                <span>{String.fromCharCode(65 + i)}</span>
                {option[state.language]}
                {selected !== null && i === question.correct && (
                  <Check size={18} />
                )}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div role="status" className="quiz-explanation">
              <strong>
                {selected === question.correct
                  ? t("Correcto.", "Correct.")
                  : t("Sigue aprendiendo.", "Keep learning.")}
              </strong>
              <p>{question.explanation[state.language]}</p>
            </div>
          )}
          <Button disabled={selected === null} onClick={next}>
            {answers.length === questions.length - 1
              ? t("Ver resultado", "View result")
              : t("Siguiente pregunta", "Next question")}
            <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </>
  );
}
export function Favorites({ index }: { index: SearchEntry[] }) {
  const { state, t } = useLocal();
  const items = state.favorites
    .map((id) => index.find((i) => i.id === id))
    .filter((x) => !!x);
  return (
    <>
      <SectionHeader
        eyebrow="STUDY / FAVORITES"
        title={t("Tu biblioteca personal", "Your personal library")}
        description={t(
          "Las ideas y prácticas a las que quieres volver.",
          "Ideas and practices you want to return to.",
        )}
      />
      {items.length ? (
        <div className="card-grid">
          {items.map((i) => (
            <ContentCard key={i.id} item={i} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t(
            "Guarda tu primera inspiración",
            "Save your first inspiration",
          )}
          description={t(
            "El corazón de cada ficha la guarda aquí.",
            "The heart on each entry saves it here.",
          )}
        >
          <Button asChild>
            <Link href="/learn/">
              {t("Explorar biblioteca", "Explore library")}
            </Link>
          </Button>
        </EmptyState>
      )}
    </>
  );
}
export function Progress({ total }: { total: number }) {
  const { state, update, t } = useLocal();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState<PersonalState | null>(null);
  const upload = useRef<HTMLInputElement>(null);
  const visited = Object.keys(state.visited).length;
  const percent = Math.min(100, Math.round((visited / total) * 100));
  function backup() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `yoga-journey-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <SectionHeader
        eyebrow="STUDY / PROGRESS"
        title={t("Cada paso cuenta", "Every step counts")}
        description={t(
          "Este resumen refleja tu actividad local, no una certificación de 200 horas.",
          "This summary reflects local activity, not a 200-hour certification.",
        )}
      />
      <div className="progress-overview panel">
        <div>
          <span className="eyebrow">
            {t("CONTENIDO EXPLORADO", "CONTENT EXPLORED")}
          </span>
          <h2>{percent}%</h2>
          <p>
            {visited} / {total} {t("fichas visitadas", "entries visited")}
          </p>
        </div>
        <ProgressBar value={percent} label="YTT" />
      </div>
      <div className="metrics-grid">
        {[
          [
            state.sessions.length,
            t("Sesiones completadas", "Completed sessions"),
          ],
          [state.quizzes.length, t("Quizzes terminados", "Completed quizzes")],
          [
            Object.keys(state.cards).length,
            t("Tarjetas repasadas", "Cards reviewed"),
          ],
          [state.favorites.length, t("Favoritos", "Favorites")],
        ].map(([value, label]) => (
          <div className="panel metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="two-columns">
        <div className="panel">
          <h3>{t("Últimos quizzes", "Recent quizzes")}</h3>
          {state.quizzes.length ? (
            state.quizzes
              .slice(-8)
              .reverse()
              .map((q) => (
                <div key={q.id} className="history-row">
                  <span>
                    {q.category === "all"
                      ? t("Todas las categorías", "All categories")
                      : q.category}
                    <small>
                      {new Date(q.date).toLocaleDateString(state.language)}
                    </small>
                  </span>
                  <strong>
                    {q.score}/{q.total}
                  </strong>
                </div>
              ))
          ) : (
            <p className="muted">
              {t("Tu primer repaso te espera.", "Your first review awaits.")}
            </p>
          )}
        </div>
        <div className="panel">
          <h3>{t("Últimas sesiones", "Recent sessions")}</h3>
          {state.sessions.length ? (
            state.sessions
              .slice(-8)
              .reverse()
              .map((s) => (
                <div key={s.id} className="history-row">
                  <span>
                    {s.sequenceId.replaceAll("-", " ")}
                    <small>
                      {new Date(s.completedAt).toLocaleDateString(
                        state.language,
                      )}
                    </small>
                  </span>
                  <span>{Math.ceil(s.seconds / 60)} min*</span>
                </div>
              ))
          ) : (
            <p className="muted">
              {t("Una práctica a la vez.", "One practice at a time.")}
            </p>
          )}
          <small className="muted">
            {t(
              "* Duración planificada; no horas acreditadas.",
              "* Planned duration; not accredited hours.",
            )}
          </small>
        </div>
      </div>
      <div className="panel backup-panel">
        <h2>{t("Tus datos te pertenecen", "Your data belongs to you")}</h2>
        <p className="muted">
          {t(
            "Favoritos, notas y clases se guardan solo en este navegador. Exporta una copia para conservarlos o llevarlos a otro dispositivo.",
            "Favorites, notes and classes are saved only in this browser. Export a backup to preserve them or move to another device.",
          )}
        </p>
        <div className="row wrap">
          <Button variant="outline" onClick={backup}>
            <Download size={16} />
            {t("Exportar copia", "Export backup")}
          </Button>
          <Button variant="outline" onClick={() => upload.current?.click()}>
            <Upload size={16} />
            {t("Importar copia", "Import backup")}
          </Button>
          <input
            ref={upload}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            aria-label={t("Archivo de copia de seguridad", "Backup file")}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                if (file.size > 5_000_000) throw new Error();
                setPending(parseState(await file.text()));
                setMessage("");
              } catch {
                setMessage(
                  t(
                    "Copia no válida. No se ha modificado ningún dato.",
                    "Invalid backup. No data has been changed.",
                  ),
                );
              }
              e.target.value = "";
            }}
          />
        </div>
        {pending && (
          <div className="import-confirm" role="alert">
            <p>
              {t(
                "Esta copia reemplazará los datos de este navegador.",
                "This backup will replace this browser’s data.",
              )}{" "}
              {pending.favorites.length} {t("favoritos", "favorites")},{" "}
              {pending.sequences.length} {t("clases", "classes")}.
            </p>
            <Button variant="outline" onClick={() => setPending(null)}>
              {t("Cancelar", "Cancel")}
            </Button>{" "}
            <Button
              onClick={() => {
                update(() => pending);
                setPending(null);
                setMessage(t("Copia restaurada.", "Backup restored."));
              }}
            >
              {t("Restaurar copia", "Restore backup")}
            </Button>
          </div>
        )}
        {message && <p role="status">{message}</p>}
      </div>
    </>
  );
}
