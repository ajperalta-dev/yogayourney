import { notFound } from "next/navigation";
import { Library } from "@/components/library";
import { sections } from "@/content/sections";
import { itemsFor, cardEntry } from "@/content/catalog";
import { sequences } from "@/content/sequences";
import type { SectionId } from "@/lib/models";
export function generateStaticParams() {
  return [
    ...sections
      .filter((s) => s.id !== "schedule")
      .map((s) => ({ section: s.id })),
    { section: "learn" },
  ];
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return { title: sections.find((s) => s.id === section)?.name.en || "Learn" };
}
export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (section !== "learn" && !sections.some((s) => s.id === section))
    notFound();
  return (
    <Library
      section={section}
      items={itemsFor(section).map((i) => cardEntry(i, section as SectionId))}
      sequences={sequences.filter((s) => s.style === section)}
    />
  );
}
