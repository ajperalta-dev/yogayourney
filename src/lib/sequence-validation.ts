import type { Sequence } from "./models";

export type SequenceDurationValidation = {
  valid: boolean;
  declaredSeconds: number;
  calculatedSeconds: number;
};

/** Confirms that the declared total equals the ordered steps' timer durations. */
export function validateSequenceDuration(
  sequence: Pick<Sequence, "duration" | "steps">,
): SequenceDurationValidation {
  const declaredSeconds =
    typeof sequence.duration === "number" ? sequence.duration : Number.NaN;
  const steps = Array.isArray(sequence.steps) ? sequence.steps : [];
  const durations = steps.map((step) => step?.duration);
  const validSteps =
    durations.length > 0 &&
    durations.every(
      (duration) =>
        typeof duration === "number" &&
        Number.isSafeInteger(duration) &&
        duration > 0,
    );
  const calculatedSeconds = validSteps
    ? durations.reduce((total, duration) => total + duration, 0)
    : Number.NaN;
  return {
    valid:
      validSteps &&
      Number.isSafeInteger(declaredSeconds) &&
      Number.isSafeInteger(calculatedSeconds) &&
      declaredSeconds === calculatedSeconds,
    declaredSeconds,
    calculatedSeconds,
  };
}
