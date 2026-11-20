import type { Language } from "../models";
import type { Exercise, ExerciseResponse, OrderExercise } from "./models";

export const orderTokens = (exercise: OrderExercise, language: Language) => exercise.tokensByLanguage?.[language] ?? exercise.tokens;

/** Reject malformed banks before an exercise can award progress. */
export function validExercise(exercise: Exercise): boolean {
  const localized = (text: { es: string; en: string }) => !!text.es.trim() && !!text.en.trim();
  if (!localized(exercise.prompt) || !localized(exercise.explanation)) return false;
  if (exercise.type === "flashcard") return !!exercise.flashcardId;
  if (exercise.type === "matching") {
    const left = exercise.left.map(item => item.id), right = exercise.right.map(item => item.id);
    return left.length >= 2 && left.length === right.length && new Set(left).size === left.length && new Set(right).size === right.length &&
      exercise.left.every(item => localized(item.label)) && exercise.right.every(item => localized(item.label)) &&
      left.every(id => right.includes(exercise.matches[id])) && new Set(left.map(id => exercise.matches[id])).size === left.length;
  }
  if (exercise.type === "sequence-order" || exercise.type === "word-order") {
    return (["es", "en"] as const).every(language => {
      const tokens = orderTokens(exercise, language), ids = tokens.map(item => item.id), order = exercise.correctOrder[language];
      return ids.length >= 2 && new Set(ids).size === ids.length && tokens.every(item => localized(item.label)) && order.length === ids.length && new Set(order).size === ids.length && order.every(id => ids.includes(id));
    });
  }
  if (!("options" in exercise)) return false;
  if (exercise.options.length !== (exercise.type === "true-false" ? 2 : 4) || !exercise.options.every(localized) || !Number.isInteger(exercise.correct) || !exercise.options[exercise.correct]) return false;
  if (exercise.type === "image-to-name" && (!exercise.image?.src.startsWith("/images/") || !localized(exercise.image.alt))) return false;
  if (exercise.type === "name-to-image" && (exercise.optionImages?.length !== 4 || !exercise.optionImages.every(image => image.src.startsWith("/images/") && localized(image.alt)))) return false;
  return true;
}

export function isResponseComplete(exercise: Exercise, response: ExerciseResponse, language: Language): boolean {
  if (exercise.type === "matching") {
    return typeof response === "object" && !Array.isArray(response) &&
      exercise.left.every(item => exercise.right.some(right => right.id === response[item.id])) &&
      new Set(Object.values(response)).size === exercise.left.length;
  }
  if (exercise.type === "sequence-order" || exercise.type === "word-order") {
    return Array.isArray(response) && response.length === exercise.correctOrder[language].length &&
      new Set(response).size === response.length && response.every(id => orderTokens(exercise, language).some(token => token.id === id));
  }
  return "options" in exercise && typeof response === "number" && Number.isInteger(response) && response >= 0 && response < exercise.options.length;
}

export function gradeExercise(exercise: Exercise, response: ExerciseResponse, language: Language): boolean {
  if (!validExercise(exercise)) return false;
  if (!isResponseComplete(exercise, response, language)) return false;
  if (exercise.type === "matching") return exercise.left.every(item => (response as Record<string, string>)[item.id] === exercise.matches[item.id]);
  if (exercise.type === "sequence-order" || exercise.type === "word-order") return exercise.correctOrder[language].every((id, index) => (response as string[])[index] === id);
  return "correct" in exercise && response === exercise.correct;
}
