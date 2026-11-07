import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { catalog, poses, posesById } from "../src/content/catalog";
import { illustrationAlt } from "../src/content/illustration-alt";
import illustrations from "../src/content/illustrations.json";
import { meditationPlans } from "../src/content/meditation/plans";
import { schedule } from "../src/content/schedule";
import {
  routineSuggestions,
  weeklyPracticePlans,
  type PlannerDay,
  type RoutineSuggestion,
} from "../src/content/schedule/plans";
import { sections } from "../src/content/sections";
import { sequences } from "../src/content/sequences";
import { flashcards, quizQuestions } from "../src/content/study";
import type { ContentItem, SectionId } from "../src/lib/models";
import { validateSequenceDuration } from "../src/lib/sequence-validation";

const errors: string[] = [];
const placeholderPattern =
  /lorem\s+ipsum|placeholder|coming soon|\breplace\s+me\b|sample text|draft content|insert text|\bTBD\b/i;
const publicDirectory = path.join(process.cwd(), "public");
const sectionIds = new Set<SectionId>([
  "schedule",
  "ashtanga",
  "hatha",
  "yin",
  "aerial",
  "pranayama",
  "mantras",
  "anatomy",
  "kriyas",
  "meditation",
  "ayurveda",
]);
const contentById = new Map(catalog.map((item) => [item.id, item]));
const sequenceById = new Map(sequences.map((sequence) => [sequence.id, sequence]));
const windows = [10, 20, 45, 60] as const;
const timesOfDay = ["morning", "midday", "evening"] as const;

function validateTextValues(value: unknown, recordPath: string): void {
  if (typeof value === "string") {
    if (!value.trim()) errors.push(`${recordPath}: campo de texto vacío`);
    if (placeholderPattern.test(value)) {
      errors.push(`${recordPath}: texto provisional o placeholder (${value})`);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      validateTextValues(entry, `${recordPath}[${index}]`),
    );
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) =>
      validateTextValues(entry, `${recordPath}.${key}`),
    );
  }
}

function validateImageRoute(image: unknown, recordPath: string): void {
  if (typeof image !== "string" || !image.trim()) {
    errors.push(`${recordPath}: ruta de imagen vacía`);
    return;
  }
  if (!/^\/images\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.(?:svg|webp)$/.test(image)) {
    errors.push(`${recordPath}: la imagen debe ser local y estar en /images/ (${image})`);
    return;
  }
  const assetPath = path.join(publicDirectory, image.slice(1));
  if (!statSync(assetPath, { throwIfNoEntry: false })?.isFile()) {
    errors.push(`${recordPath}: no existe ${image}`);
    return;
  }
  const alt = illustrationAlt(image);
  if (!alt?.es.trim() || !alt.en.trim()) {
    errors.push(`${recordPath}: falta la descripción de la imagen en español o inglés`);
  }
  if (image.endsWith(".svg")) {
    const svg = readFileSync(assetPath, "utf8");
    if (!svg.includes('viewBox="0 0 480 360"') || !svg.includes("<title>")) {
      errors.push(`${recordPath}: el SVG debe tener lienzo 480 × 360 y título`);
    }
  }
}

function validateLocalizedPair(value: unknown, recordPath: string): void {
  if (!value || typeof value !== "object") {
    errors.push(`${recordPath}: falta el contenido localizado en español e inglés`);
    return;
  }
  const localized = value as Record<string, unknown>;
  for (const language of ["es", "en"] as const) {
    if (typeof localized[language] !== "string" || !localized[language].trim()) {
      errors.push(`${recordPath}.${language}: traducción vacía o ausente`);
    }
  }
}

function validateArray(value: unknown, recordPath: string): void {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${recordPath}: lista vacía o ausente`);
  }
}

function validateId(id: string, recordPath: string): void {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    errors.push(`${recordPath}: el ID debe estar en kebab-case (${id})`);
  }
}

function validateCatalogItem(item: ContentItem): void {
  const itemPath = `ficha ${item.id}`;
  const record = item as unknown as Record<string, unknown>;
  validateId(item.id, itemPath);
  for (const key of ["name", "summary", "breathing", "safety"]) {
    validateLocalizedPair(record[key], `${itemPath}.${key}`);
  }
  if (!Array.isArray(item.tags) || item.tags.length === 0) {
    errors.push(`${itemPath}.tags: lista vacía o ausente`);
  }
  if (!Number.isSafeInteger(item.duration) || item.duration <= 0) {
    errors.push(`${itemPath}.duration: duración vacía o inválida`);
  }
  if (!item.category.trim()) errors.push(`${itemPath}.category: categoría vacía`);
  if (!item.level.trim()) errors.push(`${itemPath}.level: nivel vacío`);
  if (!Array.isArray(item.fields)) errors.push(`${itemPath}.fields: falta la lista de campos`);
  else {
    item.fields.forEach((field, index) => {
      const fieldPath = `${itemPath}.fields[${index}]`;
      validateLocalizedPair(field.label, `${fieldPath}.label`);
      if ("steps" in field) {
        for (const language of ["es", "en"] as const) {
          validateArray(field.steps[language], `${fieldPath}.steps.${language}`);
        }
      } else {
        validateLocalizedPair(field.text, `${fieldPath}.text`);
      }
    });
  }

  const localizedFields: Partial<Record<ContentItem["kind"], string[]>> = {
    asana: ["instructions", "hold", "drishti", "benefits", "teachingCues", "notes", "commonMistakes", "modifications", "contraindications"],
    yin: ["targetArea", "meridians", "entry", "hold", "exit", "rebound", "benefits", "props", "commonMistakes", "modifications", "contraindications"],
    aerial: ["hammockSetup", "height", "fabricContacts", "startingPosition", "entry", "finalPosition", "exit", "benefits", "muscles", "precautions", "progressions", "regressions", "teachingCues", "commonMistakes", "modifications", "contraindications"],
    pranayama: ["meaning", "objective", "preparation", "instructions", "recommendedPosture", "commonMistakes", "bestTime", "benefits", "contraindications", "notes"],
    mantra: ["pronunciation", "translation", "meaning", "context", "intention", "practice"],
    anatomy: ["movements", "muscles"],
    kriya: ["description", "objective", "materials", "preparation", "frequency", "benefits", "risks", "contraindications", "precautions"],
    meditation: ["objective", "preparation", "instructions", "posture", "benefits", "difficulties", "tips"],
    ayurveda: ["concept", "tradition", "reflection"],
  };
  for (const key of localizedFields[item.kind] ?? []) {
    validateLocalizedPair(record[key], `${itemPath}.${key}`);
  }

  if ("instructionSteps" in item && item.instructionSteps) {
    for (const language of ["es", "en"] as const) {
      validateArray(item.instructionSteps[language], `${itemPath}.instructionSteps.${language}`);
    }
  }
  if (item.kind === "pranayama" && !item.rhythm) {
    errors.push(`${itemPath}.rhythm: falta el ritmo respiratorio`);
  }
  if (item.kind === "pranayama") {
    const rhythm = item.rhythm;
    if (
      !Number.isFinite(rhythm.inhale) || rhythm.inhale <= 0 ||
      !Number.isFinite(rhythm.exhale) || rhythm.exhale <= 0 ||
      (rhythm.hold !== undefined && (!Number.isFinite(rhythm.hold) || rhythm.hold < 0))
    ) {
      errors.push(`${itemPath}.rhythm: proporción vacía o inválida`);
    }
    for (const level of ["beginner", "intermediate", "advanced"] as const) {
      validateLocalizedPair(item.practiceByLevel[level], `${itemPath}.practiceByLevel.${level}`);
    }
    if (["kapalabhati", "bhastrika", "kumbhaka"].includes(item.id) && !item.requiresInstructor) {
      errors.push(`${itemPath}: la técnica intensa o con retención debe requerir instructor`);
    }
  }
  if (item.kind === "mantra" && !item.sanskrit.trim()) {
    errors.push(`${itemPath}.sanskrit: texto tradicional vacío`);
  }
  if (item.kind === "mantra" && !item.transliteration.trim()) {
    errors.push(`${itemPath}.transliteration: transliteración vacía`);
  }
  if (item.kind === "anatomy") {
    validateArray(item.asanaIds, `${itemPath}.asanaIds`);
    for (const id of item.asanaIds) {
      if (!posesById[id]) errors.push(`${itemPath}: no existe la postura vinculada ${id}`);
    }
  }
  if (item.kind === "kriya" && !item.instructionSteps && !item.steps) {
    errors.push(`${itemPath}: faltan pasos de estudio o instrucciones`);
  }
  if (item.kind === "ayurveda") {
    for (const id of item.sequenceIds ?? []) {
      if (!sequenceById.has(id)) errors.push(`${itemPath}: no existe la secuencia vinculada ${id}`);
    }
  }
  for (const id of item.relatedIds) {
    if (!contentById.has(id)) errors.push(`${itemPath}: no existe la ficha relacionada ${id}`);
  }
  if (item.kind === "asana") {
    for (const id of [...item.preparatoryPoseIds, ...item.counterposeIds]) {
      if (!posesById[id]) errors.push(`${itemPath}: no existe la postura relacionada ${id}`);
    }
  }
}

function practiceSeconds(activities: Pick<PlannerDay | RoutineSuggestion, "sequenceIds" | "pranayamaIds" | "meditationIds">): number {
  return [
    ...activities.sequenceIds.map((id) => sequenceById.get(id)?.duration ?? 0),
    ...activities.pranayamaIds.map((id) => contentById.get(id)?.duration ?? 0),
    ...activities.meditationIds.map((id) => contentById.get(id)?.duration ?? 0),
  ].reduce((total, duration) => total + duration, 0);
}

function validatePracticeReferences(
  activities: Pick<PlannerDay | RoutineSuggestion, "sequenceIds" | "pranayamaIds" | "meditationIds">,
  recordPath: string,
): void {
  for (const id of activities.sequenceIds) {
    if (!sequenceById.has(id)) errors.push(`${recordPath}: no existe la secuencia ${id}`);
  }
  for (const id of activities.pranayamaIds) {
    if (contentById.get(id)?.kind !== "pranayama") {
      errors.push(`${recordPath}: ${id} no identifica una técnica de Pranayama`);
    }
  }
  for (const id of activities.meditationIds) {
    if (contentById.get(id)?.kind !== "meditation") {
      errors.push(`${recordPath}: ${id} no identifica una práctica de meditación`);
    }
  }
}

if (sections.length !== 11) {
  errors.push(`secciones: se esperaban las 11 secciones definidas y hay ${sections.length}`);
}
const seenSectionIds = new Set<string>();
for (const section of sections) {
  if (!sectionIds.has(section.id)) errors.push(`sección ${section.id}: ID fuera del esquema`);
  if (seenSectionIds.has(section.id)) errors.push(`sección ${section.id}: ID duplicado`);
  seenSectionIds.add(section.id);
  validateTextValues(section, `sección ${section.id}`);
  validateLocalizedPair(section.name, `sección ${section.id}.name`);
  validateLocalizedPair(section.description, `sección ${section.id}.description`);
  if (!section.icon.trim() || !section.color.trim()) {
    errors.push(`sección ${section.id}: faltan icono o color`);
  }
}

const seenContentIds = new Set<string>();
for (const item of catalog) {
  if (seenContentIds.has(item.id)) errors.push(`ficha ${item.id}: ID duplicado en el catálogo`);
  seenContentIds.add(item.id);
  validateTextValues(item, `ficha ${item.id}`);
  validateCatalogItem(item);
  validateImageRoute(item.image, `ficha ${item.id}.image`);
  validateImageRoute(item.thumbnail, `ficha ${item.id}.thumbnail`);
}

for (const pose of poses) {
  if (pose.image !== `/images/poses/${pose.id}.svg`) {
    errors.push(`postura ${pose.id}: la imagen debe coincidir con el ID`);
  }
  for (const language of ["es", "en"] as const) {
    if (!pose.instructionSteps[language]?.length) {
      errors.push(`postura ${pose.id}: faltan instrucciones en ${language}`);
    }
  }
}

const coverPoses: Partial<Record<string, string>> = illustrations.covers;

if (sequenceById.size !== sequences.length) errors.push("secuencias: hay IDs duplicados");
for (const sequence of sequences) {
  validateId(sequence.id, `secuencia ${sequence.id}`);
  validateTextValues(sequence, `secuencia ${sequence.id}`);
  validateLocalizedPair(sequence.name, `secuencia ${sequence.id}.name`);
  validateLocalizedPair(sequence.description, `secuencia ${sequence.id}.description`);
  validateLocalizedPair(sequence.objective, `secuencia ${sequence.id}.objective`);
  validateImageRoute(sequence.image, `secuencia ${sequence.id}.image`);
  if (sequence.image !== `/images/sequences/${sequence.id}.svg`) {
    errors.push(`secuencia ${sequence.id}: la portada debe coincidir con el ID`);
  }
  const coverPose = coverPoses[sequence.id];
  if (!sequence.steps.some((step) => step.contentId === coverPose)) {
    errors.push(`secuencia ${sequence.id}: la portada debe representar uno de sus pasos`);
  }

  const duration = validateSequenceDuration(sequence);
  if (!duration.valid) {
    errors.push(
      `secuencia ${sequence.id}: duración declarada ${duration.declaredSeconds}s, suma ${duration.calculatedSeconds}s`,
    );
  }
  for (const [index, step] of sequence.steps.entries()) {
    validateId(step.key, `secuencia ${sequence.id}, paso ${index + 1}.key`);
    if (!posesById[step.contentId]) {
      errors.push(
        `secuencia ${sequence.id}, paso ${index + 1}: no existe la postura ${step.contentId}`,
      );
    }
  }
}

for (const entry of schedule) {
  validateTextValues(entry, `horario ${entry.id}`);
  validateId(entry.id, `horario ${entry.id}`);
  if (!sectionIds.has(entry.section)) errors.push(`horario ${entry.id}: sección desconocida ${entry.section}`);
  if (!entry.days.length || entry.days.some((day) => !Number.isInteger(day) || day < 1 || day > 7)) {
    errors.push(`horario ${entry.id}: días vacíos o fuera del rango 1–7`);
  }
  const toMinutes = (time: string) => {
    const match = /^(\d{2}):(\d{2})$/.exec(time);
    return match ? Number(match[1]) * 60 + Number(match[2]) : Number.NaN;
  };
  if (!(toMinutes(entry.end) > toMinutes(entry.time))) {
    errors.push(`horario ${entry.id}: hora inicial o final inválida`);
  }
}

const planIds = new Set<string>();
for (const plan of weeklyPracticePlans) {
  validateTextValues(plan, `plan semanal ${plan.id}`);
  validateId(plan.id, `plan semanal ${plan.id}`);
  if (planIds.has(plan.id)) errors.push(`plan semanal ${plan.id}: ID duplicado`);
  planIds.add(plan.id);
  validateLocalizedPair(plan.name, `plan semanal ${plan.id}.name`);
  validateLocalizedPair(plan.description, `plan semanal ${plan.id}.description`);
  validateLocalizedPair(plan.rhythm, `plan semanal ${plan.id}.rhythm`);
  if (plan.days.length !== 7 || new Set(plan.days.map((day) => day.day)).size !== 7) {
    errors.push(`plan semanal ${plan.id}: debe contener siete días únicos`);
  }
  for (const day of plan.days) {
    const dayPath = `plan semanal ${plan.id}, día ${day.day}`;
    if (!Number.isInteger(day.day) || day.day < 1 || day.day > 7) {
      errors.push(`${dayPath}: el día debe estar dentro del rango 1–7`);
    }
    validatePracticeReferences(day, dayPath);
    if (day.availableMinutes && practiceSeconds(day) > day.availableMinutes * 60) {
      errors.push(`${dayPath}: temporizadores superan la ventana de ${day.availableMinutes} min`);
    }
    if (day.rest && (day.sequenceIds.length || day.pranayamaIds.length)) {
      errors.push(`${dayPath}: un día de recuperación no debe incluir secuencia ni Pranayama`);
    }
  }
}

const seenRoutineWindows = new Set<string>();
const seenRoutineIds = new Set<string>();
for (const routine of routineSuggestions) {
  validateTextValues(routine, `rutina ${routine.id}`);
  validateId(routine.id, `rutina ${routine.id}`);
  if (seenRoutineIds.has(routine.id)) errors.push(`rutina ${routine.id}: ID duplicado`);
  seenRoutineIds.add(routine.id);
  const windowKey = `${routine.timeOfDay}-${routine.availableMinutes}`;
  if (seenRoutineWindows.has(windowKey)) errors.push(`rutina ${routine.id}: ventana duplicada ${windowKey}`);
  seenRoutineWindows.add(windowKey);
  validatePracticeReferences(routine, `rutina ${routine.id}`);
  if (practiceSeconds(routine) > routine.availableMinutes * 60) {
    errors.push(`rutina ${routine.id}: temporizadores superan la ventana de ${routine.availableMinutes} min`);
  }
}
for (const timeOfDay of timesOfDay) {
  for (const minutes of windows) {
    if (!seenRoutineWindows.has(`${timeOfDay}-${minutes}`)) {
      errors.push(`planificador: falta la rutina ${timeOfDay} de ${minutes} min`);
    }
  }
}

const meditationPlanIds = new Set<string>();
for (const plan of meditationPlans) {
  validateTextValues(plan, `plan de meditación ${plan.id}`);
  validateId(plan.id, `plan de meditación ${plan.id}`);
  if (meditationPlanIds.has(plan.id)) errors.push(`plan de meditación ${plan.id}: ID duplicado`);
  meditationPlanIds.add(plan.id);
  validateLocalizedPair(plan.name, `plan de meditación ${plan.id}.name`);
  validateLocalizedPair(plan.description, `plan de meditación ${plan.id}.description`);
  if (plan.days.length === 0) errors.push(`plan de meditación ${plan.id}: no tiene días`);
  const dayIds = new Set<number>();
  for (const day of plan.days) {
    if (!Number.isSafeInteger(day.day) || day.day < 1 || dayIds.has(day.day)) {
      errors.push(`plan de meditación ${plan.id}: día inválido o duplicado (${day.day})`);
    }
    dayIds.add(day.day);
    if (!Number.isSafeInteger(day.minutes) || day.minutes <= 0) {
      errors.push(`plan de meditación ${plan.id}, día ${day.day}: duración inválida`);
    }
    validateLocalizedPair(day.focus, `plan de meditación ${plan.id}, día ${day.day}.focus`);
    validateLocalizedPair(day.reflection, `plan de meditación ${plan.id}, día ${day.day}.reflection`);
    if (contentById.get(day.practiceId)?.kind !== "meditation") {
      errors.push(`plan de meditación ${plan.id}, día ${day.day}: no existe la práctica ${day.practiceId}`);
    }
  }
}

for (const card of flashcards) {
  validateTextValues(card, `tarjeta ${card.id}`);
  validateId(card.id, `tarjeta ${card.id}`);
  validateLocalizedPair(card.front, `tarjeta ${card.id}.front`);
  validateLocalizedPair(card.back, `tarjeta ${card.id}.back`);
}
for (const question of quizQuestions) {
  validateTextValues(question, `pregunta ${question.id}`);
  validateId(question.id, `pregunta ${question.id}`);
  validateLocalizedPair(question.question, `pregunta ${question.id}.question`);
  validateLocalizedPair(question.explanation, `pregunta ${question.id}.explanation`);
  if (question.options.length < 2 || question.correct < 0 || question.correct >= question.options.length) {
    errors.push(`pregunta ${question.id}: opciones vacías o respuesta correcta fuera de rango`);
  }
  question.options.forEach((option, index) => {
    validateLocalizedPair(option, `pregunta ${question.id}.options[${index}]`);
  });
}

if (errors.length) {
  console.error(`Se encontraron ${errors.length} problema(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Contenido válido: ${sections.length} secciones, ${sequences.length} secuencias, ${poses.length} posturas, ${catalog.length} fichas, ${meditationPlans.length} planes de meditación, ${flashcards.length} tarjetas y ${quizQuestions.length} preguntas; campos, referencias, duraciones e imágenes locales verificados.`,
  );
}
