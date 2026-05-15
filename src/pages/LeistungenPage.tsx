import PageMeta from "@/components/layout/PageMeta";
import { InnenraumSection } from "@/components/sections/InnenraumSection";
import { LeistungenSection } from "@/components/sections/LeistungenSection";
import { PremiumServicesSection } from "@/components/sections/PremiumServicesSection";
import { PAGE_META } from "@/lib/site";

export default function LeistungenPage() {
  const meta = PAGE_META.leistungen;
  return (
    <>
      <PageMeta {...meta} />
      <LeistungenSection />
      <InnenraumSection />
      <PremiumServicesSection />
    </>
  );
}
