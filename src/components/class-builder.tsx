"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Plus,
  Save,
  Trash2,
  Layers3,
  Play,
  Pencil,
} from "lucide-react";
import type {
  ClassStage,
  ContentItem,
  Sequence,
  SequenceStep,
} from "@/lib/models";
import { l, normalize } from "@/lib/utils";
import { useLocal } from "./providers";
import { Button } from "./ui/button";
import {
  SectionHeader,
  EmptyState,
  Duration,
  SafetyAlert,
  NotesEditor,
} from "./common";
import { SequencePlayer } from "./sequence-player";
const stages: { id: ClassStage; es: string; en: string }[] = [
  { id: "centering", es: "Centrado", en: "Centering" },
  { id: "pranayama", es: "Pranayama", en: "Pranayama" },
  { id: "warm-up", es: "Calentamiento", en: "Warm-up" },
  { id: "asanas", es: "Asanas", en: "Asanas" },
  { id: "peak-pose", es: "Postura principal", en: "Peak pose" },
  { id: "cool-down", es: "Vuelta a la calma", en: "Cool down" },
  { id: "savasana", es: "Savasana", en: "Savasana" },
  { id: "meditation", es: "Meditación", en: "Meditation" },
];
export function ClassBuilder({ catalog }: { catalog: ContentItem[] }) {
  const { state, ready, t } = useLocal();
  const params = useSearchParams();
  const editId = params.get("edit");
  if (!ready)
    return <p>{t("Cargando datos locales…", "Loading local data…")}</p>;
  return (
    <ClassBuilderForm
      key={editId || "new"}
      catalog={catalog}
      initial={state.sequences.find((s) => s.id === editId)}
    />
  );
}
function ClassBuilderForm({
  catalog,
  initial,
}: {
  catalog: ContentItem[];
  initial?: Sequence;
}) {
  const { state, update, ready, t } = useLocal();
  const params = useSearchParams();
  const editId = params.get("edit");
  const existing = state.sequences.find((s) => s.id === editId);
  const [name, setName] = useState(initial?.name[state.language] || "");
  const [style, setStyle] = useState<Sequence["style"]>(
    initial?.style || "hatha",
  );
  const [steps, setSteps] = useState<SequenceStep[]>(initial?.steps || []);
  const [stage, setStage] = useState<ClassStage>("asanas");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [savedId, setSavedId] = useState<string | null>(initial?.id || null);
  const available = catalog.filter(
    (item) =>
      [
        "asana",
        "pranayama",
        "meditation",
        ...(style === "yin" ? ["yin"] : style === "aerial" ? ["aerial"] : []),
      ].includes(item.kind) &&
      normalize(
        `${item.name.es} ${item.name.en} ${item.sanskrit || ""}`,
      ).includes(normalize(query)),
  );
  function move(i: number, direction: number) {
    setSteps((previous) => {
      const result = [...previous];
      [result[i], result[i + direction]] = [result[i + direction], result[i]];
      return result;
    });
    setStatus("");
  }
  function save() {
    if (!name.trim() || !steps.length) return;
    const id = savedId || `custom-${crypto.randomUUID()}`;
    const sequence: Sequence = {
      id,
      name: l(name.trim(), name.trim()),
      description: l("Tu secuencia personal.", "Your personal sequence."),
      style,
      level: "beginner",
      duration: total,
      objective: l(
        "Explorar una clase de yoga a tu ritmo.",
        "Explore a yoga class at your own pace.",
      ),
      image: "/images/study.webp",
      steps,
      demo: false,
    };
    update((s) => ({
      ...s,
      sequences: [...s.sequences.filter((seq) => seq.id !== id), sequence],
    }));
    setSavedId(id);
    setStatus(
      t("Clase guardada en este dispositivo.", "Class saved on this device."),
    );
  }
  const total = steps.reduce((sum, s) => sum + s.duration, 0);
  return (
    <>
      <SectionHeader
        eyebrow="TEACH / CLASS BUILDER"
        title={t("Una clase con intención", "A class with intention")}
        description={t(
          "Combina, ordena y encuentra el ritmo de tu próxima clase.",
          "Combine, arrange and find the rhythm of your next class.",
        )}
        action={
          <Button
            onClick={save}
            disabled={!ready || !name.trim() || !steps.length}
          >
            <Save size={16} />
            {t("Guardar clase", "Save class")}
          </Button>
        }
      />
      <div className="builder-meta panel">
        <label>
          {t("Nombre de la clase", "Class name")}
          <input
            value={name}
            maxLength={100}
            onChange={(e) => {
              setName(e.target.value);
              setStatus("");
            }}
            placeholder={t(
              "Ej. Un regreso a la calma",
              "e.g. A return to calm",
            )}
          />
        </label>
        <label>
          {t("Estilo", "Style")}
          <select
            value={style}
            onChange={(e) => {
              setStyle(e.target.value as Sequence["style"]);
              setStatus("");
            }}
          >
            <option value="hatha">Hatha</option>
            <option value="yin">Yin</option>
            <option value="aerial">Aerial</option>
          </select>
        </label>
        <div className="builder-total">
          <Duration seconds={total} />
          <span>
            {steps.length} {t("pasos", "steps")} ·{" "}
            {
              steps.filter((s) =>
                ["asana", "yin", "aerial"].includes(
                  catalog.find((c) => c.id === s.contentId)?.kind || "",
                ),
              ).length
            }{" "}
            {t("posturas", "poses")}
          </span>
        </div>
      </div>
      {status && (
        <div role="status" className="saved-message">
          {status}{" "}
          <Link href="/teach/sequences/">
            {t("Ver mis secuencias", "View my sequences")} →
          </Link>
        </div>
      )}
      {editId && ready && !existing && (
        <SafetyAlert>
          {t(
            "No se encontró la clase original. Puedes guardar una nueva.",
            "Original class not found. You can save a new one.",
          )}
        </SafetyAlert>
      )}
      {steps.some(
        (s) => catalog.find((i) => i.id === s.contentId)?.studyOnly,
      ) && (
        <SafetyAlert>
          {t(
            "Incluye contenido aéreo supervisado: se guardará para estudio y preparación docente.",
            "Includes supervised aerial content: it will be saved for study and teaching preparation.",
          )}
        </SafetyAlert>
      )}
      <div className="builder-layout">
        <section className="panel builder-catalog">
          <div className="row between">
            <h2>{t("Tu biblioteca", "Your library")}</h2>
            <Plus size={18} />
          </div>
          <label>
            {t("Añadir al bloque", "Add to stage")}
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as ClassStage)}
            >
              {stages.map((s) => (
                <option key={s.id} value={s.id}>
                  {t(s.es, s.en)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("Buscar contenido", "Find content")}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(
                "Nombre de postura o práctica",
                "Pose or practice name",
              )}
            />
          </label>
          <div className="builder-items">
            {available.map((item) => (
              <button
                className="builder-item"
                key={item.id}
                onClick={() => {
                  setSteps((s) => [
                    ...s,
                    {
                      key: crypto.randomUUID(),
                      contentId: item.id,
                      duration: item.duration,
                      stage,
                    },
                  ]);
                  setStatus("");
                }}
              >
                <div>
                  <strong>{item.name[state.language]}</strong>
                  <small>
                    {item.kind} · {Math.ceil(item.duration / 60)} min
                  </small>
                </div>
                <Plus size={17} />
              </button>
            ))}
            {!available.length && (
              <p className="muted">{t("Sin coincidencias", "No matches")}</p>
            )}
          </div>
        </section>
        <section className="class-outline">
          <h2>{t("La estructura de tu clase", "Your class structure")}</h2>
          {steps.length ? (
            steps.map((s, i) => {
              const item = catalog.find((c) => c.id === s.contentId);
              return (
                <div className="class-step panel" key={s.key}>
                  <span className="step-number">{i + 1}</span>
                  <div className="step-main">
                    <h3>{item?.name[state.language] || s.contentId}</h3>
                    <div className="step-options">
                      <label>
                        <span className="sr-only">{t("Bloque", "Stage")}</span>
                        <select
                          value={s.stage}
                          onChange={(e) => {
                            setSteps((p) =>
                              p.map((x) =>
                                x.key === s.key
                                  ? {
                                      ...x,
                                      stage: e.target.value as ClassStage,
                                    }
                                  : x,
                              ),
                            );
                            setStatus("");
                          }}
                        >
                          {stages.map((stage) => (
                            <option key={stage.id} value={stage.id}>
                              {t(stage.es, stage.en)}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        {t("Segundos", "Seconds")}
                        <input
                          type="number"
                          min="5"
                          max="3600"
                          step="5"
                          value={s.duration}
                          onChange={(e) => {
                            const duration = Math.max(
                              5,
                              Math.min(
                                3600,
                                Math.round(Number(e.target.value) || 5),
                              ),
                            );
                            setSteps((p) =>
                              p.map((x) =>
                                x.key === s.key ? { ...x, duration } : x,
                              ),
                            );
                            setStatus("");
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="step-actions">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={i === 0}
                      aria-label={t("Mover arriba", "Move up")}
                      onClick={() => move(i, -1)}
                    >
                      <ArrowUp size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={i === steps.length - 1}
                      aria-label={t("Mover abajo", "Move down")}
                      onClick={() => move(i, 1)}
                    >
                      <ArrowDown size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={t("Quitar paso", "Remove step")}
                      onClick={() => {
                        setSteps((p) => p.filter((x) => x.key !== s.key));
                        setStatus("");
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              title={t(
                "Todo comienza con una intención",
                "Every class begins with an intention",
              )}
              description={t(
                "Añade contenido desde la biblioteca para dar forma a tu clase.",
                "Add content from the library to shape your class.",
              )}
            />
          )}
        </section>
      </div>
    </>
  );
}
export function SavedSequences() {
  const { state, update, t } = useLocal();
  const [deleting, setDeleting] = useState<string | null>(null);
  return (
    <>
      <SectionHeader
        eyebrow="TEACH / SAVED SEQUENCES"
        title={t("Tus clases, a mano", "Your classes, at hand")}
        action={
          <Button asChild>
            <Link href="/teach/builder/">
              <Plus size={16} />
              {t("Crear clase", "Create class")}
            </Link>
          </Button>
        }
      />
      {!state.sequences.length ? (
        <EmptyState
          title={t(
            "Tu primera clase empieza aquí",
            "Your first class starts here",
          )}
          description={t(
            "Las secuencias que guardes aparecerán en este dispositivo.",
            "Saved sequences will appear on this device.",
          )}
        />
      ) : (
        <div className="sequence-grid">
          {state.sequences.map((s) => (
            <article className="sequence-card" key={s.id}>
              <span className="eyebrow">{s.style}</span>
              <h3>{s.name[state.language]}</h3>
              <Duration
                seconds={s.steps.reduce((sum, p) => sum + p.duration, 0)}
              />
              <div className="row wrap">
                <Button asChild>
                  <Link
                    href={`/practice/custom/?id=${encodeURIComponent(s.id)}`}
                  >
                    <Play size={14} />
                    {t("Abrir", "Open")}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    href={`/teach/builder/?edit=${encodeURIComponent(s.id)}`}
                  >
                    <Pencil size={14} />
                    {t("Editar", "Edit")}
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("Eliminar clase", "Delete class")}
                  onClick={() => setDeleting(s.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              {deleting === s.id && (
                <div role="alert" className="delete-confirm">
                  <p>
                    {t(
                      "¿Eliminar esta clase guardada?",
                      "Delete this saved class?",
                    )}
                  </p>
                  <Button variant="outline" onClick={() => setDeleting(null)}>
                    {t("Cancelar", "Cancel")}
                  </Button>
                  <Button
                    onClick={() => {
                      update((p) => ({
                        ...p,
                        sequences: p.sequences.filter((x) => x.id !== s.id),
                      }));
                      setDeleting(null);
                    }}
                  >
                    {t("Eliminar", "Delete")}
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
export function CustomPractice({ catalog }: { catalog: ContentItem[] }) {
  const { state, ready, t } = useLocal();
  const params = useSearchParams();
  const sequence = state.sequences.find((s) => s.id === params.get("id"));
  if (!ready)
    return <p>{t("Cargando datos locales…", "Loading local data…")}</p>;
  if (!sequence)
    return (
      <EmptyState
        title={t(
          "No se encontró esta clase en el dispositivo",
          "This class was not found on this device",
        )}
      >
        <Link href="/teach/sequences/">
          {t("Ver mis clases", "View my classes")}
        </Link>
      </EmptyState>
    );
  return (
    <SequencePlayer
      key={sequence.id}
      sequence={sequence}
      items={catalog.filter((i) =>
        sequence.steps.some((s) => s.contentId === i.id),
      )}
    />
  );
}
export function TeachHome() {
  const { t } = useLocal();
  return (
    <>
      <SectionHeader
        eyebrow="TEACH"
        title={t("Comparte desde tu práctica", "Share from your practice")}
        description={t(
          "Un espacio para preparar clases con intención.",
          "A space to prepare classes with intention.",
        )}
      />
      <div className="tool-grid">
        {[
          [
            "builder",
            "Diseñar una clase",
            "Build a class",
            "Combina posturas y prácticas.",
            "Combine poses and practices.",
          ],
          [
            "sequences",
            "Secuencias guardadas",
            "Saved sequences",
            "Tus clases, listas para repasar.",
            "Your classes, ready to revisit.",
          ],
          [
            "notes",
            "Notas docentes",
            "Teaching notes",
            "Observaciones que enriquecen tu enseñanza.",
            "Observations that enrich your teaching.",
          ],
        ].map(([id, es, en, descEs, descEn]) => (
          <Link className="tool-card panel" href={`/teach/${id}/`} key={id}>
            <Layers3 />
            <h2>{t(es, en)}</h2>
            <p className="muted">{t(descEs, descEn)}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
export function TeachingNotes({
  index,
}: {
  index: { id: string; href: string; name: { es: string; en: string } }[];
}) {
  const { state, t } = useLocal();
  return (
    <>
      <SectionHeader
        eyebrow="TEACH / NOTES"
        title={t("Lo que descubres al enseñar", "What teaching reveals")}
      />
      <NotesEditor id="teaching-journal" />
      <h2 className="spaced-heading">
        {t("Notas de tu biblioteca", "Notes from your library")}
      </h2>
      {Object.values(state.notes)
        .filter((n) => n.text && n.contentId !== "teaching-journal")
        .map((n) => (
          <div className="panel note-summary" key={n.contentId}>
            <Link
              className="text-link"
              href={index.find((i) => i.id === n.contentId)?.href || "/learn/"}
            >
              {index.find((i) => i.id === n.contentId)?.name[state.language] ||
                n.contentId}
            </Link>
            <NotesEditor id={n.contentId} />
          </div>
        ))}
    </>
  );
}
