import LegalPageShell from "@/components/legal/LegalPageShell";
import PageMeta from "@/components/layout/PageMeta";
import { FIRMENFOOTER, KLEINUNTERNEHMER_STEUERNUMMER, PAGE_META } from "@/lib/site";

export default function ImpressumPage() {
  const meta = PAGE_META.impressum;
  return (
    <>
      <PageMeta {...meta} />
      <LegalPageShell title="Impressum">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Angaben gemäß § 5 TMG</p>
        <p className="text-zinc-300">
          {FIRMENFOOTER.firma}
          <br />
          {FIRMENFOOTER.inhaber}
          <br />
          {FIRMENFOOTER.strasse}
          <br />
          {FIRMENFOOTER.ort}
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Kontakt</p>
        <p>
          Telefon:{" "}
          <a href={FIRMENFOOTER.telefonHref} className="text-[#c9a227]/85 underline-offset-2 hover:underline">
            {FIRMENFOOTER.telefonLabel}
          </a>
          <br />
          E-Mail:{" "}
          <a
            href={`mailto:${FIRMENFOOTER.email}`}
            className="break-all text-[#c9a227]/85 underline-offset-2 hover:underline"
          >
            {FIRMENFOOTER.email}
          </a>
        </p>
        <p>
          <span className="text-zinc-500">Steuernummer: </span>
          {KLEINUNTERNEHMER_STEUERNUMMER}
        </p>
        <p>
          <span className="text-zinc-500">Umsatzsteuer-Hinweis: </span>
          Umsatzsteuer nicht erhoben gemäß §19 UStG.
        </p>
      </LegalPageShell>
    </>
  );
}
