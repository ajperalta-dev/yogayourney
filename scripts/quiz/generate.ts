import { mkdirSync, writeFileSync } from "node:fs";
import { buildHatha } from "./build-hatha";
import { validateBank } from "./validate-bank";

const unit = process.argv[2] ?? "hatha";
if (unit !== "hatha") throw new Error("This batch supports Hatha only; other units require their own editorial batch.");
const bank = buildHatha();
const { errors } = validateBank(bank);
if (errors.length) throw new Error(errors.join("\n"));
mkdirSync("src/content/path/generated", { recursive: true });
writeFileSync(`src/content/path/generated/${unit}.json`, JSON.stringify(bank, null, 2) + "\n");
console.log(`Generado: ${unit}; ${bank.unit.lessons.length} lecciones; ${bank.exercises.length} ejercicios. Sin contenido en consola.`);
