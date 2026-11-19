import { catalog } from "../src/content/catalog";
import { philosophy } from "../src/content/philosophy";
import { sequences } from "../src/content/sequences";

const placeholder = /lorem\s+ipsum|placeholder|coming soon|replace me|sample text|draft content|\bTBD\b/i;
const devanagari = /[\u0900-\u097F]/u;
const iastEntry = /[\u0900-\u097F]+\s*—\s*[A-Za-zĀ-žṃṚṣāīūḍṅḥṭṇ]+/u;
const ids = new Set([...catalog.map((item) => item.id), ...sequences.map((item) => item.id)]);
const missingTranslations = new Set<string>();
const emptyFields = new Set<string>();
const placeholders = new Set<string>();
const brokenLinks = new Set<string>();
const missingIast = new Set<string>();
const badLength = new Set<string>();

function walk(value: unknown, itemId: string, path: string): void {
  if (typeof value === "string") {
    if (!value.trim()) emptyFields.add(itemId);
    if (placeholder.test(value)) placeholders.add(itemId);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((child, index) => walk(child, itemId, `${path}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  const record = value as Record<string, unknown>;
  if ("es" in record || "en" in record) {
    if (typeof record.es !== "string" || !record.es.trim() || typeof record.en !== "string" || !record.en.trim()) missingTranslations.add(itemId);
  }
  for (const [key, child] of Object.entries(record)) walk(child, itemId, `${path}.${key}`);
}

for (const item of philosophy) {
  walk(item, item.id, item.id);
  for (const linkedId of item.relatedIds) if (!ids.has(linkedId)) brokenLinks.add(item.id);

  for (const field of item.fields) {
    if (!("text" in field)) continue;
    if (field.label.es === "Términos clave" || field.label.en === "Key terms") {
      const entries = field.text.es.split(/[;,]/u).map((entry) => entry.trim()).filter(Boolean);
      if (entries.some((entry) => devanagari.test(entry) && !iastEntry.test(entry))) missingIast.add(item.id);
    }
    if (field.label.es === "Desarrollo" || field.label.en === "Study" || (item.id === "philosophy-sanskrit-glossary" && field.label.es === "Uso del glosario")) {
      for (const text of [field.text.es, field.text.en]) {
        const words = text.trim().split(/\s+/u).length;
        if (words < 150 || words > 400) badLength.add(item.id);
      }
    }
  }
  if (item.summary.es.length > 280 || item.summary.en.length > 280) badLength.add(item.id);
}

const totals = [missingTranslations, emptyFields, placeholders, brokenLinks, missingIast, badLength];
const issueCount = totals.reduce((sum, group) => sum + group.size, 0);
console.log(`Auditoría Filosofía: ${philosophy.length} fichas; ${issueCount} grupos con incidencias.`);
console.log(`Sin traducción: ${missingTranslations.size ? [...missingTranslations].join(", ") : "0"}; campos vacíos: ${emptyFields.size ? [...emptyFields].join(", ") : "0"}; placeholders: ${placeholders.size ? [...placeholders].join(", ") : "0"}.`);
console.log(`Enlaces inexistentes: ${brokenLinks.size ? [...brokenLinks].join(", ") : "0"}; términos sin IAST: ${missingIast.size ? [...missingIast].join(", ") : "0"}; fuera de longitud: ${badLength.size ? [...badLength].join(", ") : "0"}.`);
if (issueCount) process.exitCode = 1;
