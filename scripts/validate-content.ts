import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { catalog, poses, posesById } from "../src/content/catalog";
import { illustrationAlt } from "../src/content/illustration-alt";
import illustrations from "../src/content/illustrations.json";
import { sequences } from "../src/content/sequences";
import { validateSequenceDuration } from "../src/lib/sequence-validation";

const errors: string[] = [];
const placeholderPattern =
  /lorem\s+ipsum|placeholder|coming soon|replace me|sample text|draft content|insert text|\bTBD\b/i;
const publicDirectory = path.join(process.cwd(), "public");

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

for (const item of catalog) {
  validateTextValues(item, `ficha ${item.id}`);
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

for (const sequence of sequences) {
  validateTextValues(sequence, `secuencia ${sequence.id}`);
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
    if (!posesById[step.contentId]) {
      errors.push(
        `secuencia ${sequence.id}, paso ${index + 1}: no existe la postura ${step.contentId}`,
      );
    }
  }
}

if (errors.length) {
  console.error(`Se encontraron ${errors.length} problema(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Contenido válido: ${sequences.length} secuencias, ${poses.length} posturas, ${catalog.length} fichas e imágenes locales con descripciones.`,
  );
}
