import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("en", "terms");

export default function Page() {
  return <LegalPage lang="en" page="terms" />;
}
