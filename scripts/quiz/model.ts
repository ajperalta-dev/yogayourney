import type { Exercise, Unit } from "../../src/lib/path/models";
export interface Source {
  mode: "generated" | "curated";
  contentIds: string[];
  sequenceId?: string;
  field: string;
  review: ("safety" | "benefits" | "history")[];
}
export interface QuestionBank {
  version: 1;
  unit: Unit;
  exercises: Exercise[];
  sources: Record<string, Source>;
}
