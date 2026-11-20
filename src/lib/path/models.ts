import type { Localized, SectionId } from "../models";
export interface ExerciseBase {
  id: string; unitId: SectionId; lessonId: string;
  difficulty: 1 | 2 | 3;
  prompt: Localized;
  explanation: Localized; contentId: string;
}
export interface ExerciseImage { src: string; alt: Localized; }
export interface ChoiceExercise extends ExerciseBase {
  type: "multiple-choice" | "true-false" | "fill-blank" | "odd-one-out" | "teacher-scenario" | "image-to-name" | "name-to-image";
  options: Localized[]; correct: number;
  image?: ExerciseImage;
  optionImages?: ExerciseImage[];
}
export interface PairExercise extends ExerciseBase {
  type: "matching";
  left: { id: string; label: Localized }[];
  right: { id: string; label: Localized }[];
  matches: Record<string, string>;
}
export interface OrderExercise extends ExerciseBase {
  type: "sequence-order" | "word-order";
  tokens: { id: string; label: Localized }[];
  /** Word counts may differ between the two translations. */
  tokensByLanguage?: { es: { id: string; label: Localized }[]; en: { id: string; label: Localized }[] };
  correctOrder: { es: string[]; en: string[] };
}
export type Exercise = ChoiceExercise | PairExercise | OrderExercise;
export type ExerciseResponse = number | string[] | Record<string, string>;
export interface Lesson { id: string; unitId: SectionId; name: Localized; minutes: 3 | 4 | 5; exerciseIds: string[]; checkpoint?: boolean; }
export interface Unit { id: SectionId; name: Localized; lessons: Lesson[]; }
export interface Session {
  seconds?: number;
  awardedSeconds?: number;
  awardedXp?: number;
  reviewOnly?: boolean;
  id: string; lessonId: string; queue: string[]; total: number; mastered: string[];
  attempts: number; correct: number; mistakes: string[]; finished: boolean;
}
export interface NodeProgress { mastery: number; box: number; nextReview: string; }
export interface PathProgress {
  game?: { correctAnswers: number; goal: { type: "minutes" | "lessons"; target: number }; days: Record<string, { seconds: number; lessons: number }>; frozenWeeks: string[]; badges: string[] };
  active?: Session;
  unlockedUnits?: string[];
  version: 1; rewardedSessions: string[]; completed: string[]; nodes: Record<string, NodeProgress>;
  xp: number; streak: number; dailyGoal: number; dailyXp: number;
  lastActivity: string | null; errors: Record<string, number>; legacyImported: boolean;
}
