# 3K Below Ankara — Website Discovery & Project Plan

## 1. Important correction up front

Despite the handle, this business has **nothing to do with Ankara, Turkey**. "Ankara" here means **African wax-print fabric**, and "3K Below" means **everything priced at ₦3,000 and below**. The account is a **Nigerian online fabric and fashion vendor** selling via Instagram + WhatsApp, with UK ties implied by the flags in the profile name.

## 2. Verified facts (read directly from the live profile)

| Item | Value |
| --- | --- |
| Handle | @3kbelowankara |
| Display name | 3K ᗷEᒪOᗯ ᗩᑎKᗩᖇᗩ 🇳🇬🇬🇧 |
| Tagline | "EVERYTHING 3K AND BELOW" |
| Offer lines | Ankara fabrics · Ready-to-wear · Thrift |
| Fulfilment | Nationwide delivery (Nigeria), 48–72 hrs |
| Only link in bio | wa.me/2348032227986 (WhatsApp, Nigerian number) |
| Audience size | 1,427 followers · 1,278–1,362 following · 192 posts |
| Story highlights | Reviews · 3kbelowthrift · Order · Payments |
| Most recent visible post | 30 November 2020 |

Verified absences: no website, no other social profile, no Google Business listing, no press coverage, no company registration record found. Searches across web, business directories and SEO databases returned zero results for this brand — the entire digital footprint is this one Instagram account.

## 3. Well-supported inferences (to confirm with the owner)

- Business model: single-operator / small-team social commerce. Orders and payments are handled manually in WhatsApp DMs (a "Payments" highlight implies bank transfer before dispatch).
- Positioning: value-led ("3K and below") rather than premium — accessible Ankara fabric, ready-to-wear pieces, and secondhand/thrift finds for price-sensitive Nigerian buyers, likely mostly women 18–35.
- Trust-building today relies on the Reviews highlight — typical for Nigerian Instagram vendors, where buyer trust is the biggest conversion barrier.
- The 🇬🇧 flag suggests either a UK-based owner, UK sourcing of thrift bales, or a UK customer segment.
- Competitive set: thousands of Instagram fabric/thrift vendors plus marketplaces (Jumia, Jiji) and established Ankara e-tailers. Differentiation is the fixed low price point, not exclusivity.

## 4. Information gaps (blocking, need the owner to answer)

1. **Is the business still trading?** No visible activity since Nov 2020. This changes everything — active shop vs. relaunch.
2. Is the ₦3,000-and-below price cap still accurate? Naira inflation since 2020 makes this unlikely as-is.
3. Product mix and stock reality: cut lengths (how many yards?), sizes for ready-to-wear, one-of-one thrift items?
4. Payments: bank transfer only, or is a gateway (Paystack/Flutterwave) acceptable?
5. Delivery: courier partners, delivery fees, Lagos vs. nationwide pricing, international/UK shipping?
6. Whether the site should **take orders** or **route to WhatsApp** (see decision below).
7. Brand assets: logo, product photography, real customer reviews, founder story.

How to close them: one structured intake call/questionnaire with the owner plus export of existing product photos and review screenshots. Nothing else in this plan should be built before questions 1, 2 and 6 are answered.

## 5. Strategic recommendation

Build a **catalogue-first storefront with WhatsApp checkout**, not a full e-commerce platform, for phase one:

- Matches how the customer already buys (DM to close).
- Avoids payment-gateway setup, refunds and stock-sync overhead while volume is low.
- Fixes the real problems: no discoverable web presence, no browsable catalogue, no trust surface, no price clarity.

Full cart + online payment is phase two, once the owner confirms volume justifies it.

## 6. Proposed site structure (phase one)

- **Home** — hero with the "Everything ₦3,000 and below" promise, trust strip (nationwide delivery, 48–72 hrs, verified reviews), featured categories, social proof, WhatsApp CTA.
- **Shop / Catalogue** — filterable grid: Ankara Fabrics · Ready-to-Wear · Thrift. Card shows photo, price, availability; each item has an "Order on WhatsApp" button that pre-fills a message with the item name.
- **Product detail** — image gallery, price, yardage/size, condition (for thrift), delivery note, WhatsApp order CTA.
- **How to Order** — the current highlight, made permanent: choose → message → pay → dispatch in 48–72 hrs.
- **Reviews** — real customer screenshots/quotes, the single biggest conversion lever.
- **About** — founder story, Nigeria/UK sourcing, why the price cap exists.
- **Contact / FAQ** — WhatsApp, delivery areas and fees, returns policy, sizing help.

## 7. Design direction

Mobile-first above all — Nigerian social-commerce traffic is overwhelmingly mobile on limited data, so the site must be light and fast. Visual language: bold Ankara-print-inspired accents against a calm neutral base so the fabrics themselves carry the colour; a confident display typeface with a highly legible body face. Deliberately avoid generic startup aesthetics; prices shown large and unambiguous in ₦.

## 8. Technical plan

- TanStack Start (this project's stack), Tailwind v4 semantic tokens in `src/styles.css`, shadcn components.
- Routes: `/` (replacing the placeholder index), `/shop`, `/shop/$slug`, `/how-to-order`, `/reviews`, `/about`, `/contact`.
- Phase one products can live in a typed local data module — no backend needed. Enable Lovable Cloud only when the owner wants self-serve product management or online payments (phase two: products table, admin auth, image storage, Paystack/Flutterwave).
- WhatsApp deep links: `https://wa.me/2348032227986?text=<prefilled item>`.
- SEO: unique `head()` per route targeting "Ankara fabric Nigeria", "cheap Ankara fabric", "thrift clothes Nigeria"; local business + product JSON-LD; lazy-loaded, compressed imagery; a proper social preview image.
- Performance budget: fast first paint on 3G, images served responsively.

## 9. Risks

- **Dormancy risk** — if the business is inactive, a website is premature; relaunch content and pricing must come first.
- **Price-cap credibility** — ₦3,000 in 2026 buys far less than in 2020; the core promise may need restating.
- **Content dependency** — the site's quality is capped by product photography quality; a shoot may be needed.
- **Single-channel dependency** — WhatsApp-only checkout means no order record; phase two should fix that.

## 10. Immediate next step

Confirm items 1, 2 and 6 in the gaps list. On approval I can start with the home page and catalogue using placeholder content structured so real products and reviews drop straight in.
