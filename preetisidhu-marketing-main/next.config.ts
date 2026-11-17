import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enables React's <ViewTransition>, used in the root layout to crossfade
  // between routes. Browsers without the View Transitions API simply navigate
  // without animating.
  experimental: {
    viewTransition: true,
  },
  images: {
    // next/image only serves qualities declared here; the hero asks for 82.
    qualities: [75, 82],
    // Instagram and Google both serve media from signed CDN URLs, so `search`
    // is deliberately left open for these hosts — pinning it would reject the
    // signature query string that makes the URL work.
    remotePatterns: [
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
      // Google review author avatars
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '**.ggpht.com' },
    ],
  },
}

export default nextConfig
