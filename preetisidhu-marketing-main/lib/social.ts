/**
 * Instagram feed and Google reviews.
 *
 * Both read live data when credentials are present and return empty results
 * otherwise, so the site works before the accounts are connected. Nothing here
 * ever invents a post or a review — the components fall back to a plain link to
 * the real profile rather than showing placeholder social proof.
 *
 * Required environment variables (see README):
 *   INSTAGRAM_ACCESS_TOKEN   long-lived Instagram Graph API token
 *   INSTAGRAM_USER_ID        optional; defaults to "me" for the token's own account
 *   GOOGLE_PLACES_API_KEY    Google Cloud key with the Places API (New) enabled
 *   GOOGLE_PLACE_ID          the Place ID of the Google Business Profile
 */

import { CONTACT, SITE } from './site'

/** Refresh window for both feeds, in seconds. */
const ONE_HOUR = 3600

// ── Instagram ────────────────────────────────────────────────────────────────

/** Change the handle here (or via env) and every link on the site follows. */
const IG_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'insurewithpreetisidhu'

export const INSTAGRAM = {
  handle: IG_HANDLE,
  url: `https://www.instagram.com/${IG_HANDLE}/`,
}

export type InstagramPost = {
  id: string
  permalink: string
  image: string
  caption: string
  isVideo: boolean
  timestamp: string
}

type IgApiItem = {
  id: string
  permalink?: string
  caption?: string
  media_type?: string
  media_url?: string
  thumbnail_url?: string
  timestamp?: string
}

/**
 * Most recent posts from the connected Instagram account.
 * Returns [] when unconfigured or when the API call fails — the caller renders
 * a link to the profile instead.
 */
export async function getInstagramPosts(limit = 8): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return []

  const userId = process.env.INSTAGRAM_USER_ID ?? 'me'
  const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp'
  const url =
    `https://graph.instagram.com/${userId}/media` +
    `?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(token)}`

  try {
    const res = await fetch(url, { next: { revalidate: ONE_HOUR, tags: ['instagram'] } })

    if (!res.ok) {
      // A 400 here almost always means the long-lived token has expired; it
      // lasts 60 days and must be refreshed.
      console.error(`[instagram] ${res.status} ${res.statusText}`)
      return []
    }

    const json = (await res.json()) as { data?: IgApiItem[] }

    return (json.data ?? [])
      .map((item): InstagramPost | null => {
        const isVideo = item.media_type === 'VIDEO'
        // Videos expose a still in thumbnail_url; media_url is the mp4.
        const image = isVideo ? item.thumbnail_url : item.media_url
        if (!image || !item.permalink) return null

        return {
          id: item.id,
          permalink: item.permalink,
          image,
          caption: (item.caption ?? '').trim(),
          isVideo,
          timestamp: item.timestamp ?? '',
        }
      })
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, limit)
  } catch (err) {
    console.error('[instagram] fetch failed', err)
    return []
  }
}

// ── Google reviews ───────────────────────────────────────────────────────────

export type GoogleReview = {
  id: string
  author: string
  authorUrl?: string
  avatar?: string
  rating: number
  text: string
  relativeTime: string
}

export type GoogleReviewSummary = {
  rating: number | null
  total: number | null
  reviews: GoogleReview[]
  /** Link to the listing, always present so the section is useful unconfigured. */
  readUrl: string
  writeUrl: string
}

type PlacesReview = {
  name?: string
  rating?: number
  relativePublishTimeDescription?: string
  text?: { text?: string }
  originalText?: { text?: string }
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
}

/** Falls back to a Maps search when no Place ID is configured. */
function listingUrls(placeId?: string) {
  if (placeId) {
    return {
      readUrl: `https://search.google.com/local/reviews?placeid=${placeId}`,
      writeUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
    }
  }
  const query = encodeURIComponent(`${SITE.legalName} ${CONTACT.addressLine}`)
  const search = `https://www.google.com/maps/search/?api=1&query=${query}`
  return { readUrl: search, writeUrl: search }
}

/**
 * Rating summary and the reviews Google exposes. The Places API returns at most
 * five, which is a platform limit rather than something we choose.
 */
export async function getGoogleReviews(): Promise<GoogleReviewSummary> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  const urls = listingUrls(placeId)
  const empty: GoogleReviewSummary = { rating: null, total: null, reviews: [], ...urls }

  if (!key || !placeId) return empty

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
      },
      next: { revalidate: ONE_HOUR, tags: ['google-reviews'] },
    })

    if (!res.ok) {
      console.error(`[google-reviews] ${res.status} ${res.statusText}`)
      return empty
    }

    const json = (await res.json()) as {
      rating?: number
      userRatingCount?: number
      reviews?: PlacesReview[]
      googleMapsUri?: string
    }

    const reviews = (json.reviews ?? [])
      .map((r, i): GoogleReview | null => {
        const text = (r.text?.text ?? r.originalText?.text ?? '').trim()
        const author = r.authorAttribution?.displayName?.trim()
        if (!text || !author) return null
        return {
          id: r.name ?? `review-${i}`,
          author,
          authorUrl: r.authorAttribution?.uri,
          avatar: r.authorAttribution?.photoUri,
          rating: r.rating ?? 5,
          text,
          relativeTime: r.relativePublishTimeDescription ?? '',
        }
      })
      .filter((r): r is GoogleReview => r !== null)

    return {
      rating: json.rating ?? null,
      total: json.userRatingCount ?? null,
      reviews,
      // Prefer the canonical Maps URI Google returns for reading.
      readUrl: json.googleMapsUri ?? urls.readUrl,
      writeUrl: urls.writeUrl,
    }
  } catch (err) {
    console.error('[google-reviews] fetch failed', err)
    return empty
  }
}
