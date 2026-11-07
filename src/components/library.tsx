"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, ArrowRight, Play, BookOpen } from "lucide-react";
import type { SearchEntry } from "@/content/catalog";
import { illustrationAlt } from "@/content/illustration-alt";
import type { Sequence, SectionId } from "@/lib/models";
import {
  sections,
  hathaCategories,
  aerialCategories,
} from "@/content/sections";
import { normalize } from "@/lib/utils";
import { meditationPlans } from "@/content/meditation/plans";
import { useLocal } from "./providers";
import {
  ContentCard,
  SectionHeader,
  SectionIcon,
  EmptyState,
  Duration,
  FavoriteButton,
  SafetyAlert,
} from "./common";
import { Button } from "./ui/button";
export function Library({
  section,
  items,
  sequences = [],
}: {
  section: string;
  items: SearchEntry[];
  sequences?: Sequence[];
}) {
  const { state, t } = useLocal();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const config = sections.find((s) => s.id === section);
  const categories =
    section === "hatha"
      ? hathaCategories
      : section === "aerial"
        ? aerialCategories
        : [...new Set(items.map((i) => i.category))];
  const results = items.filter(
    (i) =>
      (category === "all" ||
        i.category === category ||
        i.categories?.includes(category)) &&
      (level === "all" || i.level === level) &&
      normalize(i.searchText).includes(normalize(query)),
  );
  return (
    <>
      <SectionHeader
        eyebrow="LEARN / EXPLORE"
        title={
          config?.name[state.language] ||
          t("Tu biblioteca de aprendizaje", "Your learning library")
        }
        description={
          config?.description[state.language] ||
          t(
            "Once caminos que se encuentran en tu práctica.",
            "Eleven paths that meet in your practice.",
          )
        }
        action={
          <span className="badge">
            {t("Biblioteca educativa", "Study library")}
          </span>
        }
      />
      {section === "kriyas" && (
        <SafetyAlert>
          {t(
            "Son prácticas tradicionales, no un ‘detox’ médico. Aprende cualquier kriya con una persona instructora cualificada; esta biblioteca no enseña a realizarlas en solitario. No sustituyen consejo médico. Consulta antes si estás embarazada o, en prácticas abdominales/intensas, durante la menstruación; también ante hipertensión, enfermedad cardíaca o respiratoria, hernia, úlcera, cirugía reciente, enfermedad digestiva u otra condición relevante. Detente ante dolor, mareo, falta de aire, sangrado, náuseas o visión incómoda.",
            "These are traditional practices, not a medical ‘detox.’ Learn every kriya with a qualified instructor; this library is not a guide for doing them alone. They do not replace medical advice. Seek individual guidance before practice if pregnant or, for abdominal/forceful techniques, during menstruation; also with hypertension, heart or respiratory disease, hernia, ulcer, recent surgery, digestive illness, or another relevant condition. Stop for pain, dizziness, shortness of breath, bleeding, nausea, or eye discomfort.",
          )}
        </SafetyAlert>
      )}
      {config?.introduction && section !== "learn" && (
        <div className="panel">
          <p className="muted">{config.introduction[state.language]}</p>
        </div>
      )}
      {section === "meditation" && <MeditationPlans />}
      {section === "learn" ? (
        <div className="section-grid large">
          {sections.map((s) => (
            <Link href={`/${s.id}/`} key={s.id} className="section-card">
              <div className={`section-icon ${s.color}`}>
                <SectionIcon name={s.icon} />
              </div>
              <div>
                <h3>{s.name[state.language]}</h3>
                <p>{s.description[state.language]}</p>
              </div>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      ) : (
        <>
          {section === "ashtanga" && (
            <div className="mantra-links">
              <Link href="/mantras/opening-mantra/">
                <BookOpen size={18} />
                {t("Mantra de apertura", "Opening mantra")}
                <ArrowRight size={16} />
              </Link>
              <Link href="/mantras/closing-mantra/">
                <BookOpen size={18} />
                {t("Mantra de cierre", "Closing mantra")}
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
          {sequences.length > 0 && (
            <>
              <h2 className="spaced-heading">
                {t(
                  "Secuencias · estudio y práctica",
                  "Sequences · study and practice",
                )}
              </h2>
              <div className="sequence-grid">
                {sequences.map((s) => (
                  <SequenceCard key={s.id} sequence={s} />
                ))}
              </div>
              <h2 className="spaced-heading">
                {t("Biblioteca de fichas", "Study library")}
              </h2>
            </>
          )}
          <div className="filter-toolbar">
            <label className="search-field">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(
                  "Buscar en esta sección…",
                  "Search this section…",
                )}
                aria-label={t("Buscar en esta sección", "Search section")}
              />
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              aria-label={t("Nivel", "Level")}
            >
              <option value="all">
                {t("Todos los niveles", "All levels")}
              </option>
              <option value="beginner">{t("Principiante", "Beginner")}</option>
              <option value="intermediate">
                {t("Intermedio", "Intermediate")}
              </option>
              <option value="advanced">{t("Avanzado", "Advanced")}</option>
            </select>
          </div>
          <div className="filter-tabs">
            <button
              aria-pressed={category === "all"}
              onClick={() => setCategory("all")}
            >
              {t("Todo", "All")}
            </button>
            {categories.map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="card-grid">
            {results.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
          {!results.length && (
            <EmptyState
              title={t("Todavía no hay fichas aquí", "No entries here yet")}
              description={t(
                "Prueba otro filtro. El catálogo es una muestra inicial.",
                "Try another filter. The catalog is an initial sample.",
              )}
            />
          )}
        </>
      )}
    </>
  );
}
function MeditationPlans() {
  const { t, state } = useLocal();
  return (
    <section aria-labelledby="meditation-plans-heading">
      <h2 id="meditation-plans-heading" className="spaced-heading">
        {t("Planes progresivos", "Progressive plans")}
      </h2>
      <div className="meditation-plans">
        {meditationPlans.map((plan) => (
          <details className="panel meditation-plan" key={plan.id}>
            <summary>
              <span>
                <strong>{plan.name[state.language]}</strong>
                <span className="small muted">
                  {plan.description[state.language]}
                </span>
              </span>
              <span className="badge">
                {plan.days.length} {t("días", "days")}
              </span>
            </summary>
            <ol className="meditation-plan-days">
              {plan.days.map((day) => (
                <li key={day.day}>
                  <div className="row between">
                    <strong>
                      {t("Día", "Day")} {day.day} · {day.focus[state.language]}
                    </strong>
                    <span className="small muted">
                      {day.minutes} {t("min", "min")}
                    </span>
                  </div>
                  <p className="small muted">{day.reflection[state.language]}</p>
                  <Link
                    className="text-link"
                    href={`/meditation/${day.practiceId}/`}
                  >
                    {t("Abrir práctica", "Open practice")}
                    <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
            </ol>
          </details>
        ))}
      </div>
    </section>
  );
}
export function SequenceCard({ sequence: s }: { sequence: Sequence }) {
  const { state, t } = useLocal();
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className="sequence-card">
      <div className="sequence-card-image">
        {imageFailed ? (
          <div
            className="sequence-card-image-fallback"
            role="img"
            aria-label={t("Portada no disponible", "Cover unavailable")}
          >
            <BookOpen size={30} />
          </div>
        ) : (
          <Image
            src={s.image || "/images/study.svg"}
            alt={illustrationAlt(s.image || "/images/study.svg")?.[state.language] ?? t(
              `Portada ilustrativa de ${s.name.es}`,
              `Illustrative cover for ${s.name.en}`,
            )}
            fill
            loading="lazy"
            sizes="(max-width: 800px) 90vw, (max-width: 1100px) 40vw, 30vw"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <div className="row between">
        <span className="eyebrow">{s.style.toUpperCase()}</span>
        <FavoriteButton id={s.id} />
      </div>
      <h3>{s.name[state.language]}</h3>
      <p className="small muted">{s.description[state.language]}</p>
      <p className="small sequence-card-objective">
        <strong>{t("Objetivo:", "Goal:")}</strong> {s.objective[state.language]}
      </p>
      <div className="row between sequence-card-meta">
        <Duration seconds={s.duration} />
        <span className="small muted">
          {s.level === "beginner"
            ? t("Principiante", "Beginner")
            : s.level === "intermediate"
              ? t("Intermedio", "Intermediate")
              : t("Avanzado", "Advanced")}
        </span>
        <span className="small muted">
          {s.steps.length} {t("pasos", "steps")}
        </span>
      </div>
      <Button variant="outline" asChild>
        <Link href={`/practice/${s.id}/`}>
          <Play size={15} />
          {t("Abrir secuencia", "Open sequence")}
        </Link>
      </Button>
    </article>
  );
}
export function PracticeLibrary({ sequences }: { sequences: Sequence[] }) {
  const { t } = useLocal();
  return (
    <>
      <SectionHeader
        eyebrow="PRACTICE"
        title={t("Haz espacio para practicar", "Make space for practice")}
        description={t(
          "Elige una secuencia y encuentra un ritmo cómodo.",
          "Choose a sequence and find a comfortable rhythm.",
        )}
      />
      <div className="sequence-grid">
        {sequences.map((s) => (
          <SequenceCard key={s.id} sequence={s} />
        ))}
      </div>
      <div className="quick-grid spaced-heading">
        <Link className="quick-card sage" href="/pranayama/sama-vritti/">
          {t("Seguir la respiración", "Follow the breath")}
          <ArrowRight />
        </Link>
        <Link
          className="quick-card lavender"
          href="/meditation/breath-awareness/"
        >
          {t("Temporizador de meditación", "Meditation timer")}
          <ArrowRight />
        </Link>
      </div>
    </>
  );
}
export function SearchPage({
  index,
  initialQuery,
}: {
  index: SearchEntry[];
  initialQuery: string;
}) {
  const { state, t } = useLocal();
  const [query, setQuery] = useState(initialQuery);
  const [section, setSection] = useState("all");
  const results = index.filter(
    (i) =>
      (section === "all" || i.section === section) &&
      normalize(i.searchText).includes(normalize(query)),
  );
  return (
    <>
      <SectionHeader
        eyebrow="DISCOVER"
        title={t("Encuentra una conexión", "Find a connection")}
        description={t(
          "Busca en español, inglés o sánscrito, por nombre, músculo, beneficio o tema.",
          "Search Spanish, English or Sanskrit by name, muscle, benefit or topic.",
        )}
      />
      <div className="filter-toolbar">
        <label className="search-field">
          <Search size={19} />
          <input
            aria-label={t("Búsqueda global", "Global search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="hip · cadera · Tāḍāsana"
          />
        </label>
        <select
          aria-label={t("Sección", "Section")}
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="all">
            {t("Todas las secciones", "All sections")}
          </option>
          {sections.map((s) => (
            <option key={s.id} value={s.id as SectionId}>
              {s.name[state.language]}
            </option>
          ))}
        </select>
      </div>
      <p className="small muted" aria-live="polite">
        {results.length} {t("resultados", "results")}
      </p>
      <div className="card-grid">
        {results.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
      {!results.length && (
        <EmptyState
          title={t("No encontramos coincidencias", "No matches found")}
          description={t(
            "Prueba un nombre o un tema más general.",
            "Try a name or a broader topic.",
          )}
        />
      )}
    </>
  );
}
