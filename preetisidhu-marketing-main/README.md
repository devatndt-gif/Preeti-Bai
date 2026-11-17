# Preeti Sidhu — Insurance and Investments

Marketing site for [preetisidhu.com](https://www.preetisidhu.com). Next.js 16 (App
Router, Turbopack), React 19, TypeScript, plain CSS with a token-driven theme.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. Everything except the database
is optional — an unconfigured integration degrades to a sensible fallback rather
than breaking the page.

### CRM (lead capture)

```bash
DATABASE_URL="postgresql://user:password@host:5432/database"
CRM_SUBDOMAIN="preetisidhu"
```

The quote form posts to `POST /api/enquiry`, which writes an `INTERESTED` row into
the CRM's `Client` table for the resolved tenant, links it to a `Product` row when
the visitor picked one off the menu, then fires two emails. **A `Tenant` row with
`subdomain = CRM_SUBDOMAIN` and `active = true` must exist**, or the route returns
503 and the form tells the visitor to phone instead.

Outgoing mail uses the SMTP settings stored on that tenant row (`smtpHost`,
`smtpUser`, `smtpPass`, `fromEmail`, and so on). If they are unset, lead capture
still works and only the emails are skipped. Set `notifyOnEnquiry` and
`notifyEmail` on the tenant to receive the advisor notification.

### Careers (recruitment leads)

```bash
CAREERS_UPLOAD_DIR=""       # default: <project>/public/uploads/careers
CAREERS_UPLOAD_BASE_URL=""  # default: https://www.preetisidhu.com/uploads/careers
```

`/join-our-team` is a **job** lead, not an insurance one, so it has its own form
and its own route. `POST /api/careers` writes the applicant to the CRM's
`SubAgent` table as a pending recruit: agreement `NOT_SENT`, commission `0`, and
the application itself (licensing, experience, languages, availability, city and
message) written into `notes` as readable text. Nobody becomes a real sub-agent
until someone in the CRM fills in commission and parent agent.

Two consequences of writing that row from outside the CRM. Contact details are
compared the way the CRM compares them — email lower-cased, phone stripped to
digits — so a second application returns 409 rather than creating a row the CRM
would then refuse to edit. And the CRM's `SUBAGENT_CREATED` workflow trigger does
**not** fire, because that runs inside the CRM app.

A CV is optional. It is accepted as PDF or Word up to 5 MB, written to
`CAREERS_UPLOAD_DIR` under a timestamped name, and recorded as a `Document` row
(category `OTHER`) linked to the sub-agent, with `fileUrl` built from
`CAREERS_UPLOAD_BASE_URL` so the CRM can link to it across domains. Storing the
file is best-effort: if the directory is not writable the application is still
recorded and the advisor email says no CV was attached. The defaults assume a
host with a writable, persistent filesystem — on a read-only or ephemeral host
point both variables at shared storage the CRM can also serve.

### Instagram feed

```bash
INSTAGRAM_ACCESS_TOKEN=""
INSTAGRAM_USER_ID=""
NEXT_PUBLIC_INSTAGRAM_HANDLE="insurewithpreetisidhu"
```

To get the token:

1. The account must be an Instagram **Business or Creator** account linked to a
   Facebook Page. A personal account cannot be read by the API at all.
2. At [developers.facebook.com](https://developers.facebook.com/apps) create an
   app, add the **Instagram** product, and connect the account.
3. Generate a **long-lived access token** and paste it into
   `INSTAGRAM_ACCESS_TOKEN`. Leave `INSTAGRAM_USER_ID` empty unless you need to
   read an account other than the token's own.

Two things worth knowing. The long-lived token **expires after 60 days** and has
to be refreshed, so put a reminder on it or add a scheduled job. And when it does
lapse the feed logs a 400 and the section quietly falls back to the follow prompt,
so the page keeps working but the posts stop updating without an obvious signal.

Changing `NEXT_PUBLIC_INSTAGRAM_HANDLE` moves every Instagram link on the site,
including the header, footer and the fallback card. The feed itself still needs
the token.

### Google reviews

```bash
GOOGLE_PLACES_API_KEY=""
GOOGLE_PLACE_ID=""
```

1. In [Google Cloud Console](https://console.cloud.google.com/) create a project
   and enable **Places API (New)**. Billing has to be enabled, though this usage
   sits well inside the free tier.
2. Create an API key and restrict it to the Places API.
3. Find the Place ID for the Google Business Profile using the
   [Place ID finder](https://developers.google.com/maps/documentation/places/web-service/place-id).

Google returns **at most five reviews** and gives no control over which ones. That
is a platform limit, not a setting in this codebase. Until both values are set the
section still renders the rating card, with working "Read all reviews" and "Leave
a review" buttons pointing at a Maps search for the business.

Neither section ever displays invented content. With no credentials the reviews
block shows only real links, and the Instagram block shows a follow prompt, rather
than placeholder posts or testimonials.

Both feeds are fetched server-side and cached for one hour. No key reaches the
browser.

## Where the content lives

Almost everything on the site is data-driven. To change copy you usually edit one
of three files rather than a page:

| File | Drives |
| --- | --- |
| `lib/products.ts` | All 17 products: menu, homepage grids, `/products`, every `/products/[slug]` page, FAQs, sitemap |
| `lib/site.ts` | Brand, contact details, social links, stats, insurer partners, "why us", process steps |
| `lib/creatives.ts` | Titles, alt text, product links and disclaimers for the campaign graphics |
| `lib/social.ts` | Instagram handle and feed, Google review fetching and listing links |

Adding a product to `PRODUCTS` gives it a nav entry, cards, a full page and a
sitemap entry with no other changes. Set `featured: true` to surface it in the
homepage hero grid — featured products render a photo, so give each one a
distinct `image`.

## Routes

```
/                          Homepage
/about                     About the practice
/products                  All products, grouped by category
/products/[slug]           17 statically generated product pages
/contact                   Contact details, map and quote form
/gallery                   Campaign graphics, generated from public/creatives/
/join-our-team             Recruiting page
/privacy-policy  /terms    Legal
/sitemap.xml  /robots.txt  Generated from lib/products.ts
/api/enquiry               POST — insurance lead capture
/api/careers               POST — job application, multipart with optional CV
```

## Theming

Light and dark are driven entirely by CSS custom properties in `app/globals.css`.
An inline script in `app/layout.tsx` applies the saved or system theme before
first paint, so there is no flash. Two tokens are easy to confuse:

- `--navy` is an **accent** colour and deliberately flips to light blue in dark mode.
- `--band` is the **ground** for the dark bands (topbar, page heroes, CTA, footer).
  Use this one for large dark surfaces.

## Assets

`public/` holds the logo, insurer logos and photography taken from the previous
site. Two notes:

- `preeti-portrait.png` is the studio photograph of Preeti, cut out of its white
  studio background so it can stand on the dark hero. It is the main figure on the
  homepage hero and in the About page panel. The source is 600 px wide, so it is
  never rendered above ~420 px CSS; if a higher-resolution original turns up,
  replace the file and re-cut the background rather than upscaling this one.
- `preeti-logo-square.jpg` is the square **logo**, not a photograph. It is still
  what `.brand-panel` shows without the `.portrait` modifier.
- Insurer logo dimensions are recorded in `PARTNERS` in `lib/site.ts` so
  `next/image` gets true intrinsic sizes. Update them if a logo is replaced.
- `public/creatives/` holds the social campaign graphics. Anything dropped in
  there appears on the homepage, on `/gallery` and in the sidebar of the product
  it promotes, with no code change — dimensions are read from the file itself.
  See `public/creatives/README.md`, and add an entry to `CREATIVE_META` in
  `lib/creatives.ts` for real alt text and, where a premium is quoted, the
  disclaimer that has to travel with it.

Instagram and Google images are served from their own CDNs, which are allow-listed
in `next.config.ts`. Those two hosts intentionally permit any query string,
because the URLs are signed.

## Things to confirm before launch

- **Instagram handle** is set to `insurewithpreetisidhu`. Change
  `NEXT_PUBLIC_INSTAGRAM_HANDLE` if that is not the business account.
- **Stats** in `lib/site.ts` (`12+` years advising, `48h` quote time) are
  placeholders that read as claims. Confirm or change them.
- **WhatsApp number** uses the published phone number, `+1 416 427 3232`. The old
  site's WhatsApp link pointed at a different number (`+1 306 472 2020`).
- **Licensing details.** Canadian insurance sites usually name the licensed entity
  and province of licence. Nothing of the sort was published on the old site, so
  none is claimed here.
