import PageMeta from "@/components/layout/PageMeta";
import { GalerieSection } from "@/components/sections/GalerieSection";
import { PAGE_META } from "@/lib/site";

export default function GaleriePage() {
  const meta = PAGE_META.galerie;
  return (
    <>
      <PageMeta {...meta} />
      <GalerieSection />
    </>
  );
}
