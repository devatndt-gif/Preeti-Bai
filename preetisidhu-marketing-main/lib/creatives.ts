/**
 * Campaign creatives — the square and portrait graphics Preeti posts on social.
 *
 * The catalogue is the folder: every image in `public/creatives/` is picked up
 * automatically, so a new file from the client needs no code change to appear
 * on the site. Adding a matching entry to `CREATIVE_META` below is optional and
 * only buys a better title, alt text, a product link and a disclaimer.
 *
 * Sizes are read from the file headers (see `lib/image-size.ts`) because these
 * are dropped in by hand rather than statically imported, and `next/image`
 * needs true intrinsic sizes to avoid layout shift.
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import { imageSize } from './image-size'
import { PRODUCTS } from './products'
import { SITE } from './site'

const DIR = path.join(process.cwd(), 'public', 'creatives')
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

export type Creative = {
  /** File name including extension, and the key used for ordering. */
  file: string
  src: string
  width: number
  height: number
  title: string
  alt: string
  /** Slug of the product this promotes, when it maps to one. */
  product?: string
  /** Shown under the image when the creative quotes a price or a statistic. */
  note?: string
}

type CreativeMeta = Omit<Creative, 'file' | 'src' | 'width' | 'height'>

/**
 * Keyed by file name without its extension, so it does not matter whether the
 * client sends a .jpg or a .png. Order here is the order on the page; files
 * with no entry follow, alphabetically.
 */
const CREATIVE_META: Record<string, CreativeMeta> = {
  'mortgage-insurance-term-20': {
    title: 'Mortgage insurance, Term 20',
    alt:
      'Campaign graphic: mortgage insurance, Term 20, $500,000 of coverage for a monthly premium of $27.45 at age 30, male.',
    product: 'mortgage-insurance',
    note:
      'Illustration only. $27.45 a month is a Term 20 rate for a 30-year-old male at standard non-smoker rates. Your premium depends on age, health and the amount of cover, and is confirmed by the insurer after underwriting.',
  },
  'critical-illness-25-illnesses': {
    title: 'Critical illness insurance',
    alt:
      'Campaign graphic: critical illness insurance covering 25+ major illnesses, with Canadian statistics on stroke, heart disease and cancer.',
    product: 'critical-illness-insurance',
    note:
      'The number of conditions covered varies by insurer and by plan. Statistics are from published Canadian health sources.',
  },
  'term-life-premium-reduction': {
    title: 'Term life premium reductions',
    alt:
      'Campaign graphic: term life insurance premium reductions, a limited time offer.',
    product: 'life-insurance',
    note: 'Insurer repricing changes without notice. Call to confirm what is available today.',
  },
  'travel-insurance-coverage': {
    title: 'Travel insurance',
    alt:
      'Campaign graphic: travel insurance for Super Visa, visitors to Canada, Canadians travelling worldwide and international students.',
    product: 'travel-insurance',
  },
  'insurance-services-overview': {
    title: 'Everything we arrange',
    alt:
      'Campaign graphic listing the services offered: life, critical illness, disability, mortgage, group health, Super Visa, visitor and travel insurance, estate and financial planning, RESP, RRSP, TFSA and FHSA.',
  },
}

const ORDER = Object.keys(CREATIVE_META)

/** "term-life-premium-reduction" → "Term life premium reduction" */
function titleFromFile(base: string): string {
  const words = base.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/** A file named after a product slug links to that product with no config. */
function productFromFile(base: string): string | undefined {
  return PRODUCTS.find((p) => base.includes(p.slug))?.slug
}

/**
 * Every creative in the folder, ordered by `CREATIVE_META` first.
 *
 * Returns [] when the folder is missing or empty — the sections that use this
 * render nothing at all rather than an empty shell, so the site is correct
 * before the first graphic arrives.
 */
export const getCreatives = cache(async (): Promise<Creative[]> => {
  let files: string[]
  try {
    files = await fs.readdir(DIR)
  } catch {
    return []
  }

  const creatives = await Promise.all(
    files
      .filter((file) => EXTENSIONS.has(path.extname(file).toLowerCase()))
      .map(async (file): Promise<Creative | null> => {
        const size = imageSize(await fs.readFile(path.join(DIR, file)))
        if (!size) {
          console.error(`[creatives] unreadable image header, skipping: ${file}`)
          return null
        }

        const base = path.basename(file, path.extname(file)).toLowerCase()
        const meta = CREATIVE_META[base]
        const title = meta?.title ?? titleFromFile(base)

        return {
          file,
          src: `/creatives/${file}`,
          width: size.width,
          height: size.height,
          title,
          alt: meta?.alt ?? `${title} — ${SITE.legalName} campaign graphic`,
          product: meta?.product ?? productFromFile(base),
          note: meta?.note,
        }
      })
  )

  const rank = (file: string) => {
    const i = ORDER.indexOf(path.basename(file, path.extname(file)).toLowerCase())
    return i === -1 ? ORDER.length : i
  }

  return creatives
    .filter((c): c is Creative => c !== null)
    .sort((a, b) => rank(a.file) - rank(b.file) || a.file.localeCompare(b.file))
})

/** The creative promoting one product, if there is one. */
export async function creativeForProduct(slug: string): Promise<Creative | undefined> {
  return (await getCreatives()).find((c) => c.product === slug)
}
