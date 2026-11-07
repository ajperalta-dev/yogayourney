export type Language = "es" | "en";
export type Localized = { es: string; en: string };
export type LocalizedInstructionSteps = { es: string[]; en: string[] };
export type SectionId =
  | "schedule"
  | "ashtanga"
  | "hatha"
  | "yin"
  | "aerial"
  | "pranayama"
  | "mantras"
  | "anatomy"
  | "kriyas"
  | "meditation"
  | "ayurveda";
export type DetailGroup =
  "technique" | "anatomy" | "benefits" | "teaching" | "safety";
export type Field =
  | { label: Localized; text: Localized; group: DetailGroup }
  | {
      label: Localized;
      steps: LocalizedInstructionSteps;
      group: DetailGroup;
    };
export interface ContentBase {
  id: string;
  name: Localized;
  sanskrit?: string;
  summary: Localized;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  image: string;
  thumbnail: string;
  tags: string[];
  fields: Field[];
  relatedIds: string[];
  duration: number;
  breathing: Localized;
  safety: Localized;
  studyOnly?: boolean;
}
export interface PoseBase extends Omit<ContentBase, "sanskrit"> {
  /** Null is explicit for supported poses without a traditional Sanskrit name. */
  sanskrit: string | null;
  instructionSteps: LocalizedInstructionSteps;
  commonMistakes: Localized;
  modifications: Localized;
  contraindications: Localized;
  /** Optional preferred breath count; duration remains the timer value in seconds. */
  breaths?: number;
}
export interface Asana extends PoseBase {
  kind: "asana";
  categories: string[];
  instructions: Localized;
  hold: Localized;
  drishti: Localized;
  anatomyIds: string[];
  benefits: Localized;
  teachingCues: Localized;
  preparatoryPoseIds: string[];
  counterposeIds: string[];
  notes: Localized;
}
export interface YinPose extends PoseBase {
  kind: "yin";
  targetArea: Localized;
  meridians: Localized;
  entry: Localized;
  hold: Localized;
  exit: Localized;
  rebound: Localized;
  benefits: Localized;
  props: Localized;
}
export interface AerialPose extends PoseBase {
  kind: "aerial";
  hammockSetup: Localized;
  height: Localized;
  fabricContacts: Localized;
  startingPosition: Localized;
  entry: Localized;
  finalPosition: Localized;
  exit: Localized;
  benefits: Localized;
  muscles: Localized;
  precautions: Localized;
  spotterRequired: boolean;
  progressions: Localized;
  regressions: Localized;
  teachingCues: Localized;
}
export interface PranayamaTechnique extends ContentBase {
  kind: "pranayama";
  objective: Localized;
  preparation: Localized;
  instructions: Localized;
  rhythm: { inhale: number; exhale: number };
  benefits: Localized;
  contraindications: Localized;
  notes: Localized;
}
export interface Mantra extends ContentBase {
  kind: "mantra";
  sanskrit: string;
  transliteration: string;
  translation: Localized;
  meaning: Localized;
  context: Localized;
  audio?: string;
}
export interface AnatomyTopic extends ContentBase {
  kind: "anatomy";
  movements: Localized;
  muscles: Localized;
  asanaIds: string[];
}
export interface Kriya extends ContentBase {
  kind: "kriya";
  description: Localized;
  objective: Localized;
  materials: Localized;
  preparation: Localized;
  steps: Localized;
  frequency: Localized;
  benefits: Localized;
  risks: Localized;
  contraindications: Localized;
  precautions: Localized;
}
export interface MeditationPractice extends ContentBase {
  kind: "meditation";
  objective: Localized;
  preparation: Localized;
  instructions: Localized;
  posture: Localized;
  benefits: Localized;
  difficulties: Localized;
  tips: Localized;
}
export interface AyurvedaTopic extends ContentBase {
  kind: "ayurveda";
  concept: Localized;
  tradition: Localized;
  reflection: Localized;
}
export type ContentItem =
  | Asana
  | YinPose
  | AerialPose
  | PranayamaTechnique
  | Mantra
  | AnatomyTopic
  | Kriya
  | MeditationPractice
  | AyurvedaTopic;
export type ClassStage =
  | "centering"
  | "pranayama"
  | "warm-up"
  | "asanas"
  | "peak-pose"
  | "cool-down"
  | "savasana"
  | "meditation";
export type SequenceStep = {
  key: string;
  /** Stable reference to the existing pose/content record; retained for saved data compatibility. */
  contentId: string;
  /** Timer duration in seconds; every step needs this for total-duration validation. */
  duration: number;
  /** Optional count of breath cycles used as a practice cue. */
  breaths?: number;
  stage: ClassStage;
};
export interface Sequence {
  id: string;
  name: Localized;
  description: Localized;
  style: "ashtanga" | "hatha" | "yin" | "aerial";
  level: "beginner" | "intermediate" | "advanced";
  /** Total duration in seconds; must equal the sum of all step durations. */
  duration: number;
  objective: Localized;
  image: string;
  /** Ordered pose/content references that make up the sequence. */
  steps: SequenceStep[];
  demo: boolean;
}
export interface ScheduleItem {
  id: string;
  time: string;
  end: string;
  name: Localized;
  section: SectionId;
  location: Localized;
  days: number[];
}
export interface Flashcard {
  id: string;
  category: string;
  front: Localized;
  back: Localized;
}
export interface QuizQuestion {
  id: string;
  category: string;
  question: Localized;
  options: Localized[];
  correct: number;
  explanation: Localized;
}
export interface UserNote {
  contentId: string;
  text: string;
  updatedAt: string;
}
export interface PersonalState {
  version: 1;
  language: Language;
  theme: "light" | "dark" | "system";
  favorites: string[];
  notes: Record<string, UserNote>;
  visited: Record<string, string>;
  lastPath: string;
  sessions: {
    id: string;
    sequenceId: string;
    completedAt: string;
    seconds: number;
  }[];
  quizzes: {
    id: string;
    score: number;
    total: number;
    date: string;
    category: string;
  }[];
  cards: Record<string, { reviewedAt: string; known: boolean }>;
  sequences: Sequence[];
}
