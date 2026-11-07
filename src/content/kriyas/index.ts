import type { Kriya } from "@/lib/models";
import { l } from "@/lib/utils";
import { base } from "../shared";
export const kriyas: Kriya[] = [
  {
    ...base(
      "kriya-foundations",
      "Introducción a los kriyas",
      "Kriya foundations",
      "Foundations",
      l(
        "Contexto tradicional y evaluación de riesgos.",
        "Traditional context and risk awareness.",
      ),
    ),
    kind: "kriya",
    studyOnly: true,
    description: l(
      "Prácticas tradicionales de limpieza descritas en algunas escuelas de Hatha.",
      "Traditional cleansing practices described in some Hatha schools.",
    ),
    objective: l(
      "Distinguir tradición, evidencia y seguridad.",
      "Distinguish tradition, evidence and safety.",
    ),
    materials: l("Ninguno para esta lectura.", "None for this reading."),
    preparation: l(
      "Estudio teórico con un docente cualificado.",
      "Theoretical study with a qualified teacher.",
    ),
    steps: l(
      "Lee el contexto. Identifica riesgos. Consulta un profesional antes de considerar una técnica física. Esta ficha no guía limpiezas.",
      "Read the context. Identify risks. Consult a professional before considering a physical technique. This entry does not guide cleansing.",
    ),
    frequency: l(
      "Lectura a tu ritmo; sin pauta de práctica física.",
      "Read at your own pace; no physical practice schedule.",
    ),
    benefits: l(
      "Comprender el contexto histórico; no se atribuye eliminación de toxinas.",
      "Understand the historical context; no toxin-removal benefit is claimed.",
    ),
    risks: l(
      "Las técnicas invasivas o intensas pueden causar daño. No se incluyen instrucciones de irrigación, purgas o ingestión.",
      "Invasive or intense techniques can cause harm. Irrigation, purging and ingestion instructions are not included.",
    ),
    contraindications: l(
      "Requieren evaluación específica para cada técnica y persona.",
      "Require evaluation specific to each technique and person.",
    ),
    precautions: l(
      "No sustituyen atención sanitaria ni tratamientos.",
      "They do not replace healthcare or treatment.",
    ),
    safety: l(
      "Lectura teórica. “Detox” es una denominación tradicional, no una promesa médica. No practiques técnicas de limpieza a partir de esta demostración.",
      "Theoretical reading. “Detox” is a traditional label, not a medical promise. Do not perform cleansing techniques from this demonstration.",
    ),
  },
];
