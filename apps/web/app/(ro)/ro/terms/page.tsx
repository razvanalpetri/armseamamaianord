import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("ro", "terms");

export default function Page() {
  return <LegalPage lang="ro" page="terms" />;
}
