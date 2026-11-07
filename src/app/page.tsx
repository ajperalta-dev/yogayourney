import { Dashboard } from "@/components/dashboard";
import { catalog, searchIndex } from "@/content/catalog";
export default function Home() {
  return (
    <Dashboard
      total={catalog.length}
      index={searchIndex.map((i) => ({ ...i, searchText: "" }))}
    />
  );
}
