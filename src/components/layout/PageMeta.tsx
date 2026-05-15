import { useEffect } from "react";

import { CANONICAL_ORIGIN, SITE_NAME, type PageMetaConfig } from "@/lib/site";

type PageMetaProps = PageMetaConfig;

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", href);
}

function upsertLink(rel: string, href: string, type?: string) {
  const selector = type ? `link[rel="${rel}"][type="${type}"]` : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (type) el.type = type;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertHreflang(hreflang: string, href: string) {
  let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "alternate";
    el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function PageMeta({ title, description, path }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);

    const canonicalHref = path === "/" ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;
    upsertCanonical(canonicalHref);
    upsertHreflang("de", canonicalHref);
    upsertHreflang("x-default", canonicalHref);
    upsertLink("alternate", `${CANONICAL_ORIGIN}/feed.xml`, "application/rss+xml");

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalHref);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
  }, [title, description, path]);

  return null;
}
