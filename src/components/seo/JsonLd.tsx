import { useLocation } from "react-router-dom";

import { CANONICAL_ORIGIN, FIRMENFOOTER, GOOGLE_MAPS_BUSINESS_URL } from "@/lib/site";

import { breadcrumbListSchema } from "@/lib/breadcrumbs";

import { LOCAL_BUSINESS_SAME_AS } from "@/lib/jsonLdLinks";

import { FAQ_ITEMS } from "@/data/siteContent";

import {

  AUTOPFLEGE_LANDING_FAQ,

} from "@/data/autopflegeGoeppingenContent";



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



/** LocalBusiness + AutomotiveBusiness (Auto Detailing) with full NAP data. */

export function localBusinessNode(pageUrl = `${CANONICAL_ORIGIN}/`) {

  return {

    "@type": ["LocalBusiness", "AutomotiveBusiness"],

    "@id": `${CANONICAL_ORIGIN}/#business`,

    name: FIRMENFOOTER.firma,

    alternateName: "Toni's Autopflege Göppingen",

    description:

      "Professionelle Autopflege und Fahrzeugaufbereitung für Göppingen und Umgebung: Lackaufbereitung, Keramikversiegelung, Innenraumreinigung und Leasingrückgabe Aufbereitung in Zell unter Aichelberg.",

    image: `${CANONICAL_ORIGIN}/assets/images/hero-poster.webp`,

    logo: `${CANONICAL_ORIGIN}/assets/images/TONY%20LOGO%20ISECEN.webp`,

    address: {

      "@type": "PostalAddress",

      streetAddress: FIRMENFOOTER.strasse,

      addressLocality: "Zell unter Aichelberg",

      addressRegion: "Baden-Württemberg",

      postalCode: "73119",

      addressCountry: "DE",

    },

    geo: {

      "@type": "GeoCoordinates",

      latitude: 48.6531,

      longitude: 9.5754,

    },

    areaServed: [

      { "@type": "City", name: "Göppingen" },

      { "@type": "City", name: "Zell unter Aichelberg" },

      { "@type": "City", name: "Geislingen an der Steige" },

      { "@type": "AdministrativeArea", name: "Landkreis Göppingen" },

    ],

    telephone: FIRMENFOOTER.telefonLabel,

    email: FIRMENFOOTER.email,

    url: pageUrl,

    hasMap: GOOGLE_MAPS_BUSINESS_URL,

    priceRange: "€€",

    currenciesAccepted: "EUR",

    paymentAccepted: "Cash, Bank transfer",

    openingHoursSpecification: [

      {

        "@type": "OpeningHoursSpecification",

        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

        opens: "08:00",

        closes: "18:00",

      },

    ],

    sameAs: [...LOCAL_BUSINESS_SAME_AS],

    founder: { "@type": "Person", name: "Jeton Shala", alternateName: "Toni" },

    serviceType: [

      "Autopflege",

      "Autoaufbereitung",

      "Lackaufbereitung",

      "Keramikversiegelung",

      "Innenraumreinigung",

      "Fahrzeugaufbereitung",

    ],

    knowsAbout: [

      "Autopflege Göppingen",

      "Lackpolitur",

      "Keramikversiegelung",

      "Leasingrückgabe Aufbereitung",

    ],

  };

}



function faqPageNode(

  pageUrl: string,

  items: ReadonlyArray<{ readonly question: string; readonly answer: string }>,
) {

  return {

    "@type": "FAQPage",

    "@id": `${pageUrl}#faq`,

    url: pageUrl,

    author: { "@type": "Person", name: "Jeton Shala" },

    mainEntity: items.map((item) => ({

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



/** Homepage: single @graph — WebSite, LocalBusiness, FAQPage, BreadcrumbList. */

export function HomePageJsonLd() {

  const homeUrl = `${CANONICAL_ORIGIN}/`;

  const graph = {

    "@context": "https://schema.org",

    "@graph": [

      webSiteNode(),

      localBusinessNode(homeUrl),

      faqPageNode(homeUrl, FAQ_ITEMS),

      breadcrumbNode("/"),

    ],

  };

  return <JsonLdScript data={graph} />;

}



/** SEO landing /autopflege-goeppingen — LocalBusiness, FAQ, Breadcrumbs. */

export function AutopflegeLandingJsonLd() {

  const pageUrl = `${CANONICAL_ORIGIN}/autopflege-goeppingen`;

  const graph = {

    "@context": "https://schema.org",

    "@graph": [

      localBusinessNode(pageUrl),

      faqPageNode(pageUrl, AUTOPFLEGE_LANDING_FAQ),

      breadcrumbNode("/autopflege-goeppingen"),

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

    <JsonLdScript data={{ "@context": "https://schema.org", ...faqPageNode(pageUrl, FAQ_ITEMS) }} />

  );

}

