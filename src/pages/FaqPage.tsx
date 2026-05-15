import PageMeta from "@/components/layout/PageMeta";
import { FaqPageJsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/sections/FaqSection";
import { PAGE_META } from "@/lib/site";

export default function FaqPage() {
  const meta = PAGE_META.faq;
  return (
    <>
      <PageMeta {...meta} />
      <FaqPageJsonLd />
      <FaqSection pageTitle={meta.title} />
    </>
  );
}
