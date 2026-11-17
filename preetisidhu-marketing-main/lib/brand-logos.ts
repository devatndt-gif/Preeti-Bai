/**
 * Agency wordmarks for the "Powered by" bar.
 *
 * Like the campaign creatives, the folder is the catalogue: drop a file named
 * after the brand's slug into `public/brand/` and it replaces the text
 * wordmark on the next request. No code change, no dimensions to type in.
 *
 * Recognised names, first match wins:
 *   public/brand/bizdominate.(svg|png|webp|jpg)
 *   public/brand/neodynatech.(svg|png|webp|jpg)
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import { imageSize } from './image-size'

const DIR = path.join(process.cwd(), 'public', 'brand')
/** Ordered by preference: vector first, then the lossless raster formats. */
const EXTENSIONS = ['.svg', '.png', '.webp', '.jpg', '.jpeg'] as const

export type BrandLogo = { src: string; width: number; height: number }

/**
 * Reads the ratio out of an SVG's viewBox. Falls back to a wide-ish wordmark
 * shape, which only affects the box reserved before paint — CSS sets the real
 * displayed height either way.
 */
function svgSize(markup: string): { width: number; height: number } {
  const box = markup.match(/viewBox\s*=\s*["']\s*[\d.-]+[ ,]+[\d.-]+[ ,]+([\d.]+)[ ,]+([\d.]+)/i)
  if (box) {
    const w = Number(box[1])
    const h = Number(box[2])
    if (w > 0 && h > 0) return { width: Math.round(w), height: Math.round(h) }
  }
  return { width: 300, height: 100 }
}

/** Memoised per request so a page with several bars only touches disk once. */
export const getBrandLogo = cache(async (slug: string): Promise<BrandLogo | null> => {
  for (const ext of EXTENSIONS) {
    const file = path.join(DIR, slug + ext)
    try {
      if (ext === '.svg') {
        const markup = await fs.readFile(file, 'utf8')
        return { src: `/brand/${slug}${ext}`, ...svgSize(markup) }
      }
      const size = imageSize(await fs.readFile(file))
      if (size) return { src: `/brand/${slug}${ext}`, ...size }
    } catch {
      // Not this extension; try the next one.
    }
  }
  return null
})
