"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Heart,
  ShieldCheck,
  CalendarDays,
  Sun,
  PersonStanding,
  Moon,
  Wind,
  Music2,
  Activity,
  Droplets,
  Flower2,
  Leaf,
  BookOpen,
  Check,
  Clock3,
} from "lucide-react";
import { useState } from "react";
import { useLocal } from "./providers";
import { Button } from "./ui/button";
import type { SearchEntry } from "@/content/catalog";
import { illustrationAlt } from "@/content/illustration-alt";
import type { ReactNode } from "react";
export const icons = {
  calendar: CalendarDays,
  sun: Sun,
  person: PersonStanding,
  moon: Moon,
  wind: Wind,
  music: Music2,
  activity: Activity,
  drop: Droplets,
  flower: Flower2,
  leaf: Leaf,
};
export function SectionIcon({
  name,
  ...props
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = icons[name as keyof typeof icons] || BookOpen;
  return <Icon {...props} />;
}
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="section-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
      </div>
      {action}
    </header>
  );
}
export function FavoriteButton({ id }: { id: string }) {
  const { state, update, t, ready } = useLocal();
  const active = state.favorites.includes(id);
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={!ready}
      className={active ? "favorite active" : "favorite"}
      aria-label={
        active
          ? t("Quitar de favoritos", "Remove favorite")
          : t("Añadir a favoritos", "Add favorite")
      }
      aria-pressed={active}
      onClick={() =>
        update((s) => ({
          ...s,
          favorites: active
            ? s.favorites.filter((x) => x !== id)
            : [...s.favorites, id],
        }))
      }
    >
      <Heart size={18} fill={active ? "currentColor" : "none"} />
    </Button>
  );
}
export function ContentCard({ item }: { item: SearchEntry }) {
  const { state } = useLocal();
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className="content-card">
      <Link href={item.href} className="card-image" aria-label={item.name[state.language]}>
        {!imageFailed && item.image ? (
          <Image
            src={item.image}
            alt={
              illustrationAlt(item.image)?.[state.language] ?? (state.language === "es"
                ? `Ilustración de ${item.name.es}`
                : `Illustration of ${item.name.en}`)
            }
            fill
            loading="lazy"
            sizes="(max-width: 600px) 90vw, (max-width: 1100px) 40vw, 25vw"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span
            className="card-image-fallback"
            role="img"
            aria-label={
              state.language === "es"
                ? `Imagen no disponible: ${item.name.es}`
                : `Image unavailable: ${item.name.en}`
            }
          >
            <BookOpen size={30} />
          </span>
        )}
        <span className="badge">{item.category}</span>
      </Link>
      <div className="card-body">
        <div className="row between">
          <span className="small muted">{item.sanskrit || item.section}</span>
          <FavoriteButton id={item.id} />
        </div>
        <Link href={item.href}>
          <h3>{item.name[state.language]}</h3>
        </Link>
        <p className="small muted">{item.summary[state.language]}</p>
        <Link className="text-link" href={item.href}>
          {state.language === "es" ? "Explorar ficha" : "Explore entry"}{" "}
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}
export function ProgressBar({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
    >
      <div style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} />
    </div>
  );
}
export function SafetyAlert({ children }: { children: ReactNode }) {
  const { t } = useLocal();
  return (
    <aside className="safety">
      <ShieldCheck size={22} />
      <div>
        <strong>{t("Practica con cuidado", "Practice with care")}</strong>
        <div className="small">{children}</div>
      </div>
    </aside>
  );
}
export function NotesEditor({ id }: { id: string }) {
  const { state, update, t, ready } = useLocal();
  return (
    <div className="notes-editor">
      <div className="row between">
        <h3>{t("Mis notas", "My notes")}</h3>
        <span className="small muted">
          <Check size={12} /> {t("Guardado local", "Saved locally")}
        </span>
      </div>
      <label className="sr-only" htmlFor={`note-${id}`}>
        {t("Notas personales", "Personal notes")}
      </label>
      <textarea
        id={`note-${id}`}
        disabled={!ready}
        value={state.notes[id]?.text || ""}
        placeholder={t(
          "Una observación, una pregunta, algo para recordar…",
          "An observation, a question, something to remember…",
        )}
        onChange={(e) => {
          const text = e.target.value;
          update((s) => ({
            ...s,
            notes: {
              ...s.notes,
              [id]: {
                contentId: id,
                text,
                updatedAt: new Date().toISOString(),
              },
            },
          }));
        }}
      />
    </div>
  );
}
export function AudioPlayer({ src, title }: { src?: string; title: string }) {
  const { t } = useLocal();
  return (
    <div className="audio-player">
      <Music2 size={22} />
      <div>
        <strong>{title}</strong>
        {src ? (
          <audio controls preload="none" src={src} aria-label={title} />
        ) : (
          <p className="small muted">
            {t(
              "Audio pendiente de grabación. El texto está disponible para estudiar.",
              "Recording pending. The text is available for study.",
            )}
          </p>
        )}
      </div>
    </div>
  );
}
export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <Flower2 size={32} />
      <h3>{title}</h3>
      {description && <p className="muted">{description}</p>}
      {children}
    </div>
  );
}
export function formatDurationLabel(seconds: number) {
  const wholeMinutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (wholeMinutes === 0) return `${remainingSeconds} s`;
  return remainingSeconds === 0
    ? `${wholeMinutes} min`
    : `${wholeMinutes} min ${remainingSeconds} s`;
}
export function Duration({ seconds }: { seconds: number }) {
  return (
    <span className="row small">
      <Clock3 size={14} />
      {formatDurationLabel(seconds)}
    </span>
  );
}
