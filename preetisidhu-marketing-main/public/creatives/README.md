# Campaign creatives

Every image in this folder appears on the site automatically:

- the **Instagram section** of the homepage, until a real Instagram token is set
- the **/gallery** page, in full
- the **product page sidebar**, when the creative is tagged to a product

Nothing else needs editing to add one. Drop the file in, refresh, and it is live.

## Naming

Name the file after what it promotes, in lower case with hyphens:

```
mortgage-insurance-term-20.jpg
critical-illness-25-illnesses.jpg
term-life-premium-reduction.jpg
travel-insurance-coverage.jpg
insurance-services-overview.jpg
```

A file whose name contains a product slug (`mortgage-insurance`,
`critical-illness-insurance`, `travel-insurance`, `resp`, …) is linked to that
product automatically. The slugs are the URLs under `/products/`.

## Getting the title, alt text and disclaimer right

Discovered files get a title guessed from the file name and generic alt text.
For anything that stays on the site, add an entry to `CREATIVE_META` in
`lib/creatives.ts` keyed by the file name without its extension. That sets:

- `title` — shown on the tile and in the viewer
- `alt` — what a screen reader and Google see; describe the words in the artwork
- `product` — the product page the viewer's button links to
- `note` — a disclaimer shown under the image

**Any creative quoting a premium, a rate or a statistic needs a `note`.** A
figure like "$27.45 a month" is an illustration for one age and health class,
and it needs to say so wherever it is published.

## Formats and size

JPEG, PNG, WebP or GIF. Dimensions are read from the file, so square and
portrait artwork can sit side by side. Export at roughly 1080px on the long edge
and keep files under about 1 MB — Next.js re-encodes and resizes on delivery.
