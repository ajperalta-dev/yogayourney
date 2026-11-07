/* eslint-disable react-hooks/set-state-in-effect -- Hydrate the local weekday after static HTML has hydrated. */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { byId } from "@/content/catalog";
import { schedule } from "@/content/schedule";
import {
  routineSuggestions,
  weeklyPracticePlans,
  type PlannerDay,
  type PracticeWindow,
  type RoutineSuggestion,
  type TimeOfDay,
} from "@/content/schedule/plans";
import { sequences } from "@/content/sequences";
import { useLocal } from "./providers";
import { Duration, EmptyState, SectionHeader } from "./common";

const sequenceById = new Map(sequences.map((sequence) => [sequence.id, sequence]));

function timedPracticeSeconds(
  activities: Pick<PlannerDay, "sequenceIds" | "pranayamaIds" | "meditationIds">,
) {
  const sequenceSeconds = activities.sequenceIds.reduce(
    (total, id) => total + (sequenceById.get(id)?.duration ?? 0),
    0,
  );
  const contentSeconds = [
    ...activities.pranayamaIds,
    ...activities.meditationIds,
  ].reduce((total, id) => total + (byId[id]?.duration ?? 0), 0);
  return sequenceSeconds + contentSeconds;
}

function PracticeLinks({
  sequenceIds,
  pranayamaIds,
  meditationIds,
}: Pick<PlannerDay, "sequenceIds" | "pranayamaIds" | "meditationIds">) {
  const { state, t } = useLocal();
  const links = [
    ...sequenceIds.flatMap((id) => {
      const sequence = sequenceById.get(id);
      return sequence
        ? [{
            id: `sequence-${id}`,
            kind: t("Secuencia", "Sequence"),
            href: `/practice/${id}/`,
            name: sequence.name[state.language],
            seconds: sequence.duration,
          }]
        : [];
    }),
    ...[...pranayamaIds, ...meditationIds].flatMap((id) => {
      const item = byId[id];
      if (!item) return [];
      return [{
        id,
        kind:
          item.kind === "pranayama"
            ? t("Respiración", "Pranayama")
            : t("Meditación", "Meditation"),
        href:
          item.kind === "pranayama"
            ? `/pranayama/${id}/`
            : `/meditation/${id}/`,
        name: item.name[state.language],
        seconds: item.duration,
      }];
    }),
  ];

  if (!links.length) return null;

  return (
    <div className="schedule-practice-links">
      {links.map((item) => (
        <Link className="schedule-practice-link" href={item.href} key={item.id}>
          <span className="schedule-practice-copy">
            <span className="eyebrow">{item.kind}</span>
            <strong>{item.name}</strong>
          </span>
          <Duration seconds={item.seconds} />
          <ArrowUpRight size={16} />
        </Link>
      ))}
    </div>
  );
}

const timeOptions: { id: TimeOfDay; es: string; en: string }[] = [
  { id: "morning", es: "Mañana", en: "Morning" },
  { id: "midday", es: "Mediodía", en: "Midday" },
  { id: "evening", es: "Noche", en: "Evening" },
];
const practiceWindows: PracticeWindow[] = [10, 20, 45, 60];

function RoutineFinder() {
  const { state, t } = useLocal();
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning");
  const [availableMinutes, setAvailableMinutes] = useState<PracticeWindow>(20);
  const routine: RoutineSuggestion | undefined = routineSuggestions.find(
    (suggestion) =>
      suggestion.timeOfDay === timeOfDay &&
      suggestion.availableMinutes === availableMinutes,
  );
  if (!routine) return null;

  const seconds = timedPracticeSeconds(routine);

  return (
    <section aria-labelledby="routine-finder-heading">
      <h2 className="spaced-heading" id="routine-finder-heading">
        {t("Adapta la práctica al tiempo disponible", "Fit practice to your available time")}
      </h2>
      <p className="muted">
        {t(
          "Elige un momento del día y una ventana de tiempo. Los enlaces usan los temporizadores de cada ficha; el margen queda disponible para prepararte, cambiar de postura o descansar.",
          "Choose a time of day and a time window. Links use each entry’s timer; the remaining time is available for setup, transitions, or rest.",
        )}
      </p>
      <div className="filter-tabs" aria-label={t("Momento del día", "Time of day")}>
        {timeOptions.map((option) => (
          <button
            key={option.id}
            aria-pressed={timeOfDay === option.id}
            onClick={() => setTimeOfDay(option.id)}
          >
            {state.language === "es" ? option.es : option.en}
          </button>
        ))}
      </div>
      <div className="filter-tabs" aria-label={t("Tiempo disponible", "Available time")}>
        {practiceWindows.map((minutes) => (
          <button
            key={minutes}
            aria-pressed={availableMinutes === minutes}
            onClick={() => setAvailableMinutes(minutes)}
          >
            {minutes} {t("min", "min")}
          </button>
        ))}
      </div>
      <article className="panel schedule-routine-card">
        <div className="row between">
          <span className="eyebrow">
            {t("Ventana", "Available window")}: {availableMinutes} {t("min", "min")}
          </span>
          <Duration seconds={seconds} />
        </div>
        <h3>{routine.name[state.language]}</h3>
        <p className="muted">{routine.description[state.language]}</p>
        <PracticeLinks
          sequenceIds={routine.sequenceIds}
          pranayamaIds={routine.pranayamaIds}
          meditationIds={routine.meditationIds}
        />
        <p className="small muted">
          {t(
            "No necesitas completar todos los enlaces ni llenar toda la ventana.",
            "You do not need to complete every link or fill the whole window.",
          )}
        </p>
      </article>
    </section>
  );
}

function WeeklyPlanner() {
  const { state, t } = useLocal();
  const [planId, setPlanId] = useState(weeklyPracticePlans[0].id);
  const plan = weeklyPracticePlans.find((candidate) => candidate.id === planId)!;
  const dayNames =
    state.language === "es"
      ? ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
      : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const restDays = plan.days.filter((day) => day.rest).length;

  return (
    <section className="schedule-planner" aria-labelledby="weekly-plans-heading">
      <h2 className="spaced-heading" id="weekly-plans-heading">
        {t("Planes semanales", "Weekly practice plans")}
      </h2>
      <p className="muted">
        {t(
          "Elige una propuesta flexible. La selección se mantiene mientras esta pantalla está abierta; no se crea una cuenta ni se guarda un plan en un servidor.",
          "Choose a flexible template. Your selection lasts while this screen is open; no account is created and no plan is saved to a server.",
        )}
      </p>
      <div className="filter-tabs" aria-label={t("Elegir plan semanal", "Choose a weekly plan")}>
        {weeklyPracticePlans.map((option) => (
          <button
            key={option.id}
            aria-pressed={plan.id === option.id}
            onClick={() => setPlanId(option.id)}
          >
            {option.name[state.language]}
          </button>
        ))}
      </div>
      <div className="panel schedule-plan-summary">
        <h3>{plan.name[state.language]}</h3>
        <p>{plan.description[state.language]}</p>
        <p className="small muted">{plan.rhythm[state.language]}</p>
        <span className="badge">
          {restDays} {t("días de recuperación", "recovery days")}
        </span>
      </div>
      <div className="card-grid planner-week-grid">
        {plan.days.map((day) => {
          const seconds = timedPracticeSeconds(day);
          return (
            <article className="panel planner-day-card" key={day.day}>
              <span className="eyebrow">
                {dayNames[day.day - 1]} · {day.rest ? t("Recuperación", "Recovery") : day.availableMinutes ? `${day.availableMinutes} ${t("min", "min")}` : ""}
              </span>
              <h3>{day.focus[state.language]}</h3>
              {day.rest ? (
                <p className="small muted">
                  {t(
                    "Día sin secuencia. Descansa por completo o abre la práctica opcional si te resulta útil.",
                    "No-sequence day. Rest fully or open the optional practice if it feels useful.",
                  )}
                </p>
              ) : (
                <div className="row between planner-duration">
                  <span className="small muted">
                    {t("Contenido con temporizador", "Timed content")}
                  </span>
                  <Duration seconds={seconds} />
                </div>
              )}
              <PracticeLinks
                sequenceIds={day.sequenceIds}
                pranayamaIds={day.pranayamaIds}
                meditationIds={day.meditationIds}
              />
            </article>
          );
        })}
      </div>
      <RoutineFinder />
    </section>
  );
}

export function ScheduleView() {
  const { state, t } = useLocal();
  const [day, setDay] = useState(1);
  useEffect(() => setDay(new Date().getDay()), []);
  const days =
    state.language === "es"
      ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const items = schedule.filter((item) => item.days.includes(day));

  return (
    <>
      <SectionHeader
        eyebrow="SCHEDULE"
        title={t("Planifica tu práctica", "Plan your practice")}
        description={t(
          "Planes semanales y rutinas flexibles para combinar movimiento, respiración, meditación y descanso.",
          "Weekly plans and flexible routines to combine movement, breathing, meditation, and rest.",
        )}
      />
      <WeeklyPlanner />
      <section aria-labelledby="sample-timetable-heading">
        <h2 className="spaced-heading" id="sample-timetable-heading">
          {t("Horario de muestra del YTT", "Sample training timetable")}
        </h2>
        <p className="muted">
          {t(
            "Agenda fija de clases de formación, mostrada en hora local y sin conversión de zona horaria.",
            "Fixed teacher-training class schedule, shown in local time with no time-zone conversion.",
          )}
        </p>
        <div className="filter-tabs">
          {days.map((label, index) => (
            <button
              key={label}
              aria-pressed={day === index}
              onClick={() => setDay(index)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="schedule-list">
          {items.map((item) => (
            <Link
              className="schedule-item panel"
              key={item.id}
              href={`/${item.section}/`}
            >
              <div className="schedule-time">
                {item.time}
                <small>{item.end}</small>
              </div>
              <div>
                <span className="eyebrow">{item.section}</span>
                <h3>{item.name[state.language]}</h3>
                <span className="row small muted">
                  <MapPin size={13} />
                  {item.location[state.language]}
                </span>
              </div>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
        {!items.length && (
          <EmptyState
            title={t("Día de descanso", "Rest day")}
            description={t(
              "Espacio libre para integrar, pasear y descansar.",
              "Space to integrate, walk, and rest.",
            )}
          />
        )}
      </section>
    </>
  );
}
