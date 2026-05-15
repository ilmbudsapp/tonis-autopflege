import { useEffect } from "react";
import { CANONICAL_ORIGIN, type PageMetaConfig } from "@/lib/site";

type PageMetaProps = PageMetaConfig;

export default function PageMeta({ title, description, path }: PageMetaProps) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const href = path === "/" ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;
    canonical.setAttribute("href", href);
  }, [title, description, path]);

  return null;
}
