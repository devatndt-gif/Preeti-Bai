/**
 * One inline SVG set for the whole site. Stroke icons inherit currentColor and
 * size from CSS, so they restyle with the theme for free.
 */
import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const IconArrow = (p: P) => (
  <svg {...stroke} {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)
export const IconChevron = (p: P) => (
  <svg {...stroke} {...p}><path d="m6 9 6 6 6-6" /></svg>
)
export const IconCheck = (p: P) => (
  <svg {...stroke} {...p} strokeWidth={2}><path d="M20 6 9 17l-5-5" /></svg>
)
export const IconCheckCircle = (p: P) => (
  <svg {...stroke} {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>
)
export const IconPlus = (p: P) => (
  <svg {...stroke} {...p}><path d="M12 5v14" /><path d="M5 12h14" /></svg>
)
export const IconX = (p: P) => (
  <svg {...stroke} {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
)
export const IconAlert = (p: P) => (
  <svg {...stroke} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><path d="M12 16.5h.01" /></svg>
)
export const IconPhone = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M6.6 3h-.9A2.7 2.7 0 0 0 3 5.7C3 14.2 9.8 21 18.3 21a2.7 2.7 0 0 0 2.7-2.7v-.9a1.3 1.3 0 0 0-.9-1.2l-3.3-1.1a1.3 1.3 0 0 0-1.4.4l-.8 1a12.6 12.6 0 0 1-5.1-5.1l1-.8a1.3 1.3 0 0 0 .4-1.4L9.8 3.9A1.3 1.3 0 0 0 8.6 3Z" />
  </svg>
)
export const IconMail = (p: P) => (
  <svg {...stroke} {...p}><rect x="2.5" y="4.5" width="19" height="15" rx="2.5" /><path d="m3 7 8.2 5.4a1.5 1.5 0 0 0 1.6 0L21 7" /></svg>
)
export const IconPin = (p: P) => (
  <svg {...stroke} {...p}><path d="M20 10.5c0 5.5-8 11.5-8 11.5s-8-6-8-11.5a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10.5" r="2.8" /></svg>
)
export const IconClock = (p: P) => (
  <svg {...stroke} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></svg>
)
/**
 * The WhatsApp brand mark. One path, drawn edge to edge of the 24 box, so the
 * handset knocks out of the bubble rather than overlapping it.
 */
export const IconWhatsapp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488" />
  </svg>
)
export const IconInstagram = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.43.42.69.83.91 1.4.17.42.37 1.03.42 2.22.06 1.27.07 1.65.07 4.86s-.01 3.6-.07 4.86c-.05 1.2-.25 1.8-.42 2.22-.22.56-.48.97-.9 1.4-.43.42-.84.68-1.4.9-.43.17-1.03.37-2.23.42-1.26.06-1.64.07-4.86.07s-3.6 0-4.86-.07c-1.2-.05-1.8-.25-2.22-.42a3.8 3.8 0 0 1-1.4-.9c-.43-.43-.69-.84-.91-1.4-.17-.43-.37-1.03-.42-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.2.25-1.8.42-2.22.22-.57.48-.98.9-1.4.43-.42.84-.68 1.4-.9.43-.18 1.03-.38 2.23-.43C8.48 2.2 8.86 2.2 12 2.2Zm0 1.8c-3.14 0-3.5.01-4.74.07-1.1.05-1.7.23-2.1.39-.53.2-.9.45-1.3.84-.39.4-.63.77-.84 1.3-.15.4-.34 1-.39 2.1C2.58 9.94 2.57 10.3 2.57 12s.01 2.06.07 3.3c.05 1.1.24 1.7.39 2.1.2.53.45.9.84 1.3.4.39.77.63 1.3.84.4.15 1 .34 2.1.39 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.1-.05 1.7-.24 2.1-.39.53-.2.9-.45 1.3-.84.39-.4.63-.77.84-1.3.15-.4.34-1 .39-2.1.06-1.24.07-1.6.07-3.3s-.01-2.06-.07-3.3c-.05-1.1-.24-1.7-.39-2.1-.2-.53-.45-.9-.84-1.3-.4-.39-.77-.63-1.3-.84-.4-.16-1-.34-2.1-.39C15.5 4.01 15.14 4 12 4Z" />
    <path d="M12 15.3a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm0-8.4a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Z" />
    <circle cx="17.3" cy="6.7" r="1.2" />
  </svg>
)
export const IconStar = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.44 6.19 20.5 7.3 14.03 2.6 9.45l6.5-.95L12 2.6Z" />
  </svg>
)
/** Google's four-colour mark. Fixed brand colours, so it ignores currentColor. */
export const IconGoogle = (p: P) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path fill="#4285F4" d="M21.6 12.23c0-.7-.06-1.38-.18-2.03H12v3.84h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.33Z" />
    <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z" />
    <path fill="#FBBC05" d="M6.41 13.9a6 6 0 0 1 0-3.8V7.52H3.07a10 10 0 0 0 0 8.96l3.34-2.58Z" />
    <path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 2.99 14.7 2 12 2a10 10 0 0 0-8.93 5.52l3.34 2.58C7.2 7.74 9.4 5.98 12 5.98Z" />
  </svg>
)
export const IconCog = (p: P) => (
  <svg {...stroke} {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 15a1.6 1.6 0 0 0 .32 1.76l.06.06a1.9 1.9 0 1 1-2.7 2.7l-.05-.06a1.6 1.6 0 0 0-1.77-.32 1.6 1.6 0 0 0-1 1.46v.17a1.9 1.9 0 1 1-3.8 0v-.09a1.6 1.6 0 0 0-1.05-1.46 1.6 1.6 0 0 0-1.76.32l-.06.06a1.9 1.9 0 1 1-2.7-2.7l.06-.06a1.6 1.6 0 0 0 .32-1.76 1.6 1.6 0 0 0-1.46-1H3.6a1.9 1.9 0 0 1 0-3.8h.09a1.6 1.6 0 0 0 1.46-1.05 1.6 1.6 0 0 0-.32-1.76l-.06-.06a1.9 1.9 0 1 1 2.7-2.7l.06.06a1.6 1.6 0 0 0 1.76.32h.08a1.6 1.6 0 0 0 1-1.46V3.6a1.9 1.9 0 1 1 3.8 0v.09a1.6 1.6 0 0 0 1 1.46 1.6 1.6 0 0 0 1.76-.32l.06-.06a1.9 1.9 0 1 1 2.7 2.7l-.06.06a1.6 1.6 0 0 0-.32 1.76v.08a1.6 1.6 0 0 0 1.46 1h.17a1.9 1.9 0 0 1 0 3.8h-.09a1.6 1.6 0 0 0-1.45 1Z" />
  </svg>
)
export const IconSun = (p: P) => (
  <svg {...stroke} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
export const IconMoon = (p: P) => (
  <svg {...stroke} {...p}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" /></svg>
)

/* ── Product / feature icons ─────────────────────────────────────────────── */

export const IconPassport = (p: P) => (
  <svg {...stroke} {...p}><rect x="4.5" y="2.5" width="15" height="19" rx="2.5" /><circle cx="12" cy="10" r="3.2" /><path d="M9 17.5h6" /></svg>
)
export const IconPlane = (p: P) => (
  <svg {...stroke} {...p}><path d="M10.2 13.8 3 12V9.6l3 .7 1.2-2L3.6 4.4 5 3l5.4 3.6 3.6-2.4a2.3 2.3 0 0 1 3 3l-2.4 3.6L18.2 16l-1.4 1.4-3.9-3.6-2 1.2.7 3h-2.4l-1.8-7.2" /></svg>
)
export const IconSuitcase = (p: P) => (
  <svg {...stroke} {...p}><rect x="2.5" y="7.5" width="19" height="12" rx="2.5" /><path d="M8.5 7.5V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2.5" /><path d="M2.5 13h19" /></svg>
)
export const IconGraduation = (p: P) => (
  <svg {...stroke} {...p}><path d="M12 3 2.5 8 12 13l9.5-5L12 3Z" /><path d="M6.5 10.5V16c0 1.4 2.5 2.7 5.5 2.7s5.5-1.3 5.5-2.7v-5.5" /><path d="M21.5 8v5.5" /></svg>
)
export const IconHeart = (p: P) => (
  <svg {...stroke} {...p}><path d="M12 20.3 4.6 13a4.7 4.7 0 0 1 6.6-6.7l.8.8.8-.8A4.7 4.7 0 0 1 19.4 13l-7.4 7.3Z" /></svg>
)
export const IconPulse = (p: P) => (
  <svg {...stroke} {...p}><path d="M2.5 12h4l2-5 4 11 2.5-6h6.5" /></svg>
)
export const IconSupport = (p: P) => (
  <svg {...stroke} {...p}><path d="M4 13a8 8 0 0 1 16 0" /><rect x="2.5" y="13" width="4" height="6" rx="1.7" /><rect x="17.5" y="13" width="4" height="6" rx="1.7" /><path d="M19.5 19v.8a2.2 2.2 0 0 1-2.2 2.2H13" /></svg>
)
export const IconShield = (p: P) => (
  <svg {...stroke} {...p}><path d="M12 2.5 4.5 5.5v6c0 4.6 3.1 8.5 7.5 10 4.4-1.5 7.5-5.4 7.5-10v-6L12 2.5Z" /><path d="m8.8 11.8 2.2 2.2 4.2-4.4" /></svg>
)
export const IconHome = (p: P) => (
  <svg {...stroke} {...p}><path d="m3 10.5 9-7 9 7V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20v-9.5Z" /><path d="M9.5 21.5v-7h5v7" /></svg>
)
export const IconTooth = (p: P) => (
  <svg {...stroke} {...p}><path d="M12 4.2c-2-1.4-5-1.6-6.4.2-1.6 2-1 5.3-.3 8 .5 2 .6 4.2 1 6.2.2 1.2.7 2.1 1.6 2.1 1.3 0 1.5-1.6 1.8-3.2.3-1.6.5-3.3 2.3-3.3s2 1.7 2.3 3.3c.3 1.6.5 3.2 1.8 3.2.9 0 1.4-.9 1.6-2.1.4-2 .5-4.2 1-6.2.7-2.7 1.3-6-.3-8-1.4-1.8-4.4-1.6-6.4-.2Z" /></svg>
)
export const IconTeam = (p: P) => (
  <svg {...stroke} {...p}><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16.5 5.2a3.2 3.2 0 0 1 0 5.6" /><path d="M18 14.2a6.5 6.5 0 0 1 3.5 5.8" /></svg>
)
export const IconGrowth = (p: P) => (
  <svg {...stroke} {...p}><path d="M3 20.5h18" /><path d="M6.5 20.5v-6M11.5 20.5v-10M16.5 20.5v-14" /></svg>
)
export const IconWallet = (p: P) => (
  <svg {...stroke} {...p}><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a1 1 0 0 1 1 1v1.5" /><rect x="3" y="7.5" width="18" height="12" rx="2.5" /><path d="M16.5 13.5h.01" /></svg>
)
export const IconKey = (p: P) => (
  <svg {...stroke} {...p}><circle cx="8" cy="8" r="4.5" /><path d="m11.2 11.2 8.3 8.3" /><path d="m17 17-2 2M19.5 14.5l-2 2" /></svg>
)
export const IconCross = (p: P) => (
  <svg {...stroke} {...p}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M12 8v8M8 12h8" /></svg>
)
export const IconCompass = (p: P) => (
  <svg {...stroke} {...p}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></svg>
)
export const IconGlobe = (p: P) => (
  <svg {...stroke} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" /></svg>
)
export const IconBolt = (p: P) => (
  <svg {...stroke} {...p}><path d="M13 2 4 13.5h6.5L11 22l9-11.5h-6.5L13 2Z" /></svg>
)
export const IconLayers = (p: P) => (
  <svg {...stroke} {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>
)
export const IconHandshake = (p: P) => (
  <svg {...stroke} {...p}><path d="m11 6-3.5 3.5a2 2 0 0 0 2.8 2.8L12 11l2.5 2.5a1.9 1.9 0 0 0 2.7-2.7L13 6.6" /><path d="M2.5 8.5 6 5l3.5 1.5" /><path d="M21.5 8.5 18 5l-3 1" /><path d="m14 14 2 2M11.5 16l1.8 1.8" /></svg>
)

/** Maps the `icon` string used in lib data to a component. */
const REGISTRY = {
  passport: IconPassport,
  plane: IconPlane,
  suitcase: IconSuitcase,
  graduation: IconGraduation,
  heart: IconHeart,
  pulse: IconPulse,
  support: IconSupport,
  shield: IconShield,
  home: IconHome,
  tooth: IconTooth,
  team: IconTeam,
  growth: IconGrowth,
  cog: IconCog,
  wallet: IconWallet,
  key: IconKey,
  cross: IconCross,
  compass: IconCompass,
  globe: IconGlobe,
  bolt: IconBolt,
  layers: IconLayers,
  handshake: IconHandshake,
  check: IconCheckCircle,
} as const

export function ProductIcon({ name, ...rest }: { name: string } & P) {
  const Cmp = REGISTRY[name as keyof typeof REGISTRY] ?? IconShield
  return <Cmp {...rest} />
}

export const SOCIAL_ICONS = {
  instagram: IconInstagram,
  whatsapp: IconWhatsapp,
} as const
