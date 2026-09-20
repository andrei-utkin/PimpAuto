# Pimp Auto

Multilingual presentation and lead-generation site for rare automotive-parts sourcing.

## Stack

- Astro 7 with static output
- TypeScript
- Self-hosted Exo 2 typography
- No client framework; only small progressive-enhancement scripts

## Local development

```sh
npm install
npm run dev
```

Production check and build:

```sh
npm run build
```

Set `SITE_URL` to the final HTTPS origin during the production build so canonical, hreflang, and Open Graph image URLs become absolute.

The build produces Russian, English, French, Polish, and Spanish routes using the same complete page component. Set the final production domain before launch. The French location is a physical point; Spanish and Polish AUTO.PRO storefronts are live.

## Content entry points

- Russian primary page: `src/pages/index.astro`
- Localized page shell: `src/components/LocaleLanding.astro`
- EN / FR / PL / ES page copy: `src/pages/{locale}/index.astro`
- Localized navigation, form, process, and contact UI: `src/data/interface.ts`
- Global visual system: `src/styles/global.css`
- Product decisions and pending content: `PRODUCT.md`

The enquiry form copies a localized message on-device; visitors send it through Instagram themselves. Clipboard denial exposes a selectable draft. No form endpoint or automatic submission is implied. Images are optimized into responsive WebP files by Astro at build time. `node scripts/review-layout.mjs` checks all routes at six viewport widths and exercises the clipboard fallback and language-anchor navigation against the local development server.
