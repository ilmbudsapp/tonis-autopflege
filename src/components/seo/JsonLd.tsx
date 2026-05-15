import { CANONICAL_ORIGIN, FIRMENFOOTER } from "@/lib/site";
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
    sameAs: [
      FIRMENFOOTER.facebook.href,
      FIRMENFOOTER.instagram.href,
      FIRMENFOOTER.tiktok.href,
      "https://www.google.com/maps/search/?api=1&query=Tonis+Autopflege+Boschstr+23%2F1+73119+Zell+unter+Aichelberg",
    ],
    founder: { "@type": "Person", name: "Jeton Shala" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${CANONICAL_ORIGIN}/faq`,
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
