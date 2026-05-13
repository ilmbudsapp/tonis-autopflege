# Toni's Autopflege — standalone demo (Vite + React)

Izdvojen landing iz **AGRMULTIMEDIA** (`/demo/tonis-autopflege`): ista vizuelna logika, Framer Motion, Tailwind v4, statički asseti.

## Struktura

| Put | Sadržaj |
|-----|--------|
| `public/assets/images/` | WebP galerija, logotipi, `hero-poster.webp`, opciono izvorni JPEG za konverziju |
| `public/assets/videos/` | Hero MP4 (`Tony Video Klip kompresovan.mp4`) |
| `public/assets/fonts/` | Opciono `EurostileExtd-Black.woff2` (inače sistemski / Orbitron) |
| `src/components/TonisLanding.tsx` | Glavna stranica |
| `src/lib/contact.ts` | Fallback WhatsApp cifre ako nije setovan Toni u `.env` |
| `scripts/convert-tonis-assets.mjs` | JPEG → `gallery-XX.webp` + poster iz videa |

## Lokalno

```bash
npm install
npm run dev
```

Kopiraj `.env.example` u `.env` i po potrebi postavi `VITE_TONI_WHATSAPP_E164` i `VITE_AGR_SITE_URL`.

### Regeneracija galerije / postera

```bash
npm run tonis:convert
```

(Potrebni JPEG u `public/assets/images/` i MP4 u `public/assets/videos/`.)

## Novi GitHub repozitorijum

1. Na GitHubu: **New repository** (npr. `tonis-autopflege`), bez README ako već imaš lokalno.
2. U ovom folderu:

```bash
git init
git add .
git commit -m "chore: initial Toni Autopflege standalone site"
git branch -M main
git remote add origin https://github.com/<tvoj-nalog>/<repo>.git
git push -u origin main
```

## Vercel

1. **Import** repozitorijuma u [Vercel](https://vercel.com).
2. **Framework preset:** Vite  
3. **Build command:** `npm run build`  
4. **Output directory:** `dist`  
5. U **Environment Variables** dodaj po želji: `VITE_TONI_WHATSAPP_E164`, `VITE_AGR_SITE_URL`.

U korenu je `vercel.json` sa SPA rewrite-om na `index.html` (spremno za buduće rute).

## Napomena o AGR demo ruti

Glavni sajt **agrmultimedia.eu** i dalje može da drži `/demo/tonis-autopflege` dok ne prebaciš DNS ili linkove; ovaj repozitorijum je namenjen zasebnom domenu (npr. `tonis-autopflege.de`) na Vercelu.
