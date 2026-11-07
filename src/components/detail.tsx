"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import type { ContentItem, Field } from "@/lib/models";
import type { SearchEntry } from "@/content/catalog";
import { useLocal } from "./providers";
import {
  FavoriteButton,
  SafetyAlert,
  NotesEditor,
  AudioPlayer,
  Duration,
} from "./common";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Timer, BreathingGuide } from "./timer";
const tabs = [
  ["technique", "Técnica", "Technique"],
  ["anatomy", "Anatomía", "Anatomy"],
  ["benefits", "Beneficios", "Benefits"],
  ["teaching", "Enseñar", "Teaching"],
  ["safety", "Seguridad", "Safety"],
];
export function Detail({
  item,
  fields,
  related,
  section,
}: {
  item: ContentItem;
  fields: Field[];
  related: SearchEntry[];
  section: string;
}) {
  const { state, update, ready, t } = useLocal();
  const path = usePathname();
  useEffect(() => {
    if (ready)
      update((s) => ({
        ...s,
        visited: { ...s.visited, [item.id]: new Date().toISOString() },
        lastPath: path,
      }));
  }, [item.id, path, ready, update]);
  return (
    <>
      <Link href={`/${section}/`} className="text-link back-link">
        <ArrowLeft size={15} />
        {t("Volver a la biblioteca", "Back to the library")}
      </Link>
      <div className="detail-heading">
        <div>
          <div className="eyebrow">
            {section.toUpperCase()} / {item.category}
          </div>
          <h1>{item.name[state.language]}</h1>
          {item.sanskrit && <p className="sanskrit">{item.sanskrit}</p>}
          <p className="muted">{item.summary[state.language]}</p>
        </div>
        <FavoriteButton id={item.id} />
      </div>
      <div className="detail-layout">
        <div>
          <div className="detail-image">
            <Image
              src={item.image}
              alt={t(
                `Ilustración orientativa: ${item.name.es}`,
                `Illustrative placeholder: ${item.name.en}`,
              )}
              fill
              priority
              sizes="(max-width: 800px) 95vw, 55vw"
            />
            <span className="badge">
              {t(
                "Ilustración de ejemplo · no es una guía de alineación",
                "Sample illustration · not an alignment guide",
              )}
            </span>
          </div>
          <div className="detail-meta">
            <span>
              <BookOpen size={15} /> {t("Modo estudio", "Study mode")}
            </span>
            <Duration seconds={item.duration} />
            <span>{t("Ficha de muestra", "Sample entry")}</span>
          </div>
          <Tabs defaultValue="technique">
            <TabsList
              aria-label={t("Información de la ficha", "Entry information")}
            >
              {tabs.map(([value, es, en]) => (
                <TabsTrigger key={value} value={value}>
                  {t(es, en)}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map(([value]) => (
              <TabsContent value={value} key={value}>
                {fields
                  .filter((f) => f.group === value)
                  .map((f, i) => (
                    <section className="detail-field" key={i}>
                      <h3>{f.label[state.language]}</h3>
                      <p>{f.text[state.language]}</p>
                    </section>
                  ))}
                {!fields.some((f) => f.group === value) && (
                  <p className="muted">
                    {t(
                      "Esta muestra no contiene información adicional en esta pestaña.",
                      "This sample has no additional information in this tab.",
                    )}
                  </p>
                )}
                {value === "anatomy" && related.length > 0 && (
                  <Related items={related} />
                )}{" "}
                {value === "teaching" && item.kind === "asana" && (
                  <div className="detail-field">
                    <h3>
                      {t(
                        "Preparación y compensación",
                        "Preparation and counterposes",
                      )}
                    </h3>
                    <div className="related-links">
                      {[...item.preparatoryPoseIds, ...item.counterposeIds].map(
                        (id) => (
                          <Link key={id} href={`/hatha/${id}/`}>
                            {id.replaceAll("-", " ")}
                            <ArrowUpRight size={13} />
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                )}
                {value === "safety" && item.kind === "aerial" && (
                  <p className="safety">
                    <ShieldCheck />
                    {t(
                      "Instructor y spotter requeridos.",
                      "Instructor and spotter required.",
                    )}
                  </p>
                )}
              </TabsContent>
            ))}
          </Tabs>
          {item.kind === "mantra" && (
            <div className="panel">
              <p className="sanskrit">{item.sanskrit}</p>
              <p>{item.transliteration}</p>
              <AudioPlayer src={item.audio} title={item.name[state.language]} />
            </div>
          )}
          <NotesEditor id={item.id} />
        </div>
        <aside className="detail-aside">
          <SafetyAlert>{item.safety[state.language]}</SafetyAlert>
          {item.kind === "pranayama" && (
            <div className="panel">
              <h3>{t("Encuentra tu respiración", "Find your breath")}</h3>
              <BreathingGuide {...item.rhythm} />
            </div>
          )}
          {["yin", "meditation", "pranayama"].includes(item.kind) && (
            <div className="panel">
              <h3>{t("Una pausa consciente", "A mindful pause")}</h3>
              <Timer
                seconds={item.duration}
                onComplete={() =>
                  update((s) => ({
                    ...s,
                    sessions: [
                      ...s.sessions,
                      {
                        id: crypto.randomUUID(),
                        sequenceId: item.id,
                        completedAt: new Date().toISOString(),
                        seconds: item.duration,
                      },
                    ],
                  }))
                }
              />
            </div>
          )}
          {related.length > 0 && (
            <div className="panel">
              <Related items={related} />
            </div>
          )}
          <div className="editorial-note">
            {t(
              "Contenido representativo para validar la aplicación. Revisión docente y catálogo completo pendientes.",
              "Representative content for validating the application. Teacher review and the complete catalog are pending.",
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
function Related({ items }: { items: SearchEntry[] }) {
  const { state, t } = useLocal();
  return (
    <>
      <h3>{t("Conecta lo que aprendes", "Connect what you learn")}</h3>
      <div className="related-links">
        {items.map((item) => (
          <Link key={item.id} href={item.href}>
            {item.name[state.language]}
            <ArrowUpRight size={14} />
          </Link>
        ))}
      </div>
    </>
  );
}
