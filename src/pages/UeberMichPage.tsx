import PageMeta from "@/components/layout/PageMeta";
import { UeberMichSection } from "@/components/sections/UeberMichSection";
import { PAGE_META } from "@/lib/site";

export default function UeberMichPage() {
  const meta = PAGE_META.ueberMich;
  return (
    <>
      <PageMeta {...meta} />
      <UeberMichSection />
    </>
  );
}
