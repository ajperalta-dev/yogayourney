import { Suspense } from "react";
import { ClassBuilder } from "@/components/class-builder";
import { catalog } from "@/content/catalog";
export const metadata = { title: "Class builder" };
export default function Page() {
  return (
    <Suspense fallback={<p>…</p>}>
      <ClassBuilder
        catalog={catalog.filter((c) =>
          ["asana", "yin", "aerial", "pranayama", "meditation"].includes(
            c.kind,
          ),
        )}
      />
    </Suspense>
  );
}
