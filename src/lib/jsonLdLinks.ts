import { FIRMENFOOTER, GOOGLE_MAPS_BUSINESS_URL } from "@/lib/site";

/** Knowledge Graph / regional entity links for LocalBusiness sameAs. */
export const KNOWLEDGE_GRAPH_SAME_AS = [
  "https://de.wikipedia.org/wiki/G%C3%B6ppingen",
  "https://www.wikidata.org/wiki/Q3951",
  "https://de.wikipedia.org/wiki/Fahrzeugaufbereitung",
  "https://en.wikipedia.org/wiki/Auto_detailing",
  "https://www.wikidata.org/wiki/Q3274962",
] as const;

export const LOCAL_BUSINESS_SAME_AS = [
  FIRMENFOOTER.facebook.href,
  FIRMENFOOTER.instagram.href,
  FIRMENFOOTER.tiktok.href,
  GOOGLE_MAPS_BUSINESS_URL,
  ...KNOWLEDGE_GRAPH_SAME_AS,
] as const;
