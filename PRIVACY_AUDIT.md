# Privacy audit — tonis-autopflege-goeppingen.de

Date: **Mai 2026**

## Problems found (before fix)

| Area | Issue |
|------|--------|
| Google Fonts | `index.html` preconnect + stylesheet; `useDemoFonts.ts` dynamic injection; CSP allowed google font domains |
| Datenschutz | Single placeholder paragraph |
| Impressum | Minimal text, referenced § 5 TMG instead of § 5 DDG |
| Google Maps embed | Loaded without consent on `/kontakt` |
| Analytics | None found ✅ |
| YouTube | No embeds — self-hosted MP4 only ✅ |

## External requests (after fix)

| Request | Purpose | Necessary? | Action |
|---------|---------|------------|--------|
| `self` (HTML/JS/CSS/fonts/videos) | Site delivery | Yes | Keep |
| `maps.google.com` (iframe) | Map embed on Kontakt | Optional | **Consent required** |
| `wa.me` | WhatsApp links + float button | Optional | Link only — disclosed |
| `facebook.com`, `instagram.com`, `tiktok.com` | Social links | Optional | Link only — disclosed |
| `google.com/maps/search` | Reviews / map links | Optional | User leaves site |
| `agrmultimedia.eu` | Web design credit | Optional | Link only |
| `wikipedia.org`, `wikidata.org` | JSON-LD sameAs | Optional | Link only in schema |
| ~~`fonts.googleapis.com`~~ | Fonts | No | **Removed** |
| ~~`fonts.gstatic.com`~~ | Font files | No | **Removed** |

## Consent model

- **Nur notwendige:** Site works fully; Maps shows placeholder with external link; no tracking.
- **Alle akzeptieren:** Google Maps iframe loads on Kontakt page.
- No Google Analytics, GTM, Meta Pixel, Hotjar, or Clarity on this site.

## Kontaktformular

- Uses `mailto:tonis-autopflege@gmx.de` — no third-party form API.
- Business email in footer and legal pages: `tonis-autopflege@gmx.de`.

## Legacy code note

- `src/components/TonisLanding.tsx` is unused (not imported in App). Contains old Google Fonts references but is **not bundled** in production.

## Manual follow-up for site owner (Jeton Shala — Toni)

| Item | Status |
|------|--------|
| USt-IdNr. | Not applicable (Kleinunternehmer §19 UStG) — documented |
| Steuernummer | `6339616878` — included in Impressum |
| Vercel DPA | Accept in Vercel dashboard if not done |
| Email address | `tonis-autopflege@gmx.de` — single contact email site-wide |
| Google Business / Maps listing | Owner maintains separately |

## Verification checklist

1. Network tab: no `fonts.googleapis.com` on page load.
2. First visit (incognito): cookie banner visible.
3. „Nur notwendige“ → refresh: banner hidden; `tonis-cookie-consent` in localStorage.
4. „Nur notwendige“: no Maps iframe network request.
5. „Alle akzeptieren“: Maps iframe loads on `/kontakt`.
6. `/impressum` and `/datenschutz` show full legal text.
7. Site visuals unchanged (local fonts loaded).
