import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("ro", "privacy");

export default function Page() {
  return <LegalPage lang="ro" page="privacy" />;
}
