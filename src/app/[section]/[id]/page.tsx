import { notFound } from "next/navigation";
import { Detail } from "@/components/detail";
import { byId, catalog, cardEntry, sectionFor } from "@/content/catalog";
import { detailFields } from "@/lib/detail-fields";
export function generateStaticParams() {
  return catalog.flatMap((item) =>
    item.kind === "asana"
      ? [
          { section: "hatha", id: item.id },
          { section: "ashtanga", id: item.id },
        ]
      : [{ section: sectionFor(item), id: item.id }],
  );
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; id: string }>;
}) {
  const { id } = await params;
  return { title: byId[id]?.name.en || "Study" };
}
export default async function DetailPage({
  params,
}: {
  params: Promise<{ section: string; id: string }>;
}) {
  const { section, id } = await params;
  const item = byId[id];
  if (
    !item ||
    !(
      sectionFor(item) === section ||
      (section === "ashtanga" && item.kind === "asana")
    )
  )
    notFound();
  return (
    <Detail
      item={item}
      section={section}
      fields={detailFields(item)}
      related={[
        ...new Set([
          ...item.relatedIds,
          ...(item.kind === "asana" ? item.anatomyIds : []),
        ]),
      ]
        .map((id) => byId[id])
        .filter(Boolean)
        .map((i) => cardEntry(i))}
    />
  );
}
