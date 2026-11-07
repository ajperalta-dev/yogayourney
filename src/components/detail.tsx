"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import type { ContentItem, Field } from "@/lib/models";
import type { SearchEntry } from "@/content/catalog";
import { illustrationAlt } from "@/content/illustration-alt";
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
  const [failedImageId, setFailedImageId] = useState<string | null>(null);
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
            {!item.image || failedImageId === item.id ? (
              <div
                className="detail-image-fallback"
                role="img"
                aria-label={t(
                  `Imagen no disponible: ${item.name.es}`,
                  `Image unavailable: ${item.name.en}`,
                )}
              >
                <BookOpen size={34} />
                <span>{item.name[state.language]}</span>
              </div>
            ) : (
              <Image
                src={item.image}
                alt={illustrationAlt(item.image)?.[state.language] ?? t(
                  `Ilustración esquemática de ${item.name.es}`,
                  `Schematic illustration of ${item.name.en}`,
                )}
                fill
                priority
                sizes="(max-width: 800px) 95vw, 55vw"
                onError={() => setFailedImageId(item.id)}
              />
            )}
            <span className="badge">
              {t(
                "Ilustración esquemática · no sustituye una guía de alineación",
                "Schematic illustration · not an alignment guide",
              )}
            </span>
          </div>
          <div className="detail-meta">
            <span>
              <BookOpen size={15} /> {t("Modo estudio", "Study mode")}
            </span>
            <Duration seconds={item.duration} />
            <span>{t("Ficha de estudio", "Study entry")}</span>
            {item.kind === "pranayama" && (
              <span>
                {item.level === "beginner"
                  ? t("Principiante", "Beginner")
                  : item.level === "intermediate"
                    ? t("Intermedio", "Intermediate")
                    : t("Avanzado", "Advanced")}
              </span>
            )}
          </div>
          {item.kind === "pranayama" && item.requiresInstructor && (
            <p className="safety">
              <ShieldCheck />
              {t(
                "Aviso: la respiración intensa o con retención debe aprenderse con un instructor cualificado. No sigas una retención usando solo esta guía.",
                "Notice: forceful breathing or breath retention should be learned with a qualified instructor. Do not follow a retention using this guide alone.",
              )}
            </p>
          )}
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
                      {"steps" in f ? (
                        <ol>
                          {f.steps[state.language].map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      ) : (
                        <p>{f.text[state.language]}</p>
                      )}
                    </section>
                  ))}
                {!fields.some((f) => f.group === value) && (
                  <p className="muted">
                    {t(
                      "No hay información adicional en esta pestaña.",
                      "No additional information is available in this tab.",
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
              <BreathingGuide
                {...item.rhythm}
                instructorLed={item.requiresInstructor}
              />
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
              "Las ilustraciones son esquemáticas y orientativas. Adaptá cada postura a tus posibilidades y priorizá una respiración cómoda.",
              "The illustrations are schematic guides. Adapt each pose to your needs and keep your breathing comfortable.",
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
