# Agency wordmarks

Logos for the "Powered by" bar at the foot of every page.

Drop a file in here named after the brand and it replaces the text wordmark on
the next request. No code change, and no dimensions to type in — they are read
from the file.

| File name | Shows as |
| --- | --- |
| `bizdominate.svg` (or `.png`, `.webp`, `.jpg`) | bizDominate |
| `neodynatech.svg` (or `.png`, `.webp`, `.jpg`) | NeoDynaTech Solutions Inc. |

SVG is preferred and is picked first when several formats are present; after
that it is PNG, WebP, then JPG. Use a **transparent** background, because the
bar is white in light mode and near-black in dark mode — a white box around the
logo will show.

The bar renders each mark at 34px tall, so a raster file wants to be at least
100px tall to stay sharp on a high-density screen.

The lookup lives in `lib/brand-logos.ts`; the names and links are in
`POWERED_BY` in `lib/site.ts`.
