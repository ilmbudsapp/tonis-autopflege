import PageMeta from "@/components/layout/PageMeta";
import { BewertungenSection } from "@/components/sections/BewertungenSection";
import { PAGE_META } from "@/lib/site";

export default function BewertungenPage() {
  const meta = PAGE_META.bewertungen;
  return (
    <>
      <PageMeta {...meta} />
      <BewertungenSection />
    </>
  );
}
