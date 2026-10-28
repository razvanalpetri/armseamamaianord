import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("en", "privacy");

export default function Page() {
  return <LegalPage lang="en" page="privacy" />;
}
