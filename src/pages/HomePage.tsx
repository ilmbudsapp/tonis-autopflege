import PageMeta from "@/components/layout/PageMeta";
import { FaqPageJsonLd, LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { CANONICAL_ORIGIN } from "@/lib/site";
import { HeroSection } from "@/components/sections/HeroSection";
import { MobilerServiceSection } from "@/components/sections/MobilerServiceSection";
import { TerminCtaSection } from "@/components/sections/TerminCtaSection";
import { WarumTonisSection } from "@/components/sections/WarumTonisSection";
import { PAGE_META } from "@/lib/site";

export default function HomePage() {
  const meta = PAGE_META.home;
  return (
    <>
      <PageMeta {...meta} />
      <LocalBusinessJsonLd />
      <FaqPageJsonLd pageUrl={`${CANONICAL_ORIGIN}/`} />
      <HeroSection />
      <WarumTonisSection />
      <MobilerServiceSection />
      <TerminCtaSection />
    </>
  );
}
