import type { AyurvedaTopic } from "@/lib/models";
import { l } from "@/lib/utils";
import { base } from "../shared";
const concepts = [
  [
    "vata",
    "Vata",
    "Vata",
    "Movimiento y variabilidad",
    "Movement and variability",
  ],
  [
    "pitta",
    "Pitta",
    "Pitta",
    "Transformación y calor",
    "Transformation and heat",
  ],
  [
    "kapha",
    "Kapha",
    "Kapha",
    "Estabilidad y cohesión",
    "Stability and cohesion",
  ],
  [
    "prakriti",
    "Prakriti",
    "Prakriti",
    "Constitución en el marco tradicional",
    "Constitution in the traditional framework",
  ],
  [
    "vikriti",
    "Vikriti",
    "Vikriti",
    "Estado actual en el marco tradicional",
    "Current state in the traditional framework",
  ],
  [
    "agni",
    "Agni",
    "Agni",
    "Metáfora tradicional del fuego digestivo",
    "Traditional metaphor of digestive fire",
  ],
  [
    "ama",
    "Ama",
    "Ama",
    "Concepto tradicional de residuos",
    "Traditional concept of residue",
  ],
  [
    "gunas",
    "Gunas",
    "Gunas",
    "Cualidades en la filosofía india",
    "Qualities in Indian philosophy",
  ],
  [
    "dinacharya",
    "Dinacharya",
    "Dinacharya",
    "Rutinas cotidianas",
    "Daily routines",
  ],
  [
    "food",
    "Alimentación",
    "Food",
    "Reflexión sobre hábitos alimentarios",
    "Reflection on eating habits",
  ],
  [
    "seasons",
    "Estaciones",
    "Seasons",
    "Ritmos estacionales",
    "Seasonal rhythms",
  ],
  [
    "yoga-ayurveda",
    "Yoga + Ayurveda",
    "Yoga + Ayurveda",
    "Relaciones entre tradiciones",
    "Relationships between traditions",
  ],
];
export const ayurveda: AyurvedaTopic[] = concepts.map(
  ([id, es, en, descEs, descEn]) => ({
    ...base(id, es, en, "Ayurveda", l(descEs, descEn)),
    kind: "ayurveda",
    concept: l(descEs, descEn),
    tradition: l(
      "Concepto de un sistema tradicional; no equivale a un diagnóstico biomédico ni establece un tratamiento.",
      "A concept from a traditional system; it is not a biomedical diagnosis and does not establish a treatment.",
    ),
    reflection: l(
      "¿Cómo describirías este concepto con tus propias palabras? Añade un ejemplo a tus notas.",
      "How would you describe this concept in your own words? Add an example to your notes.",
    ),
    safety: l(
      "Contenido cultural de ejemplo. No incluye diagnóstico de doshas, suplementos ni pautas terapéuticas.",
      "Traditional concepts for cultural study. They are not dosha diagnoses, supplement advice or therapeutic prescriptions.",
    ),
  }),
);
