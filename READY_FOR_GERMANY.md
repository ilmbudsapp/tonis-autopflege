# Ready for Germany — tonis-autopflege-goeppingen.de

**Status: Ready** (Mai 2026) — same standard as agrmultimedia.eu and fixbike.online

## Completed

| Requirement | Status |
|-------------|--------|
| Self-hosted fonts (no Google Fonts CDN) | ✅ |
| Cookie consent banner (Nur notwendige / Alle akzeptieren) | ✅ |
| localStorage consent (`tonis-cookie-consent`) | ✅ |
| Google Maps consent-gated | ✅ |
| No analytics without consent (no analytics at all) | ✅ |
| Full Impressum (§ 5 DDG) | ✅ |
| Full Datenschutzerklärung (15 sections) | ✅ |
| Footer legal links | ✅ |
| CSP updated (no font CDN domains) | ✅ |
| UTF-8 / Lucide icons (no mojibake in footer) | ✅ |

## Real business data used

- **Firma:** Toni's Autopflege
- **Inhaber:** Jeton Shala — Toni
- **Adresse:** Boschstr. 23/1, 73119 Zell unter Aichelberg
- **Telefon:** +49 174 8564830
- **E-Mail:** tonis-autopflege@gmx.de
- **Steuernummer:** 6339616878
- **Kleinunternehmer** § 19 UStG

## Third-party services that remain

| Service | Why | Consent |
|---------|-----|---------|
| Vercel (hosting) | Essential | No (disclosed in Datenschutz) |
| Google Maps (embed) | Location display | Yes — „Alle akzeptieren“ |
| WhatsApp (wa.me links) | Customer contact | No — user-initiated link |
| Social media (FB/IG/TikTok) | Marketing links | No — user-initiated link |

## Owner action items (optional)

1. Confirm Vercel Data Processing Agreement accepted.
2. Confirm `tonis-autopflege@gmx.de` is monitored for customer inquiries.
3. Remove or archive legacy `TonisLanding.tsx` when convenient (not in production bundle).

## QA performed

- Build succeeds (`npm run build`)
- No Google Fonts references in `index.html` or active source
- Consent flow implemented per spec
- Legal pages render with real site-specific content
