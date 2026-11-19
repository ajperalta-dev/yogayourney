import { itemsFor } from "../catalog";
import { sections } from "../sections";
import type { SectionId } from "@/lib/models";
import type { Exercise, Unit } from "@/lib/path/models";
import { l } from "@/lib/utils";
export function buildUnit(id: SectionId): { unit: Unit; exercises: Exercise[] } {
  const section = sections.find(s => s.id === id)!;
  const items = itemsFor(id);
  const exercises: Exercise[] = [];
  const lessons: Unit["lessons"] = [];
  // Recognition exercises derive exclusively from existing names and summaries.
  if (items.length >= 8) {
    const count = Math.ceil(items.length / 12);
    const size = Math.ceil(items.length / count);
    for (let n = 0; n < count; n++) {
      const selected = items.slice(n * size, (n + 1) * size);
      while (selected.length < 8) selected.push(items[selected.length % items.length]);
      const lessonId = `${id}-recognition-${n + 1}`;
      const ids: string[] = [];
      selected.forEach((item, i) => {
        const exerciseId = `${lessonId}-${i + 1}`;
        const distractors = items.filter(x => x.id !== item.id && x.name.es !== item.name.es && x.name.en !== item.name.en).slice(0, 3);
        const correct = i % (distractors.length + 1);
        const options = distractors.map(x => x.name);
        options.splice(correct, 0, item.name);
        exercises.push({ id: exerciseId, unitId: id, lessonId, type: "multiple-choice", difficulty: 1, prompt: l(`¿Qué ficha corresponde a esta descripción? ${item.summary.es}`, `Which entry matches this description? ${item.summary.en}`), options, correct, explanation: item.summary, contentId: item.id });
        ids.push(exerciseId);
      });
      lessons.push({ id: lessonId, unitId: id, name: l(`${section.name.es} · Reconocer conceptos ${n + 1}`, `${section.name.en} · Recognizing concepts ${n + 1}`), minutes: 4, exerciseIds: ids });
    }
  }
  return { unit: { id, name: section.name, lessons }, exercises };
}
