import Image from 'next/image'
import Link from 'next/link'
import { CreativeGrid } from './creative-grid'
import { IconArrow, IconInstagram } from './icons'
import { Reveal } from './reveal'
import { getCreatives } from '@/lib/creatives'
import { INSTAGRAM, getInstagramPosts } from '@/lib/social'

/** First line of a caption, for the hover overlay and the alt text. */
function firstLine(caption: string, max = 90) {
  const line = caption.split('\n')[0].trim()
  if (!line) return ''
  return line.length > max ? `${line.slice(0, max - 1).trimEnd()}…` : line
}

/** How many campaign graphics the homepage shows before linking to /gallery. */
const CREATIVE_LIMIT = 6

/**
 * Latest posts from the connected Instagram account.
 *
 * Until the access token is set, the section shows the campaign graphics kept
 * in `public/creatives/` — Preeti's own artwork, not invented posts. With no
 * graphics either, it falls back to a plain follow prompt.
 */
export async function InstagramFeed() {
  const posts = await getInstagramPosts(8)
  const creatives = posts.length === 0 ? await getCreatives() : []

  return (
    <section className="section section-alt" id="instagram">
      <div className="wrap">
        <Reveal className="sec-head center">
          <span className="eyebrow center">Instagram</span>
          <h2>Follow along</h2>
          <p>
            {creatives.length > 0
              ? 'The cover we are talking about this month. Tap any graphic for the detail behind it — rates move and offers close, so call for a quote against your own age and health.'
              : 'Plain-language explainers on Super Visa rules, RESP grants and the coverage questions we get asked most.'}
          </p>
          <a
            className="ig-handle"
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconInstagram />@{INSTAGRAM.handle}
          </a>
        </Reveal>

        {posts.length > 0 ? (
          <>
            <div className="ig-grid">
              {posts.map((post, i) => {
                const caption = firstLine(post.caption)
                return (
                  <Reveal key={post.id} delay={i * 50}>
                    <a
                      className="ig-tile"
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={post.image}
                        alt={caption || `Instagram post from @${INSTAGRAM.handle}`}
                        width={400}
                        height={400}
                        sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 25vw"
                      />
                      <span className="ig-overlay">
                        <IconInstagram />
                        {caption && <span className="ig-caption">{caption}</span>}
                      </span>
                      {post.isVideo && (
                        <span className="ig-video" aria-label="Video post">
                          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                          </svg>
                        </span>
                      )}
                    </a>
                  </Reveal>
                )
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <a
                className="btn btn-ghost"
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View more on Instagram
                <IconArrow />
              </a>
            </div>
          </>
        ) : creatives.length > 0 ? (
          <>
            <Reveal>
              <CreativeGrid items={creatives.slice(0, CREATIVE_LIMIT)} />
            </Reveal>

            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: 32,
              }}
            >
              {creatives.length > CREATIVE_LIMIT && (
                <Link className="btn btn-ghost" href="/gallery">
                  See all {creatives.length} graphics
                  <IconArrow />
                </Link>
              )}
              <a
                className="btn btn-ghost"
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconInstagram />
                Follow on Instagram
              </a>
            </div>
          </>
        ) : (
          <Reveal>
            <a
              className="ig-cta"
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ig-cta-mark">
                <IconInstagram />
              </span>
              <span>
                <strong>@{INSTAGRAM.handle}</strong>
                <span>
                  Follow for Super Visa updates, RESP and RRSP explainers, and answers
                  to the questions clients ask most.
                </span>
              </span>
              <span className="btn btn-primary btn-sm">
                Follow
                <IconArrow />
              </span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}
