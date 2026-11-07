import { TeachingNotes } from "@/components/class-builder";
import { catalog, cardEntry } from "@/content/catalog";
export default function Page() {
  return (
    <TeachingNotes
      index={catalog.map((i) => {
        const e = cardEntry(i);
        return { id: e.id, href: e.href, name: e.name };
      })}
    />
  );
}
