/**
 * Intrinsic dimensions of an image, read straight from its header bytes.
 *
 * `next/image` needs a width and a height for any `src` that is not a static
 * import. Campaign creatives are dropped into `public/creatives/` by hand, so
 * there is nothing to import and nobody to type the numbers in — we read the
 * few header bytes that carry the size instead.
 *
 * Covers the four formats a designer is likely to send. Anything else returns
 * null and the caller skips the file rather than guessing an aspect ratio.
 */

export type ImageSize = { width: number; height: number }

export function imageSize(buf: Buffer): ImageSize | null {
  return png(buf) ?? jpeg(buf) ?? webp(buf) ?? gif(buf)
}

/** IHDR is always the first chunk, so the size sits at a fixed offset. */
function png(b: Buffer): ImageSize | null {
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
}

/**
 * Walk the segment chain to the start-of-frame marker. The size cannot be read
 * from a fixed offset because EXIF blocks and colour profiles sit in front of
 * it, and a phone photo's embedded thumbnail can be tens of kilobytes.
 */
function jpeg(b: Buffer): ImageSize | null {
  if (b.length < 4 || b.readUInt16BE(0) !== 0xffd8) return null

  let i = 2
  while (i + 9 < b.length) {
    // Segments are padded with 0xFF bytes; skip until the next real marker.
    if (b[i] !== 0xff) {
      i++
      continue
    }
    const marker = b[i + 1]

    // Standalone markers carry no length field.
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2
      continue
    }

    const length = b.readUInt16BE(i + 2)
    // SOF0–SOF15, minus the three markers in that range that are not frames.
    const isFrame =
      marker >= 0xc0 && marker <= 0xcf &&
      marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc

    if (isFrame) return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) }
    if (length < 2) return null
    i += 2 + length
  }
  return null
}

/** Each of the three WebP payload types stores its size differently. */
function webp(b: Buffer): ImageSize | null {
  if (b.length < 30) return null
  if (b.toString('ascii', 0, 4) !== 'RIFF') return null
  if (b.toString('ascii', 8, 12) !== 'WEBP') return null

  switch (b.toString('ascii', 12, 16)) {
    case 'VP8 ': // lossy: 14-bit dimensions after the 3-byte start code
      return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
    case 'VP8L': {
      // lossless: width-1 and height-1 packed into 28 bits after the signature
      const bits = b.readUInt32LE(21)
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
    }
    case 'VP8X': // extended: 24-bit canvas size, also stored minus one
      return {
        width: (b[24] | (b[25] << 8) | (b[26] << 16)) + 1,
        height: (b[27] | (b[28] << 8) | (b[29] << 16)) + 1,
      }
    default:
      return null
  }
}

function gif(b: Buffer): ImageSize | null {
  if (b.length < 10 || b.toString('ascii', 0, 3) !== 'GIF') return null
  return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) }
}
