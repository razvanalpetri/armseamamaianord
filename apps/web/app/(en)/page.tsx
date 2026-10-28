import { LandingPage } from "@/components/LandingPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("en", "home");

export default function Page() {
  return <LandingPage lang="en" />;
}
