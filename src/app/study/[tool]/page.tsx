import { notFound } from "next/navigation";
import {
  Favorites,
  Flashcards,
  Quiz,
  Progress,
} from "@/components/study-tools";
import { catalog, searchIndex } from "@/content/catalog";
export const dynamicParams = false;
export function generateStaticParams() {
  return ["favorites", "flashcards", "quiz", "progress"].map((tool) => ({
    tool,
  }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  switch (tool) {
    case "favorites":
      return (
        <Favorites index={searchIndex.map((i) => ({ ...i, searchText: "" }))} />
      );
    case "flashcards":
      return <Flashcards />;
    case "quiz":
      return <Quiz />;
    case "progress":
      return <Progress total={catalog.length} />;
    default:
      notFound();
  }
}
