import { CANONICAL_ORIGIN, FIRMENFOOTER } from "@/lib/site";
import { LOCAL_BUSINESS_SAME_AS } from "@/lib/jsonLdLinks";
import { FAQ_ITEMS } from "@/data/siteContent";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: FIRMENFOOTER.firma,
    image: `${CANONICAL_ORIGIN}/assets/images/hero-poster.webp`,
    logo: `${CANONICAL_ORIGIN}/assets/images/TONY%20LOGO%20ISECEN.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: FIRMENFOOTER.strasse,
      addressLocality: "Zell unter Aichelberg",
      postalCode: "73119",
      addressCountry: "DE",
    },
    telephone: FIRMENFOOTER.telefonLabel,
    url: `${CANONICAL_ORIGIN}/`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [...LOCAL_BUSINESS_SAME_AS],
    founder: { "@type": "Person", name: "Jeton Shala" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

type FaqPageJsonLdProps = {
  pageUrl?: string;
};

export function FaqPageJsonLd({ pageUrl = `${CANONICAL_ORIGIN}/faq` }: FaqPageJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    author: { "@type": "Person", name: "Jeton Shala" },
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
