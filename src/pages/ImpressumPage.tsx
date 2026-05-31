import PageMeta from "@/components/layout/PageMeta";
import LegalPageShell from "@/components/legal/LegalPageShell";
import LegalSections from "@/components/legal/LegalSections";
import { impressum } from "@/legal/legalContent";
import { PAGE_META } from "@/lib/site";

export default function ImpressumPage() {
  const meta = PAGE_META.impressum;
  return (
    <>
      <PageMeta {...meta} />
      <LegalPageShell title={impressum.title} subtitle={impressum.subtitle}>
        <LegalSections sections={impressum.sections} />
      </LegalPageShell>
    </>
  );
}
