import { writeFileSync } from "node:fs";
import { readBanks, validateBank } from "./validate-bank";
import { gradeExercise, validExercise } from "../../src/lib/path/grading";
import { buildHatha } from "./build-hatha";
const banks = readBanks(), seen = new Set<string>(), errors: string[] = [];
const distribution: Record<string, unknown> = {};
for (const bank of banks) {
  if (bank.unit.id === "hatha" && JSON.stringify(bank) !== JSON.stringify(buildHatha())) errors.push("hatha: stale snapshot; regenerate from current sources");
  const result = validateBank(bank); errors.push(...result.errors); distribution[bank.unit.id] = result.distribution;
  for (const exercise of bank.exercises) {
    if (seen.has(exercise.id)) errors.push(`${exercise.id}: global duplicate`); seen.add(exercise.id);
    let valid = false; try { valid = validExercise(exercise); } catch { /* Already recorded by validateBank. */ }
    if (!valid) continue;
    const response = "correct" in exercise ? exercise.correct : exercise.type === "matching" ? exercise.matches : exercise.correctOrder.es;
    if (!gradeExercise(exercise, response, "es")) errors.push(`${exercise.id}: correct key rejected`);
    const en = "correctOrder" in exercise ? exercise.correctOrder.en : response;
    if (!gradeExercise(exercise, en, "en")) errors.push(`${exercise.id}: EN correct key rejected`);
  }
}
if (!banks.length) errors.push("No generated banks");
writeFileSync("scripts/quiz/coverage.json", JSON.stringify({ units: banks.length, exercises: seen.size, distribution, errors }, null, 2) + "\n");
const review = ["# Revisión docente del banco Camino", "", "Tanda actual: Hatha. Estado: pendiente de revisión docente; validación estructural no equivale a revisión clínica ni pedagógica.", "", "Comprobar ambigüedad, adecuación de distractores, precauciones, alcance docente y exactitud de las relaciones registradas. Aprobar/corregir por ID. Las respuestas incorrectas son distractores, no instrucciones.", ""];
for (const bank of banks) for (const exercise of bank.exercises) {
  const source = bank.sources[exercise.id];
  if (!source.review.length) continue;
  review.push(`## ${exercise.id}`, "", `- Estado: pendiente. Motivos: ${source.review.join(", ")}.`, `- Fuente: ${source.contentIds.join(", ")} · ${source.field}.`, `- ES: ${exercise.prompt.es}`, `- EN: ${exercise.prompt.en}`);
  if ("options" in exercise) exercise.options.forEach((option,i) => review.push(`- ${i === exercise.correct ? "Respuesta" : "Distractor"} ${i+1}: ${option.es} / ${option.en}`));
  else if (exercise.type === "matching") exercise.left.forEach(left => review.push(`- Asociación: ${left.label.es} → ${exercise.right.find(r=>r.id===exercise.matches[left.id])?.label.es}`));
  review.push(`- Explicación ES: ${exercise.explanation.es}`, `- Explanation EN: ${exercise.explanation.en}`, "");
}
review.push("## Cobertura y límites", "", "Sin preguntas de atribución histórica en esta tanda Hatha. Se añadirán al informe al trabajar las unidades pertinentes. No se inventan asociaciones de nivel/contraindicaciones ni datos que el catálogo no soporte inequívocamente.", "", "Las imágenes actuales proceden de assets locales y su anatomía debe comprobarse durante la revisión docente. No confundir reconocimiento de una ilustración con evaluación de una postura real.", "");
writeFileSync("scripts/quiz/QUIZ_REVIEW.md", review.join("\n"));
console.log(`Banco validado: ${banks.length} unidad(es), ${seen.size} ejercicios; ${errors.length} errores. Distribución en coverage.json; revisión en QUIZ_REVIEW.md.`);
if (errors.length) { console.log(errors.map(error => error.split(":")[0]).join(", ")); process.exitCode = 1; }
