import { useLocation } from "react-router-dom";
import { CANONICAL_ORIGIN, FIRMENFOOTER } from "@/lib/site";
import { breadcrumbListSchema } from "@/lib/breadcrumbs";
import { LOCAL_BUSINESS_SAME_AS } from "@/lib/jsonLdLinks";
import { FAQ_ITEMS } from "@/data/siteContent";

function webSiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${CANONICAL_ORIGIN}/#website`,
    name: FIRMENFOOTER.firma,
    url: `${CANONICAL_ORIGIN}/`,
    inLanguage: "de-DE",
    publisher: { "@id": `${CANONICAL_ORIGIN}/#business` },
  };
}

function localBusinessNode() {
  return {
    "@type": "LocalBusiness",
    "@id": `${CANONICAL_ORIGIN}/#business`,
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
    email: FIRMENFOOTER.email,
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
}

function faqPageNode(pageUrl: string) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    author: { "@type": "Person", name: "Jeton Shala" },
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function breadcrumbNode(pathname: string) {
  const schema = breadcrumbListSchema(pathname);
  return {
    "@type": "BreadcrumbList",
    "@id": `${CANONICAL_ORIGIN}${pathname === "/" ? "/" : pathname}#breadcrumb`,
    itemListElement: schema.itemListElement,
  };
}

function JsonLdScript({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

/** Homepage: single @graph — WebSite, LocalBusiness, FAQPage, BreadcrumbList (no duplicates). */
export function HomePageJsonLd() {
  const homeUrl = `${CANONICAL_ORIGIN}/`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      webSiteNode(),
      localBusinessNode(),
      faqPageNode(homeUrl),
      breadcrumbNode("/"),
    ],
  };
  return <JsonLdScript data={graph} />;
}

export function LocalBusinessJsonLd() {
  return <JsonLdScript data={{ "@context": "https://schema.org", ...localBusinessNode() }} />;
}

export function BreadcrumbListJsonLd() {
  const { pathname } = useLocation();
  return <JsonLdScript data={breadcrumbListSchema(pathname)} />;
}

type FaqPageJsonLdProps = {
  pageUrl?: string;
};

export function FaqPageJsonLd({ pageUrl = `${CANONICAL_ORIGIN}/faq` }: FaqPageJsonLdProps) {
  return (
    <JsonLdScript data={{ "@context": "https://schema.org", ...faqPageNode(pageUrl) }} />
  );
}
