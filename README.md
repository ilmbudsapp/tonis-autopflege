# Toni's Autopflege — standalone demo (Vite + React)

Izdvojen landing iz **AGRMULTIMEDIA** (`/demo/tonis-autopflege`): ista vizuelna logika, Framer Motion, Tailwind v4, statički asseti.

## Struktura

| Put | Sadržaj |
|-----|--------|
| `public/GALERIA/` | Izvorne fotografije (JPEG/PNG) — skripta ih deduplikuje i pretvara u WebP |
| `public/assets/gallery-webp/` | Izlaz: `gal-00001.webp` … (visok kvalitet, generisano) |
| `public/assets/images/` | Logotipi, `hero-poster.webp` |
| `src/generated/galleryWebp.ts` | Auto-lista imena WebP fajlova (ne ručno) |
| `public/assets/videos/` | Hero MP4 (`Tony Video Klip kompresovan.mp4`) |
| `public/assets/fonts/` | Opciono `EurostileExtd-Black.woff2` (inače sistemski / Orbitron) |
| `src/components/TonisLanding.tsx` | Glavna stranica |
| `src/lib/contact.ts` | Fallback WhatsApp cifre ako nije setovan Toni u `.env` |
| `scripts/convert-tonis-assets.mjs` | Stari tok: JPEG u `images/` → `gallery-XX.webp` + poster iz videa |
| `scripts/build-gallery-from-galeria.mjs` | **`public/GALERIA/`** → dedupe (SHA-256) → **`public/assets/gallery-webp/`** + `galleryWebp.ts` |
| `public/VIDEO 1/` | Izvorni radni video klipovi (lokalno, gitignored) |
| `public/assets/videos/work/` | Izlaz: `clip-*.mp4` + `posters/*.webp` (generisano) |
| `src/generated/workVideos.ts` | Auto-lista klipova za tab **Videos** |
| `scripts/build-work-videos-from-folder.mjs` | **`public/VIDEO 1/`** → dedupe + FFmpeg (CRF 18) → **`assets/videos/work/`** |

## Lokalno

```bash
npm install
npm run dev
```

Kopiraj `.env.example` u `.env` i po potrebi postavi `VITE_TONI_WHATSAPP_E164` i `VITE_AGR_SITE_URL`.

### Velika galerija iz `public/GALERIA/`

Nakon što dodaš ili promeniš slike u **`public/GALERIA/`** (rekurzivno, samo slike — MP4 se preskače):

```bash
npm run gallery:galeria
```

- Duplikati **istog fajla** (identični bajtovi) se automatski izbacuju.
- WebP: **quality 94**, `effort: 6`, bez agresivnog smanjenja; ako je duža strana preko 5200 px, slika se umanjuje uz `fit: inside` da ostane upotrebljiva na webu.

### Arbeitsvideos aus `public/VIDEO 1/`

MP4/MOV/MKV u **`public/VIDEO 1/`** (rekurzivno). Zatim:

```bash
npm run videos:work
```

- **Duplikati** (identični bajtovi kao drugi fajl ili kao hero `Tony Video Klip kompresovan.mp4`) se preskaču.
- **Kompresija:** H.264, **CRF 18**, `preset slow`, `faststart`, max širina **1920** (Lanczos) — dobar balans veličine i kvaliteta.
- Posteri: WebP iz kadra ~0,8 s.

### Regeneracija starog toka (poster iz hero videa)

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
