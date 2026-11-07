import type { Sequence } from "@/lib/models";
import { l } from "@/lib/utils";
import { ashtangaSequences } from "./ashtanga";
function sequence(
  id: string,
  es: string,
  en: string,
  style: Sequence["style"],
  ids: string[],
  duration = 45,
  level: Sequence["level"] = "beginner",
): Sequence {
  return {
    id,
    name: l(es, en),
    description: l(
      "Práctica gradual y adaptable. Detente si aparece dolor, mareo o falta de aire.",
      "A gradual, adaptable practice. Stop if you experience pain, dizziness or breathlessness.",
    ),
    style,
    level,
    duration: ids.length * duration,
    objective: l(
      "Coordinar movimiento y respiración con atención, sin forzar el rango.",
      "Coordinate movement and breath with awareness, without forcing range.",
    ),
    image: `/images/sequences/${id}.webp`,
    demo: false,
    steps: ids.map((contentId, i) => ({
      key: `${id}-${i}`,
      contentId,
      duration,
      stage: contentId === "savasana"
        ? "savasana"
        : i < 3
          ? "warm-up"
          : i >= ids.length - 3
            ? "cool-down"
            : "asanas",
    })),
  };
}
export const sequences: Sequence[] = [
  ...ashtangaSequences,
  sequence(
    "hatha-foundations",
    "Volver a las bases",
    "Back to the foundations",
    "hatha",
    [
      "sukhasana",
      "tadasana",
      "urdhva-hastasana",
      "uttanasana",
      "ardha-uttanasana",
      "virabhadrasana-ii",
      "utthita-trikonasana",
      "utthita-parsvakonasana",
      "baddha-konasana",
      "setu-bandha-sarvangasana",
      "savasana",
    ],
    45,
    "beginner",
  ),
  sequence(
    "yin-stillness",
    "Un espacio de quietud",
    "A space for stillness",
    "yin",
    [
      "sukhasana",
      "butterfly",
      "dragon",
      "sphinx",
      "supported-child",
      "reclined-twist",
      "savasana",
    ],
    240,
  ),
  sequence(
    "aerial-foundations",
    "Aerial · repaso supervisado",
    "Aerial · supervised review",
    "aerial",
    ["sukhasana", "tadasana", "supported-seat", "sukhasana", "savasana"],
    90,
  ),
];
