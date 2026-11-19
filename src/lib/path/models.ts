import type { Localized, SectionId } from "../models";
export interface Exercise {
  id: string; unitId: SectionId; lessonId: string;
  type: "multiple-choice"; difficulty: 1 | 2 | 3;
  prompt: Localized; options: Localized[]; correct: number;
  explanation: Localized; contentId: string;
}
export interface Lesson { id: string; unitId: SectionId; name: Localized; minutes: 3 | 4 | 5; exerciseIds: string[]; }
export interface Unit { id: SectionId; name: Localized; lessons: Lesson[]; }
export interface Session {
  id: string; lessonId: string; queue: string[]; total: number; mastered: string[];
  attempts: number; correct: number; mistakes: string[]; finished: boolean;
}
export interface NodeProgress { mastery: number; box: number; nextReview: string; }
export interface PathProgress {
  version: 1; rewardedSessions: string[]; completed: string[]; nodes: Record<string, NodeProgress>;
  xp: number; streak: number; dailyGoal: number; dailyXp: number;
  lastActivity: string | null; errors: Record<string, number>; legacyImported: boolean;
}
