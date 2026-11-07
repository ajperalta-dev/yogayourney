"use client";
import { useSearchParams } from "next/navigation";
import { SearchPage } from "./library";
import type { SearchEntry } from "@/content/catalog";
export function SearchRoute({ index }: { index: SearchEntry[] }) {
  const query = useSearchParams().get("q") || "";
  return <SearchPage key={query} index={index} initialQuery={query} />;
}
