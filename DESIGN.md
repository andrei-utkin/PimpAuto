# Pimp Auto — design system

## Direction

The site presents rare-parts sourcing as a technical archive rather than a generic automotive catalogue. Its visual model is a layered workshop dossier: cobalt blueprint fields, pale vellum sheets, matte metal, strict ledger rules, technical labels, and one orange action signal.

Following the user's September 20 request to fix the appearance, all five routes use one responsive semantic layout in `src/components/LocaleLanding.astro`. The old composition and scaffold are historical references, not active layout dependencies. The cobalt, technical illustration, pale surfaces and orange action remain; typography and spacing now adapt naturally to translated content.

## Core tokens

- Cobalt: `#083e81`; dark cobalt: `#06366f`; map/night field: `#082f64`.
- Paper: `#f4f6f6`; secondary surface: `#e7ebee`; white storefront surface.
- Ink: `#142332`; muted copy: `#526475`; dividers: `#ccd5dd`.
- Signal orange: `#f17130`. Reserve it for the primary conversion action and location pin.
- Fine rules use cobalt or white at 18–35% opacity.

## Typography

- Self-hosted Exo 2 handles all type: 400 body, 500 controls, 600 headings, 700 wordmark.
- Headings have natural width, tracking no tighter than -0.035em, and line-height 1.14–1.25. No horizontal scaling, truncation or forced line breaks.
- Heading size responds to the text column through container units, not the entire viewport: hero 2–3.5rem, section headings 1.6–2.5rem. Hero titles reserve at least three line-heights and support copy three or four line-heights, so language changes keep the CTA position consistent while longer content can still expand.
- Body line-height is 1.7. Small uppercase type is reserved for language codes and the hero's vehicle categories.

## Layout and motifs

- Desktop hero: an even split between cobalt copy and the existing technical plate. The heading, enquiry and phone actions are immediately visible.
- Content width is capped at 1240px; desktop sections use 88px vertical spacing and mobile sections 54px.
- Three numbered process steps are followed by a compact expertise/photo section, supplier regions, linked store rows, the enquiry form, and real contact details.
- AUTO.PRO Spain and Poland are full-row links; the French physical point is a separate contact section. A third storefront can be added to the store data when supplied.
- Avoid empty placeholder cards, decorative map rings, section eyebrows, fixed-height text areas, and hidden-by-default entrance animation. All essential content remains visible.

## Interaction

- Primary hero CTA uses orange; secondary actions use cobalt, outline, or text treatments.
- Every locale includes the same enquiry form. It requires a vehicle and description, copies a localized message, and reveals a clearly labelled Instagram link. Clipboard denial shows a selectable draft. No VIN is placed in a URL.
- The copy button enables only when its script initializes; without JavaScript, the direct Instagram link remains available.
- Hover color transitions and anchor scrolling honor reduced motion. There are no scroll-reveal or pointer-parallax effects.

## Responsive behavior

- Two-column sections start at 1024px; smaller widths use a single content column capped at 720px. Grid tracks use `minmax(0, ...)` and text children can shrink safely.
- Below 600px, hero actions stack consistently, store actions sit beneath the store name, and contact values sit beneath their labels. Header navigation can wrap when the user enlarges text.
- Form fields use auto-fit tracks with a 260px minimum, capped at the available width. The copy-button explanation always occupies its own row.
- Desktop process steps share row sizing via subgrid, keeping descriptions aligned when one translated title wraps.
- Anchors (`service`, `stores`, `request`, `mandelieu`) exist on every route. Language switching retains a valid current anchor.
- Text-fit checks cover 320, 360, 390, 432, 600, 760, 761, 820, 960, 1024, 1100, 1101, 1280, 1440 and 1920px on all five routes.

## Internationalization and SEO

- Routes: Russian `/`, English `/en/`, French `/fr/`, Polish `/pl/`, Spanish `/es/`.
- Page copy is defined in each locale page; shared localized UI lives in `src/data/interface.ts`. All five routes render `src/components/LocaleLanding.astro`.
- `src/layouts/BaseLayout.astro` supplies localized metadata, hreflang, canonical, Open Graph, and Organization JSON-LD.
- Production builds must set `SITE_URL` to the final HTTPS origin so metadata URLs are absolute.
- Additional languages should reuse the locale page contract and be added to every language navigation and hreflang entry.

## Assets and provenance

- Hero technical plate: `public/assets/plates/hero-mechanical-plate.png`.
- Classic-car detail: `public/assets/plates/classic-car-detail.png` and loaded lazily.
- Source copies and embedded generation prompts are in `assets/plates/`; prompt texts are in `.impeccable/build/prompts/`.
- `impeccable embed-prompt --scan assets/plates public/assets/plates` must report zero missing prompts.
- Astro Image imports the original assets from `assets/plates/` and emits responsive WebP derivatives at build time; original provenance-bearing PNGs are retained. Hero is eager, car detail is lazy.

## Verification

Manual review captures for the current layout are kept in `.impeccable/review/` as local QA evidence. `scripts/check-text-layout.mjs` measures internal overflow, text-node rectangles, placeholder fit, cross-language hero placement and enlarged text. `scripts/review-layout.mjs` covers route semantics and form interactions. Earlier comp similarity scores and refined-* screenshots describe previous iterations.
