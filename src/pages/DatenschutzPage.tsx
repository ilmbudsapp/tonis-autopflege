import LegalPageShell from "@/components/legal/LegalPageShell";
import PageMeta from "@/components/layout/PageMeta";
import { PAGE_META } from "@/lib/site";

export default function DatenschutzPage() {
  const meta = PAGE_META.datenschutz;
  return (
    <>
      <PageMeta {...meta} />
      <LegalPageShell title="Datenschutzerklärung">
        <p>
          Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
          Datenschutzvorschriften (DSGVO). Kontaktanfragen über WhatsApp erfolgen freiwillig.
        </p>
      </LegalPageShell>
    </>
  );
}
