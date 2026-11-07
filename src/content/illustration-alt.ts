import type { Localized } from "@/lib/models";
import illustrations from "./illustrations.json";

const poseLabels: Partial<Record<string, Localized>> = illustrations.poses;
const coverPoses: Partial<Record<string, string>> = illustrations.covers;

export function illustrationAlt(source: string): Localized | undefined {
  const id = source.split("/").at(-1)?.replace(/(?:-thumb)?\.(?:svg|webp)$/, "");
  if (!id) return;
  if (id === "study" || id === "journey") return poseLabels.sukhasana;
  const poseId = source.startsWith("/images/sequences/") ? coverPoses[id] : id;
  return poseId ? poseLabels[poseId] : undefined;
}
