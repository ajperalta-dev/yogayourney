import { notFound } from "next/navigation";
import { SequencePlayer } from "@/components/sequence-player";
import { sequences } from "@/content/sequences";
import { posesById } from "@/content/catalog";
export function generateStaticParams() {
  return sequences.map((s) => ({ id: s.id }));
}
export const dynamicParams = false;
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sequence = sequences.find((s) => s.id === id);
  if (!sequence) notFound();
  const items = [...new Set(sequence.steps.map((step) => step.contentId))]
    .map((contentId) => posesById[contentId])
    .filter((item) => item !== undefined);
  return <SequencePlayer sequence={sequence} items={items} />;
}
