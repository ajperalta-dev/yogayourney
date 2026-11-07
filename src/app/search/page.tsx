import { Suspense } from "react";
import { SearchRoute } from "@/components/search-route";
import { searchIndex } from "@/content/catalog";
export default function Page() {
  return (
    <Suspense fallback={<p>…</p>}>
      <SearchRoute index={searchIndex} />
    </Suspense>
  );
}
