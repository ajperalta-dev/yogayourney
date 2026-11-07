import type { ContentItem, SectionId } from "@/lib/models";
import { asanas } from "./asanas";
import { yin } from "./yin";
import { aerial } from "./aerial";
import { pranayama } from "./pranayama";
import { mantras } from "./mantras";
import { anatomy } from "./anatomy";
import { kriyas } from "./kriyas";
import { meditation } from "./meditation";
import { ayurveda } from "./ayurveda";
import { sequences } from "./sequences";
import { sections } from "./sections";
import type { Localized } from "@/lib/models";
export const catalog: ContentItem[] = [
  ...asanas,
  ...yin,
  ...aerial,
  ...pranayama,
  ...mantras,
  ...anatomy,
  ...kriyas,
  ...meditation,
  ...ayurveda,
];
export const byId = Object.fromEntries(catalog.map((item) => [item.id, item]));
export function sectionFor(item: ContentItem): SectionId {
  return (
    {
      asana: "hatha",
      yin: "yin",
      aerial: "aerial",
      pranayama: "pranayama",
      mantra: "mantras",
      anatomy: "anatomy",
      kriya: "kriyas",
      meditation: "meditation",
      ayurveda: "ayurveda",
    } as const
  )[item.kind];
}
export function itemsFor(section: string) {
  return section === "ashtanga"
    ? asanas
    : catalog.filter((item) => sectionFor(item) === section);
}
export type SearchEntry = {
  id: string;
  name: Localized;
  summary: Localized;
  sanskrit?: string;
  section: string;
  category: string;
  level: string;
  href: string;
  image: string;
  searchText: string;
  categories?: string[];
};
export function entry(
  item: ContentItem,
  section = sectionFor(item),
): SearchEntry {
  return {
    id: item.id,
    name: item.name,
    summary: item.summary,
    sanskrit: item.sanskrit,
    section,
    category: item.category,
    level: item.level,
    href: `/${section}/${item.id}/`,
    image: item.thumbnail,
    categories: item.kind === "asana" ? item.categories : undefined,
    searchText: JSON.stringify(item),
  };
}
export const searchIndex: SearchEntry[] = [
  ...catalog.map((item) => entry(item)),
  ...sequences.map((seq) => ({
    id: seq.id,
    name: seq.name,
    summary: seq.description,
    section: seq.style,
    category: "Sequence",
    level: "beginner",
    href: `/practice/${seq.id}/`,
    image: "/images/study.webp",
    searchText: JSON.stringify(seq),
  })),
  ...sections.map((section) => ({
    id: `section-${section.id}`,
    name: section.name,
    summary: section.description,
    section: section.id,
    category: "Section",
    level: "beginner",
    href: `/${section.id}/`,
    image: "/images/study.webp",
    searchText: JSON.stringify(section),
  })),
];
// Trim verbose detail values from card payloads; search gets an explicit index on its own route.
export function cardEntry(item: ContentItem, section?: SectionId): SearchEntry {
  return {
    ...entry(item, section),
    searchText: [item.name.es, item.name.en, item.sanskrit, ...item.tags].join(
      " ",
    ),
  };
}
