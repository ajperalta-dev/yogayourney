import generated from "./generated/hatha.json";
import type { Exercise, Unit } from "@/lib/path/models";

// The generation command validates this committed snapshot before writing it.
export const bank = generated as unknown as { unit: Unit; exercises: Exercise[] };
