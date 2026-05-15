import PageMeta from "@/components/layout/PageMeta";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpressionenSection } from "@/components/sections/ImpressionenSection";
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
      <HeroSection />
      <WarumTonisSection />
      <MobilerServiceSection />
      <ImpressionenSection />
      <TerminCtaSection />
    </>
  );
}
