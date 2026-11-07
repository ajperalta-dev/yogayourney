import type { PranayamaTechnique } from "@/lib/models";
import { l } from "@/lib/utils";
import { base, safety, seed } from "../shared";
export const pranayama: PranayamaTechnique[] = [
  {
    ...base(
      "sama-vritti",
      "Respiración equilibrada",
      "Equal breathing",
      "Pranayama",
      l(
        "Encuentra un ritmo suave, sin retenciones.",
        "Find a gentle rhythm, without breath holds.",
      ),
    ),
    kind: "pranayama",
    sanskrit: "Sama Vṛtti",
    duration: 180,
    objective: l(
      "Observar un ritmo respiratorio cómodo.",
      "Observe a comfortable breathing rhythm.",
    ),
    preparation: l(
      "Siéntate con apoyo y respira de forma natural.",
      "Sit with support and breathe naturally.",
    ),
    instructions: l(
      "Si resulta cómodo, inspira en cuatro tiempos y espira en cuatro. Ajusta el ritmo o vuelve a respirar normalmente cuando lo necesites.",
      "If comfortable, breathe in for four counts and out for four. Adjust the rhythm or return to normal breathing whenever needed.",
    ),
    rhythm: { inhale: 4, exhale: 4 },
    benefits: l(
      "Una estructura para practicar la atención a la respiración.",
      "A structure for practicing attention to the breath.",
    ),
    contraindications: safety,
    notes: seed,
    tags: ["breath", "respiración", "pranayama", "attention"],
    relatedIds: ["breath-awareness"],
  },
];
