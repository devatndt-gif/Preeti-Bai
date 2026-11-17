import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

/** Favicon: the logo's maple leaf on the brand ground. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          borderRadius: 12,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="#d31e32">
          <path d="M12 2l1.8 3.9 2.6-1-1 3.6 3.8-.7-1.6 2.9 4.4 1.1-3.6 2.3.9 2-5.1-.9.4 5.8-1.5-1.2-1.1 2.2-1.1-2.2-1.5 1.2.4-5.8-5.1.9.9-2L2 14.8l4.4-1.1-1.6-2.9 3.8.7-1-3.6 2.6 1L12 2z" />
        </svg>
      </div>
    ),
    size
  )
}
