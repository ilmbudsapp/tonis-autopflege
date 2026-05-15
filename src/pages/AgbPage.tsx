import LegalPageShell from "@/components/legal/LegalPageShell";
import PageMeta from "@/components/layout/PageMeta";
import { PAGE_META } from "@/lib/site";

export default function AgbPage() {
  const meta = PAGE_META.agb;
  return (
    <>
      <PageMeta {...meta} />
      <LegalPageShell title="Allgemeine Geschäftsbedingungen (AGB)">
        <p>
          Diese AGB gelten für alle Aufbereitungsleistungen von Toni&apos;s Autopflege (Inhaber Jeton Shala). Darüber
          hinaus gelten die gesetzlichen Bestimmungen; schließlich werden individuelle Vereinbarungen schriftlich oder per
          WhatsApp bestätigt.
        </p>
        <p>
          <strong>Leistungsumfang:</strong> Der vereinbarte Umfang (Innenraum, Außenaufbereitung, Politur, Keramik usw.)
          wird vor Beginn abgestimmt. Folglich entstehen Zusatzleistungen nur nach Ihrer Freigabe.
        </p>
        <p>
          <strong>Termine:</strong> Vereinbarte Termine sind verbindlich nach Bestätigung. Bei Verschiebung bitten wir um
          rechtzeitige Information.
        </p>
        <p>
          <strong>Haftung:</strong> Wir arbeiten materialschonend; verdeckte Vorschäden oder serienbedingte
          Empfindlichkeiten werden vorab angesprochen, soweit erkennbar.
        </p>
      </LegalPageShell>
    </>
  );
}
