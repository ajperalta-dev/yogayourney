import { itemsFor, byId } from "../../src/content/catalog";
import { sequences } from "../../src/content/sequences";
import { sections } from "../../src/content/sections";
import type { Asana, Localized } from "../../src/lib/models";
import type { Exercise, ExerciseBase, ExerciseImage, Lesson } from "../../src/lib/path/models";
import { l, normalize } from "../../src/lib/utils";
import { curatedHatha } from "./curated-hatha";
import type { QuestionBank, Source } from "./model";

// Stable seeds make committed output reproducible, independent of filesystem order.
function hash(value: string) {
  let n = 2166136261;
  for (const char of value) n = Math.imul(n ^ char.charCodeAt(0), 16777619);
  return n >>> 0;
}
function shuffle<T>(values: T[], seed: string): T[] {
  const output = [...values]; let state = hash(seed) || 1;
  for (let i = output.length - 1; i > 0; i--) {
    state ^= state << 13; state ^= state >>> 17; state ^= state << 5;
    const j = (state >>> 0) % (i + 1);
    [output[i], output[j]] = [output[j], output[i]];
  }
  if (output.length > 1 && output.every((item, i) => item === values[i])) output.push(output.shift()!);
  return output;
}
const distinct = (values: Localized[]) => (["es", "en"] as const).every(language => new Set(values.map(x => normalize(x[language]))).size === values.length);

export function buildHatha(): QuestionBank {
  const poses = itemsFor("hatha").filter((item): item is Asana => item.kind === "asana").sort((a, b) => a.id.localeCompare(b.id));
  const sources: Record<string, Source> = {};
  const exercises: Exercise[] = [];
  const lessons: Lesson[] = [];
  const section = sections.find(item => item.id === "hatha")!;
  let currentLesson = "";
  function lesson(topic: string, es: string, en: string) {
    currentLesson = `hatha-${topic}`;
    lessons.push({ id: currentLesson, unitId: "hatha", name: l(es, en), minutes: 4, exerciseIds: [] });
  }
  function base(pose: Asana, topic: string, prompt: Localized, explanation: Localized): ExerciseBase {
    return { id: `${currentLesson}-${topic}-${pose.id}`, unitId: "hatha", lessonId: currentLesson, difficulty: 1, contentId: pose.id, prompt, explanation };
  }
  function add(exercise: Exercise, contentIds: string[], field: string, review: Source["review"] = [], sequenceId?: string) {
    exercises.push(exercise); lessons.at(-1)!.exerciseIds.push(exercise.id);
    sources[exercise.id] = { mode: "generated", contentIds: [...new Set(contentIds)], field, review, ...(sequenceId ? { sequenceId } : {}) };
  }
  function pool(pose: Asana, key: (item: Asana) => Localized) {
    // Same body-posture category where possible, otherwise same asana library.
    const all = shuffle(poses.filter(item => item.id !== pose.id), pose.id);
    const ordered = [...all.filter(item => item.categories.some(c => pose.categories.includes(c))), ...all];
    const result = [pose];
    for (const item of ordered) if (!result.some(x => x.id === item.id) && distinct([...result, item].map(key))) {
      result.push(item); if (result.length === 4) return shuffle(result, `options:${pose.id}`);
    }
    throw new Error(`Insufficient distinct asana distractors: ${pose.id}`);
  }
  const sanskrit = (item: Asana) => l(item.sanskrit!, item.sanskrit!);
  function image(pose: Asana): ExerciseImage {
    const clean = (text: string, name: string) => text.replaceAll(name, "…").split(/[.!?]/u)[0].trim();
    return { src: pose.image, alt: l(`Ilustración: ${clean(pose.instructions.es, pose.name.es)}`, `Illustration: ${clean(pose.instructions.en, pose.name.en)}`) };
  }
  function names(pose: Asana, kind: "multiple-choice" | "fill-blank") {
    const values = pool(pose, kind === "multiple-choice" ? item => item.name : sanskrit);
    const prompt = kind === "multiple-choice" ? l(`¿Qué nombre corresponde a «${pose.sanskrit}» en esta biblioteca?`, `Which name corresponds to “${pose.sanskrit}” in this library?`) : l(`Completá la asociación: ${pose.name.es} → ___.`, `Complete the association: ${pose.name.en} → ___.`);
    const exercise: Exercise = { ...base(pose, kind, prompt, l(`${pose.sanskrit}: ${pose.name.es}.`, `${pose.sanskrit}: ${pose.name.en}.`)), type: kind, options: values.map(kind === "multiple-choice" ? item => item.name : sanskrit), correct: values.findIndex(x => x.id === pose.id) };
    add(exercise, values.map(x => x.id), "sanskrit/name");
  }
  function pairs(group: Asana[], topic: string, benefits = false) {
    const left = group.map(p => ({ id: p.id, label: benefits ? p.name : sanskrit(p) }));
    const right = shuffle(group.map(p => ({ id: `meaning-${p.id}`, label: benefits ? p.benefits : p.name })), topic);
    if (!distinct(right.map(x => x.label))) throw new Error(`Duplicate pair meanings: ${topic}`);
    add({ ...base(group[0], topic, benefits ? l("Uní cada postura con el resumen de beneficios de SU ficha; no son beneficios exclusivos.", "Match each pose to the benefit summary in ITS entry; benefits are not exclusive.") : l("Uní cada nombre sánscrito con su traducción en esta biblioteca.", "Match each Sanskrit name with its translation in this library."), l("Estas asociaciones reproducen los campos de las fichas indicadas.", "These associations reproduce fields from the referenced entries.")), type: "matching", left: shuffle(left, `${topic}:left`), right, matches: Object.fromEntries(group.map(p => [p.id, `meaning-${p.id}`])) }, group.map(p => p.id), benefits ? "benefits" : "sanskrit/name", benefits ? ["benefits"] : []);
  }

  lesson("vocabulary", "Hatha · Nombres y significado", "Hatha · Names and meanings");
  poses.slice(0, 4).forEach(p => names(p, "multiple-choice"));
  poses.slice(4, 8).forEach(p => names(p, "fill-blank"));
  pairs(poses.slice(8, 12), "pairs-1"); pairs(poses.slice(12, 16), "pairs-2");

  lesson("images", "Hatha · Reconocer posturas", "Hatha · Recognizing poses");
  for (const [i, pose] of poses.slice(8, 18).entries()) {
    const values = pool(pose, p => p.name);
    if (i < 4) add({ ...base(pose, "image", l("¿Qué postura muestra la ilustración?", "Which pose does the illustration show?"), l(`La ilustración está asociada a ${pose.name.es}.`, `The illustration is associated with ${pose.name.en}.`)), type: "image-to-name", image: image(pose), options: values.map(p => p.name), correct: values.findIndex(p => p.id === pose.id) }, values.map(p => p.id), "image/name");
    else if (i < 8) add({ ...base(pose, "name", l(`Elegí la ilustración de ${pose.name.es}.`, `Choose the illustration of ${pose.name.en}.`), l(`La imagen correcta corresponde a la ficha ${pose.name.es}.`, `The correct image belongs to the ${pose.name.en} entry.`)), type: "name-to-image", optionImages: values.map(image), options: values.map((_, n) => l(`Imagen ${n + 1}`, `Image ${n + 1}`)), correct: values.findIndex(p => p.id === pose.id) }, values.map(p => p.id), "name/image");
    else {
      const claimed = i % 2 ? values.find(p => p.id !== pose.id)! : pose;
      add({ ...base(pose, "image-claim", l(`¿La imagen está asociada a ${claimed.name.es} en esta biblioteca?`, `Is this image associated with ${claimed.name.en} in this library?`), l(`La imagen pertenece a ${pose.name.es}.`, `The image belongs to ${pose.name.en}.`)), type: "true-false", image: image(pose), options: [l("Verdadero", "True"), l("Falso", "False")], correct: claimed.id === pose.id ? 0 : 1 }, [pose.id, claimed.id], "image/name");
    }
  }

  lesson("sequence-study", "Hatha · Orden de la práctica", "Hatha · Practice order");
  const hathaSequences = sequences.filter(s => s.style === "hatha").sort((a, b) => a.id.localeCompare(b.id));
  if (!hathaSequences.length) throw new Error("Missing Hatha sequences");
  for (let i = 0; i < 5; i++) {
    const sequence = hathaSequences[i % hathaSequences.length];
    const offset = i < hathaSequences.length ? 0 : Math.max(0, sequence.steps.length - 4);
    const steps = sequence.steps.slice(offset, offset + 4);
    const group = steps.map(step => byId[step.contentId] as Asana);
    const correct = group.map((_, n) => `step-${n}`);
    add({ ...base(group[0], `steps-${i}`, l(`En «${sequence.name.es}», ordená los pasos ${offset + 1}–${offset + 4}. Estudiamos esta secuencia, no un orden universal.`, `In “${sequence.name.en}”, order steps ${offset + 1}–${offset + 4}. This is a specific sequence, not a universal order.`), l("El orden es el registrado en la secuencia de práctica enlazada.", "This is the order recorded in the referenced practice sequence.")), type: "sequence-order", tokens: shuffle(group.map((p, n) => ({id: correct[n], label: p.name})), `seq:${i}`), correctOrder: { es: correct, en: correct } }, group.map(p => p.id), "steps", [], sequence.id);
  }
  const shortNames = poses.filter(p => (["es", "en"] as const).every(language => {
    const words = p.name[language].split(/\s+/u); return words.length >= 2 && words.length <= 8 && new Set(words.map(normalize)).size === words.length;
  })).slice(0, 3);
  if (shortNames.length !== 3) throw new Error("Insufficient unambiguous short translations");
  for (const pose of shortNames) {
    const words = (language: "es" | "en") => pose.name[language].split(/\s+/u).map((word, i) => ({ id: `word-${i}`, label: l(word, word) }));
    const es = words("es"), en = words("en");
    add({ ...base(pose, "words", l(`Ordená la traducción registrada de «${pose.sanskrit}».`, `Arrange this library's translation of “${pose.sanskrit}”.`), pose.name), type: "word-order", tokens: [], tokensByLanguage: { es: shuffle(es, pose.id), en: shuffle(en, pose.id) }, correctOrder: { es: es.map(x => x.id), en: en.map(x => x.id) } }, [pose.id], "sanskrit/name");
  }
  for (const sequence of hathaSequences.slice(0, 2)) {
    const pose = byId[sequence.steps[0].contentId] as Asana;
    const values = pool(pose, p => p.name);
    add({ ...base(pose, `opening-${sequence.id}`, l(`¿Qué postura abre «${sequence.name.es}» en esta app?`, `Which pose opens “${sequence.name.en}” in this app?`), l(`Esta secuencia comienza con ${pose.name.es}.`, `This sequence begins with ${pose.name.en}.`)), type: "multiple-choice", options: values.map(p => p.name), correct: values.findIndex(p => p.id === pose.id) }, values.map(p => p.id), "steps[0]", [], sequence.id);
  }

  lesson("relationships", "Hatha · Relaciones de las fichas", "Hatha · Entry relationships");
  const counters = poses.filter(p => p.counterposeIds.length === 1 && poses.some(x => x.id === p.counterposeIds[0]));
  if (counters.length < 6) throw new Error("Insufficient canonical counterpose links");
  counters.slice(0, 6).forEach((pose, i) => {
    const target = byId[pose.counterposeIds[0]] as Asana;
    const options = pool(target, p => p.name);
    const why = l(`La ficha ${pose.name.es} enlaza ${target.name.es} como contrapostura. Es una relación del catálogo, no una prescripción individual.`, `The ${pose.name.en} entry links ${target.name.en} as a counterpose. This is a catalog relationship, not an individual prescription.`);
    if (i < 4) add({ ...base(pose, "counterpose", l(`Según el enlace de la ficha ${pose.name.es}, ¿cuál es su contrapostura?`, `According to the link in the ${pose.name.en} entry, which is its counterpose?`), why), type:"multiple-choice", options:options.map(p=>p.name),correct:options.findIndex(p=>p.id===target.id)},[pose.id,...options.map(p=>p.id)],"counterposeIds",["safety"]);
    else {
      const levels = { beginner:l("principiante","beginner"), intermediate:l("intermedio","intermediate"), advanced:l("avanzado","advanced") };
      const claimed = i % 2 ? (pose.level === "beginner" ? "intermediate" : "beginner") : pose.level;
      add({ ...base(pose,"level-claim",l(`¿Esta biblioteca etiqueta ${pose.name.es} con nivel ${levels[claimed].es}?`,`Does this library label ${pose.name.en} as ${levels[claimed].en}?`),l(`El nivel registrado es ${levels[pose.level].es}. Es una clasificación del catálogo, no una valoración individual.`,`The recorded level is ${levels[pose.level].en}. This is a catalog classification, not an individual assessment.`)),type:"true-false",options:[l("Verdadero","True"),l("Falso","False")],correct:claimed===pose.level?0:1},[pose.id],"level");
    }
  });
  pairs(poses.slice(0,4), "benefits-1", true); pairs(poses.slice(4,8), "benefits-2", true);
  for (const [i, pose] of poses.slice(18,20).entries()) {
    if (i === 1) {
      const linked = poses.find(p => p.anatomyIds.length === 1)!;
      const target = byId[linked.anatomyIds[0]];
      const anatomy = shuffle(Object.values(byId).filter(item => item.kind === "anatomy" && !linked.anatomyIds.includes(item.id)), "anatomy-options").slice(0,3);
      const options = shuffle([target, ...anatomy], "anatomy-key");
      add({ ...base(linked,"anatomy-link",l(`¿A qué ficha de anatomía enlaza ${linked.name.es} en esta biblioteca?`,`Which anatomy entry does ${linked.name.en} link to in this library?`),l(`La ficha enlazada es ${target.name.es}. No implica que sea la única región implicada.`,`The linked entry is ${target.name.en}. This does not mean it is the only region involved.`)),type:"multiple-choice",options:options.map(p=>p.name),correct:options.findIndex(p=>p.id===target.id)},[linked.id,...options.map(p=>p.id)],"anatomyIds");
      continue;
    }
    const category = pose.categories.find(category => poses.filter(p=>p.categories.includes(category)).length >= 3);
    if (!category) throw new Error(`Insufficient category group ${pose.id}`);
    const insiders = poses.filter(p=>p.categories.includes(category)).slice(0,3);
    const outsider = poses.find(p=>!p.categories.includes(category))!;
    const options = shuffle([...insiders, outsider], `odd:${i}`);
    add({ ...base(pose,`odd-${i}`,l(`¿Qué ficha NO lleva la categoría «${category}» en esta biblioteca?`,`Which entry does NOT carry the “${category}” category in this library?`),l(`La clasificación de esta biblioteca no incluye ${outsider.name.es} en «${category}». Otras escuelas pueden clasificar de otro modo.`,`This library does not classify ${outsider.name.en} under “${category}”. Other schools may categorize differently.`)),type:"odd-one-out",options:options.map(p=>p.name),correct:options.findIndex(p=>p.id===outsider.id)},options.map(p=>p.id),"categories");
  }

  for (const topic of ["teaching", "safety"] as const) {
    lesson(topic, topic === "teaching" ? "Hatha · Enseñar con opciones" : "Hatha · Seguridad y alcance", topic === "teaching" ? "Hatha · Teaching with options" : "Hatha · Safety and scope");
    for (const exercise of curatedHatha(topic)) {
      add(exercise, [exercise.contentId], "curated teaching scenario", topic === "safety" ? ["safety"] : []);
      sources[exercise.id].mode = "curated";
    }
  }
  return { version: 1, unit: { id: "hatha", name: section.name, lessons }, exercises, sources };
}
