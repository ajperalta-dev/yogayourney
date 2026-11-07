import { l } from "@/lib/utils";
import type { ContentBase, DetailGroup, Field, Localized } from "@/lib/models";
export const gentle = l(
  "Respira con naturalidad, sin retenciones ni esfuerzo.",
  "Breathe naturally, without holds or strain.",
);
export const safety = l(
  "No fuerces el rango de movimiento. Si aparece dolor, mareo o dificultad para respirar, detente. Adapta la práctica con una persona cualificada si tienes una lesión o condición médica.",
  "Do not force your range of motion. Stop if you experience pain, dizziness or difficulty breathing. Adapt your practice with a qualified professional if you have an injury or medical condition.",
);
export const seed = l(
  "Utiliza esta ficha como punto de partida para tu estudio y contrasta las indicaciones con tu docente.",
  "Use this entry as a starting point for study and discuss the guidance with your teacher.",
);
export function field(
  labelEs: string,
  labelEn: string,
  text: Localized,
  group: DetailGroup = "technique",
): Field {
  return { label: l(labelEs, labelEn), text, group };
}
export function base(
  id: string,
  es: string,
  en: string,
  category: string,
  summary: Localized,
): ContentBase {
  return {
    id,
    name: l(es, en),
    summary,
    category,
    level: "beginner",
    image: "/images/study.webp",
    thumbnail: "/images/study-thumb.webp",
    tags: [category],
    fields: [],
    relatedIds: [],
    duration: 60,
    breathing: gentle,
    safety,
  };
}
