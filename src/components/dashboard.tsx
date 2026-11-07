/* eslint-disable react-hooks/set-state-in-effect -- Hydrate browser-only storage or local clock after the static HTML has hydrated. */
"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  Layers3,
  Play,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocal } from "./providers";
import { Button } from "./ui/button";
import { SectionIcon, ProgressBar, EmptyState } from "./common";
import { sections } from "@/content/sections";
import { schedule } from "@/content/schedule";
import illustrations from "@/content/illustrations.json";
import type { SearchEntry } from "@/content/catalog";
export function Dashboard({
  index,
  total,
}: {
  index: SearchEntry[];
  total: number;
}) {
  const { state, t } = useLocal();
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    setToday(new Date());
  }, []);
  const visited = Object.keys(state.visited).length;
  const percent = Math.min(100, Math.round((visited / total) * 100));
  const last = index.find((i) => i.href === state.lastPath);
  const favorites = state.favorites
    .slice(-3)
    .reverse()
    .map((id) => index.find((i) => i.id === id))
    .filter((x) => !!x);
  const todays = schedule.filter(
    (s) => today && s.days.includes(today.getDay()),
  );
  return (
    <>
      <div className="dashboard-heading">
        <div>
          <div className="eyebrow">
            {t("TU CAMINO, A TU RITMO", "YOUR JOURNEY, YOUR PACE")}
          </div>
          <h1>
            {t("Vuelve a ti.", "Come back to yourself.")}{" "}
            <span className="heading-flower">✳</span>
          </h1>
          <p className="muted">
            {t(
              "Un espacio para estudiar, practicar y crecer como docente.",
              "A space to study, practice and grow as a teacher.",
            )}
          </p>
        </div>
        <div className="date-chip">
          <CalendarDays size={16} />
          {today
            ? today.toLocaleDateString(
                state.language === "es" ? "es-ES" : "en-GB",
                { weekday: "short", day: "numeric", month: "long" },
              )
            : "YOGA JOURNEY"}
        </div>
      </div>
      <div className="dashboard-top">
        <section className="hero-card">
          <Image
            src="/images/journey.webp"
            alt={illustrations.poses.sukhasana[state.language]}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 65vw"
          />
          <div className="hero-content">
            <span className="hero-label">
              <span className="status-dot" />
              200 HOURS YOGA TEACHER TRAINING
            </span>
            <h2>
              {t("La práctica comienza", "Your practice begins")}
              <br />
              <em>{t("donde estás.", "where you are.")}</em>
            </h2>
            <p>
              {t(
                "Cultiva el conocimiento. Habita tu práctica. Comparte lo que descubres.",
                "Deepen your knowledge. Embody your practice. Share what you discover.",
              )}
            </p>
            <Button asChild>
              <Link href={last?.href || "/hatha/"}>
                {last
                  ? t("Continuar estudiando", "Continue studying")
                  : t("Comenzar mi camino", "Begin my journey")}
                <ArrowRight size={17} />
              </Link>
            </Button>
            <span className="hero-footnote">
              {last
                ? `${t("Última visita", "Last visited")}: ${last.name[state.language]}`
                : t(
                    "Hatha · Ashtanga · Yin · Aerial",
                    "Hatha · Ashtanga · Yin · Aerial",
                  )}
            </span>
          </div>
        </section>
        <section className="progress-card">
          <div className="row between">
            <span className="eyebrow">{t("PASO A PASO", "STEP BY STEP")}</span>
            <Sparkles size={18} />
          </div>
          <h3>{t("Tu formación florece", "Your training unfolds")}</h3>
          <div
            className="progress-ring"
            style={{
              background: `conic-gradient(var(--primary) ${percent}%,var(--line) 0)`,
            }}
          >
            <div>
              <strong>
                {percent}
                <span>%</span>
              </strong>
              <small>{t("explorado", "explored")}</small>
            </div>
          </div>
          <div className="row between small">
            <span>{t("Fichas estudiadas", "Entries explored")}</span>
            <strong>
              {visited} / {total}
            </strong>
          </div>
          <ProgressBar value={percent} label="YTT" />
          <Link href="/study/progress/" className="text-link">
            {t("Ver mi progreso", "View my progress")}
            <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
      <div className="stat-strip">
        <div>
          <BookOpen size={20} />
          <span>
            <strong>11</strong> {t("áreas para descubrir", "areas to discover")}
          </span>
        </div>
        <div>
          <Flame size={20} />
          <span>
            <strong>{state.sessions.length}</strong>{" "}
            {t("sesiones completadas", "completed sessions")}
          </span>
        </div>
        <div>
          <CheckCircle2 size={20} />
          <span>
            <strong>{Object.keys(state.cards).length}</strong>{" "}
            {t("tarjetas repasadas", "cards reviewed")}
          </span>
        </div>
        <div>
          <Clock3 size={20} />
          <span>{t("Pequeños pasos, cada día", "Small steps, every day")}</span>
        </div>
      </div>
      <div className="dashboard-columns">
        <div>
          <div className="block-heading">
            <div>
              <h2>{t("Explora tu formación", "Explore your training")}</h2>
              <p className="muted small">
                {t(
                  "Todo lo que necesitas, un tema a la vez.",
                  "Everything you need, one topic at a time.",
                )}
              </p>
            </div>
            <Link className="text-link" href="/learn/">
              {t("Ver todo", "View all")}
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="section-grid">
            {sections.map((s, i) => (
              <Link href={`/${s.id}/`} className="section-card" key={s.id}>
                <div className={`section-icon ${s.color}`}>
                  <SectionIcon name={s.icon} size={23} />
                </div>
                <div>
                  <h3>{s.name[state.language]}</h3>
                  <p>{s.description[state.language]}</p>
                </div>
                <ArrowUpRight className="section-arrow" size={16} />
                <span className="section-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>
          <div className="block-heading">
            <h2>
              {t("De la teoría a la práctica", "From learning to living")}
            </h2>
          </div>
          <div className="quick-grid">
            <Link href="/practice/" className="quick-card sage">
              <Play size={24} />
              <div>
                <h3>{t("Encuentra tu práctica", "Find your practice")}</h3>
                <p>
                  {t("Respira, muévete, vuelve.", "Breathe, move, return.")}
                </p>
              </div>
              <ArrowUpRight size={20} />
            </Link>
            <Link href="/teach/builder/" className="quick-card peach">
              <Layers3 size={24} />
              <div>
                <h3>{t("Diseña una clase", "Create a class")}</h3>
                <p>
                  {t("Da forma a lo que compartes.", "Shape what you share.")}
                </p>
              </div>
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
        <aside className="dashboard-aside">
          <section className="panel schedule-panel">
            <div className="row between">
              <h3>{t("Tu día en el shala", "Your day at the shala")}</h3>
              <CalendarDays size={19} />
            </div>
            <p className="small muted">
              {t(
                "Horario de ejemplo · hora local",
                "Sample schedule · local time",
              )}
            </p>
            {todays.length ? (
              todays.slice(0, 4).map((s, i) => (
                <Link
                  href={`/${s.section}/`}
                  className="schedule-row"
                  key={s.id}
                >
                  <span className={`timeline-dot ${i === 0 ? "filled" : ""}`} />
                  <div>
                    <small>
                      {s.time} — {s.end}
                    </small>
                    <strong>{s.name[state.language]}</strong>
                    <span>{s.location[state.language]}</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="rest-day">
                {t(
                  "Un día para descansar e integrar.",
                  "A day to rest and integrate.",
                )}
              </p>
            )}
            <Link href="/schedule/" className="text-link">
              {t("Ver horario completo", "View full schedule")}
              <ArrowRight size={15} />
            </Link>
          </section>
          <section className="panel">
            <div className="row between">
              <h3>{t("Para volver a ello", "Worth returning to")}</h3>
              <span>♡</span>
            </div>
            <p className="small muted">
              {t("Tus favoritos recientes", "Your recent favorites")}
            </p>
            {favorites.length ? (
              favorites.map((f) => (
                <Link key={f.id} href={f.href} className="favorite-row">
                  <BookOpen size={16} />
                  <span>{f.name[state.language]}</span>
                  <ArrowUpRight size={14} />
                </Link>
              ))
            ) : (
              <EmptyState
                title={t("Guarda lo que te inspira", "Save what inspires you")}
                description={t(
                  "Toca el corazón en cualquier ficha.",
                  "Tap the heart on any entry.",
                )}
              />
            )}
          </section>
          <div className="quote-card">
            <span>“</span>
            <p>
              {t(
                "No necesitas llegar más lejos. Solo estar un poco más presente.",
                "You don’t need to reach further. Just be a little more present.",
              )}
            </p>
            <small>
              {t("UNA INTENCIÓN PARA HOY", "AN INTENTION FOR TODAY")}
            </small>
          </div>
        </aside>
      </div>
    </>
  );
}
