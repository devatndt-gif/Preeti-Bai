import { IconArrow, IconGoogle, IconStar } from './icons'
import { Reveal } from './reveal'
import { getGoogleReviews } from '@/lib/social'

function Stars({ rating, label }: { rating: number; label?: string }) {
  const rounded = Math.round(rating)
  return (
    <span className="stars" role="img" aria-label={label ?? `${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <IconStar key={n} className={n <= rounded ? 'on' : undefined} aria-hidden="true" />
      ))}
    </span>
  )
}

/**
 * Live Google reviews. Until the Places API key and Place ID are set, this
 * shows the rating card with links to the real listing rather than inventing
 * reviews — placeholder testimonials on a real business would be misleading.
 */
export async function GoogleReviews() {
  const { rating, total, reviews, readUrl, writeUrl } = await getGoogleReviews()
  const hasReviews = reviews.length > 0

  return (
    <section className="section" id="reviews">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow center">Reviews</span>
          <h2>What clients say</h2>
          <p>
            Unedited reviews from our Google Business Profile. We do not screen them
            and we cannot remove them.
          </p>
        </Reveal>

        <Reveal>
          <div className="review-summary">
            <div className="review-summary-main">
              <IconGoogle className="g-mark" aria-hidden="true" />
              <div>
                <strong>
                  {rating !== null ? rating.toFixed(1) : 'Google'}
                  {rating !== null && <span className="out-of"> / 5</span>}
                </strong>
                {rating !== null ? (
                  <Stars rating={rating} label={`Rated ${rating} out of 5 on Google`} />
                ) : (
                  <span className="review-summary-sub">Business Profile</span>
                )}
                {total !== null && (
                  <span className="review-summary-sub">
                    Based on {total} Google review{total === 1 ? '' : 's'}
                  </span>
                )}
              </div>
            </div>
            <div className="review-summary-actions">
              <a
                className="btn btn-ghost btn-sm"
                href={readUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read all reviews
                <IconArrow />
              </a>
              <a
                className="btn btn-primary btn-sm"
                href={writeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Leave a review
              </a>
            </div>
          </div>
        </Reveal>

        {hasReviews && (
          <div className="grid grid-3" style={{ marginTop: 28 }}>
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 70}>
                <figure className="review">
                  <Stars rating={r.rating} label={`${r.rating} out of 5`} />
                  <blockquote>{r.text}</blockquote>
                  <figcaption>
                    {r.avatar ? (
                      // Avatars come from Google's CDN at unpredictable sizes and
                      // are tiny on screen, so a plain img avoids a needless
                      // optimizer round-trip.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="review-avatar" src={r.avatar} alt="" loading="lazy" />
                    ) : (
                      <span className="review-avatar review-avatar-fallback" aria-hidden="true">
                        {r.author.charAt(0)}
                      </span>
                    )}
                    <span>
                      <strong>{r.author}</strong>
                      {r.relativeTime && <small>{r.relativeTime}</small>}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
