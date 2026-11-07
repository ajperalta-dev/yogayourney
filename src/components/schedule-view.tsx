/* eslint-disable react-hooks/set-state-in-effect -- Hydrate browser-only storage or local clock after the static HTML has hydrated. */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { schedule } from "@/content/schedule";
import { useLocal } from "./providers";
import { SectionHeader, EmptyState } from "./common";
export function ScheduleView() {
  const { state, t } = useLocal();
  const [day, setDay] = useState(1);
  useEffect(() => setDay(new Date().getDay()), []);
  const days =
    state.language === "es"
      ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const items = schedule.filter((s) => s.days.includes(day));
  return (
    <>
      <SectionHeader
        eyebrow="SCHEDULE"
        title={t("Un ritmo para tu día", "A rhythm for your day")}
        description={t(
          "Horario de muestra para el YTT · horas del centro, sin conversión de zona horaria.",
          "Sample YTT schedule · school times, without time-zone conversion.",
        )}
      />
      <div className="filter-tabs">
        {days.map((d, i) => (
          <button key={d} aria-pressed={day === i} onClick={() => setDay(i)}>
            {d}
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
            "Space to integrate, walk and rest.",
          )}
        />
      )}
    </>
  );
}
