import PageMeta from "@/components/layout/PageMeta";
import { GutscheineSection } from "@/components/sections/GutscheineSection";
import { PAGE_META } from "@/lib/site";

export default function GutscheinePage() {
  const meta = PAGE_META.gutscheine;
  return (
    <>
      <PageMeta {...meta} />
      <GutscheineSection />
    </>
  );
}
