import type { ContentItem, Field, Localized } from "./models";
import { field } from "@/content/shared";
import { l } from "@/lib/utils";
const labels: Record<string, [string, string, Field["group"]]> = {
  instructions: ["Instrucciones", "Instructions", "technique"],
  breathing: ["Respiración", "Breathing", "technique"],
  drishti: ["Drishti", "Drishti", "technique"],
  benefits: ["Beneficios potenciales", "Potential benefits", "benefits"],
  contraindications: ["Contraindicaciones", "Contraindications", "safety"],
  modifications: ["Adaptaciones", "Modifications", "teaching"],
  commonMistakes: ["Errores comunes", "Common mistakes", "teaching"],
  teachingCues: ["Indicaciones docentes", "Teaching cues", "teaching"],
  notes: ["Nota editorial", "Editorial note", "teaching"],
  targetArea: ["Zona de atención", "Target area", "anatomy"],
  meridians: ["Marco tradicional", "Traditional framework", "anatomy"],
  entry: ["Entrada", "Entry", "technique"],
  hold: ["Permanencia", "Hold", "technique"],
  exit: ["Salida", "Exit", "technique"],
  rebound: ["Rebound", "Rebound", "technique"],
  props: ["Material de apoyo", "Props", "teaching"],
  hammockSetup: ["Montaje de hamaca", "Hammock setup", "safety"],
  height: ["Altura", "Height", "safety"],
  fabricContacts: ["Contacto con la tela", "Fabric contacts", "anatomy"],
  startingPosition: ["Posición inicial", "Starting position", "technique"],
  finalPosition: ["Posición final", "Final position", "technique"],
  muscles: ["Músculos", "Muscles", "anatomy"],
  precautions: ["Precauciones", "Precautions", "safety"],
  progressions: ["Progresiones", "Progressions", "teaching"],
  regressions: ["Regresiones", "Regressions", "teaching"],
  objective: ["Objetivo", "Objective", "technique"],
  preparation: ["Preparación", "Preparation", "technique"],
  translation: ["Traducción", "Translation", "technique"],
  meaning: ["Significado", "Meaning", "benefits"],
  pronunciation: ["Pronunciación sencilla", "Simple pronunciation", "technique"],
  intention: ["Intención", "Intention", "benefits"],
  practice: ["Cómo y cuándo recitar", "How and when to chant", "teaching"],
  recommendedPosture: ["Postura recomendada", "Recommended posture", "technique"],
  bestTime: ["Momento recomendado", "Suggested timing", "teaching"],
  context: ["Contexto", "Context", "teaching"],
  movements: ["Movimientos", "Movements", "anatomy"],
  description: ["Descripción", "Description", "technique"],
  materials: ["Materiales", "Materials", "technique"],
  steps: ["Pasos", "Steps", "technique"],
  frequency: ["Frecuencia", "Frequency", "teaching"],
  risks: ["Riesgos", "Risks", "safety"],
  posture: ["Postura", "Posture", "technique"],
  difficulties: ["Dificultades", "Difficulties", "teaching"],
  tips: ["Consejos", "Tips", "teaching"],
  concept: ["Concepto", "Concept", "technique"],
  tradition: ["Tradición", "Tradition", "teaching"],
  reflection: ["Reflexión", "Reflection", "teaching"],
  safety: ["Seguridad", "Safety", "safety"],
  guidedScript: ["Guion guiado", "Guided script", "technique"],
};
export function detailFields(item: ContentItem): Field[] {
  const result: Field[] = [...item.fields];
  const isPose =
    item.kind === "asana" || item.kind === "yin" || item.kind === "aerial";
  for (const [key, value] of Object.entries(item)) {
    if (
      key !== "instructionSteps" &&
      !(item.kind === "pranayama" && key === "instructions") &&
      !(item.kind === "meditation" && key === "instructions") &&
      !(item.kind === "meditation" && key === "guidedScript") &&
      !(isPose && (key === "instructions" || key === "entry")) &&
      labels[key] &&
      value &&
      typeof value === "object" &&
      "es" in value &&
      "en" in value
    ) {
      const [es, en, group] = labels[key];
      result.push(field(es, en, value as Localized, group));
    }
  }
  if (
    item.kind === "asana" ||
    item.kind === "yin" ||
    item.kind === "aerial"
  ) {
    result.push({
      label: l("Instrucciones paso a paso", "Step-by-step instructions"),
      steps: item.instructionSteps,
      group: "technique",
    });
  }
  if (item.kind === "pranayama") {
    result.push({
      label: l("Instrucciones paso a paso", "Step-by-step instructions"),
      steps: item.instructionSteps,
      group: "technique",
    });
    result.push({
      label: l("Práctica sugerida por nivel", "Suggested practice by level"),
      steps: {
        es: [
          `Principiante: ${item.practiceByLevel.beginner.es}`,
          `Intermedio: ${item.practiceByLevel.intermediate.es}`,
          `Avanzado: ${item.practiceByLevel.advanced.es}`,
        ],
        en: [
          `Beginner: ${item.practiceByLevel.beginner.en}`,
          `Intermediate: ${item.practiceByLevel.intermediate.en}`,
          `Advanced: ${item.practiceByLevel.advanced.en}`,
        ],
      },
      group: "teaching",
    });
  }
  if (item.kind === "meditation") {
    result.push({
      label: l("Instrucciones paso a paso", "Step-by-step instructions"),
      steps: item.instructionSteps,
      group: "technique",
    });
    result.push(
      field("Cómo practicar", "How to practice", item.instructions, "technique"),
    );
    if (item.guidedScript) {
      result.push(
        field("Guion guiado", "Guided script", item.guidedScript, "technique"),
      );
    }
  }
  return result;
}
