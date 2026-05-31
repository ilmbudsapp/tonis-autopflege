# Changelog — tonis-autopflege-goeppingen.de

## Mai 2026 — DSGVO / Legal / Privacy / Consent / Fonts (vollständig)

### Fonts
- Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) entfernt
- Plus Jakarta Sans + Syne via `@fontsource` lokal gebündelt (`src/styles/fonts.css`)
- Eurostile Extd weiterhin lokal unter `/assets/fonts/EurostileExtd-Black.woff2`
- `useDemoFonts.ts` entfernt; dynamische Font-Injection deaktiviert

### Cookie Consent
- DSGVO-konformer Banner mit „Nur notwendige“ und „Alle akzeptieren“
- localStorage-Key: `tonis-cookie-consent` (JSON: `choice`, `updatedAt`)
- Google Maps iframe nur nach „Alle akzeptieren“

### Legal
- Vollständiges Impressum (§ 5 DDG, § 18 Abs. 2 MStV)
- Vollständige Datenschutzerklärung (15 Abschnitte, realer Tech-Stack)
- Footer-Links Impressum / Datenschutz / AGB bestätigt

### Security / CSP
- `vercel.json` CSP: Google Fonts Domains entfernt
- `form-action` um `mailto:` ergänzt (Kontaktformular)

### Kontakt-E-Mail vereinheitlicht (Mai 2026)
- Einzige Kontaktadresse site-weit: `tonis-autopflege@gmx.de`
- Ersetzt u. a. `info.tonisautopflege@gmx.de` und `kontakt@tonis-autopflege.de`
