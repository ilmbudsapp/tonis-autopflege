import PageMeta from "@/components/layout/PageMeta";
import LegalPageShell from "@/components/legal/LegalPageShell";
import LegalSections from "@/components/legal/LegalSections";
import { privacyPolicy } from "@/legal/legalContent";
import { PAGE_META } from "@/lib/site";

export default function DatenschutzPage() {
  const meta = PAGE_META.datenschutz;
  return (
    <>
      <PageMeta {...meta} />
      <LegalPageShell title={privacyPolicy.title} subtitle={privacyPolicy.subtitle}>
        <p className="mb-6 text-xs text-zinc-500">Stand: {privacyPolicy.lastUpdated}</p>
        <LegalSections sections={privacyPolicy.sections} />
      </LegalPageShell>
    </>
  );
}
