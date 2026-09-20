# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Astro with TypeScript, using static generation for the public site and localized routes. This is chosen for fast content delivery, strong multilingual SEO, and low client-side JavaScript. Deploy target remains open; Cloudflare Workers is the current recommendation. Dynamic request handling can be added through a small serverless endpoint when the enquiry form is specified.

## Users

Owners and custodians of premium, classic, and hard-to-source vehicles who need a specific part located and delivered. The audience includes Russian-speaking customers and customers in European markets, with localized experiences for Russian, English, French, Polish, and Spanish speakers.

## Product Purpose

Create a high-trust marketing website for Pimp Auto that explains its request-based auto-parts sourcing service, helps a visitor submit or continue a parts enquiry, and directs customers to the correct regional storefront or contact channel.

## Positioning

Pimp Auto presents itself as an automotive concierge service operating since 2011 and sourcing exclusive or difficult-to-find parts. The service is not positioned as a generic online catalogue: customers bring a need, VIN, part number, or photo and receive assistance locating a suitable part.

## Operating Context

- Current public presence: Instagram account `https://www.instagram.com/pimp_auto/`.
- The Instagram profile identifies the business as `PimpAutoHub since 2011`, describes a concierge service and exclusive auto parts, and lists WhatsApp as a contact channel.
- A physical French location exists at 865 av. de Cannes, Mandelieu-la-Napoule; it is not an online shop. Delivery or collection conditions still require confirmation.
- The verified Spanish AUTO.PRO storefront is `https://avtopro.es/seller/pimpavto-1444481/`. The verified Polish storefront is `https://avtopro.pl/seller/pimpavto-1394944/`. AUTO.PRO publicly lists seller hours (Mon–Fri 09:00–18:00; weekends closed), two contact numbers (`+48 794 551 812` and `+375 44 773 33 39`), and the French physical point at `865 av. de Cannes, Mandelieu-la-Napoule`. The French storefront link remains pending.

## Capabilities and Constraints

- Launch languages: Russian, English, French, Polish, and Spanish; the architecture must allow additional locales without redesign.
- Every language must have its own indexable URL and complete localized content rather than mixed-language pages.
- The French experience must support local-store information for Mandelieu and delivery information once confirmed.
- The site must include a reusable regional storefront component for two or three AUTO.PRO destinations. The component and data slots can be implemented before URLs are available, but dead public links must not be published.
- The site is a presentation and lead-generation surface, not a replacement ecommerce catalogue or checkout.
- Exact service geography, delivery coverage, accepted part conditions, response times, warranties, and contact workflow remain open decisions and must not be invented.

## Brand Commitments

- Brand names currently in use: Pimp Auto and PimpAutoHub.
- `since 2011` is part of the public profile identity.
- Existing Instagram imagery emphasizes premium and classic vehicles and marques including Bentley, Aston Martin, Mercedes-Benz, and Volvo.

## Evidence on Hand

- Public Instagram profile and its existing vehicle imagery.
- Confirmed physical presence and street address in Mandelieu; collection conditions remain pending.
- Confirmed Spanish and Polish AUTO.PRO storefronts, contact numbers, seller hours, and Mandelieu street address; the French storefront URL remains pending.
- No confirmed testimonials, delivery metrics, response-time promises, warranty claims, pricing, or complete case studies are available yet; future work must not fabricate them.

## Product Principles

- Make a parts request feel simpler and more personal than searching a generic catalogue.
- Establish trust with real locations, real cases, and verifiable details rather than broad claims.
- Localize the offer for each market instead of merely translating interface labels.
- Keep new languages, regional storefronts, marques, and case studies easy to add without restructuring the site.
- Prioritize fast loading, mobile use, crawlable content, and clear contact actions.

## Accessibility & Inclusion

The public site should meet WCAG 2.2 AA in its core navigation, language switching, forms, focus behavior, contrast, and image alternatives.
