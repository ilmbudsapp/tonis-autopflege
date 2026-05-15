import PageMeta from "@/components/layout/PageMeta";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { PremiumPartnerSection } from "@/components/sections/PremiumPartnerSection";
import { ProdukteSection } from "@/components/sections/ProdukteSection";
import { PAGE_META } from "@/lib/site";

export default function PartnerPage() {
  const meta = PAGE_META.partner;
  return (
    <>
      <PageMeta {...meta} />
      <PremiumPartnerSection />
      <ProdukteSection />
      <PartnerSection />
    </>
  );
}
