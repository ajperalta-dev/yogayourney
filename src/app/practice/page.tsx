import { PracticeLibrary } from "@/components/library";
import { sequences } from "@/content/sequences";
export const metadata = { title: "Practice" };
export default function Page() {
  return <PracticeLibrary sequences={sequences} />;
}
