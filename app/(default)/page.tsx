export const metadata = {
  title: "Home - InfraGlide",
  description: "Page description",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Team from "@/components/team";
import Pricing from "@/components/pricing";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Team />
      <Pricing />
      <Cta />
    </>
  );
}
