import PageMeta from "@/components/layout/PageMeta";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { KontaktSection } from "@/components/sections/KontaktSection";
import { PAGE_META } from "@/lib/site";

export default function KontaktPage() {
  const meta = PAGE_META.kontakt;
  return (
    <>
      <PageMeta {...meta} />
      <LocalBusinessJsonLd />
      <KontaktSection pageTitle={meta.title} />
    </>
  );
}
