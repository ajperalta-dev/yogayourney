import { Suspense } from "react";
import { CustomPractice } from "@/components/class-builder";
import { catalog } from "@/content/catalog";
export default function Page() {
  return (
    <Suspense fallback={<p>…</p>}>
      <CustomPractice catalog={catalog} />
    </Suspense>
  );
}
