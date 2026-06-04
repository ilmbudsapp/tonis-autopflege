import PageMeta from "@/components/layout/PageMeta";
import { HomePageJsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/sections/HeroSection";
import { MobilerServiceSection } from "@/components/sections/MobilerServiceSection";
import { TerminCtaSection } from "@/components/sections/TerminCtaSection";
import { LeistungenSection } from "@/components/sections/LeistungenSection";
import { UnserProzessSection } from "@/components/sections/UnserProzessSection";
import { WarumTonisSection } from "@/components/sections/WarumTonisSection";
import { PAGE_META } from "@/lib/site";

export default function HomePage() {
  const meta = PAGE_META.home;
  return (
    <>
      <PageMeta {...meta} />
      <HomePageJsonLd />
      <HeroSection />
      <WarumTonisSection />
      <LeistungenSection />
      <UnserProzessSection />
      <MobilerServiceSection />
      <TerminCtaSection />
    </>
  );
}
