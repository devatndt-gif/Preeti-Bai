/**
 * Single source of truth for brand, contact and navigation.
 * Anything that appears in more than one place on the site lives here.
 */

export const SITE = {
  name: 'Preeti Sidhu',
  legalName: 'Preeti Sidhu Insurance and Investments',
  tagline: 'Insurance and Investments',
  promise: 'Protecting What Matters Most — With Personalized Insurance Solutions',
  subPromise: 'Life, Travel, RESP, TFSA, and More — Tailored for Canadian Families',
  url: 'https://www.preetisidhu.com',
  advisor: 'Preeti Sidhu',
  established: 2016,
} as const

export const CONTACT = {
  phone: '+1 (416) 427-3232',
  phoneHref: 'tel:+14164273232',
  whatsapp: 'https://wa.me/14164273232',
  email: 'insurewithpreeti@gmail.com',
  emailHref: 'mailto:insurewithpreeti@gmail.com',
  street: 'Unit No. 209, 60 Lacoste Boulevard',
  city: 'Brampton',
  region: 'ON',
  regionLong: 'Ontario',
  country: 'Canada',
  addressLine: 'Unit No. 209, 60 Lacoste Boulevard, Brampton, Ontario',
  hours: 'Mon – Sat, 9:00 AM – 7:00 PM ET',
  languages: ['English', 'Punjabi', 'Hindi'],
} as const

export const SOCIAL = [
  {
    name: 'Instagram',
    href: `https://www.instagram.com/${
      process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'insurewithpreetisidhu'
    }/`,
    icon: 'instagram',
  },
  { name: 'WhatsApp', href: CONTACT.whatsapp, icon: 'whatsapp' },
] as const

/**
 * Credit bar at the foot of every page.
 *
 * `logo` is the path to a wordmark in `public/` once one exists; until then the
 * brand name is set in type. Add the file, point `logo` at it, and the image
 * replaces the text with no other change.
 */
export const POWERED_BY = {
  label: 'Powered by',
  services: [
    {
      name: 'BIZDOMINATE.COM',
      tagline: 'SEO, AEO, AI-Powered CRM & Business Growth',
      href: 'https://www.bizdominate.com/',
      icon: 'growth',
    },
  ],
  /**
   * `slug` is the file name to look for in `public/brand/`. Drop
   * `bizdominate.png` or `neodynatech.svg` in there and the logo replaces the text
   * automatically — see `lib/brand-logos.ts`.
   */
  brands: [
    { slug: 'bizdominate', name: 'bizDominate', href: 'https://www.bizdominate.com/' },
    // No public URL was supplied for NeoDynaTech, so the mark is not linked.
    { slug: 'neodynatech', name: 'NeoDynaTech Solutions Inc.', href: null as string | null },
  ],
} as const

/** Headline numbers used on the homepage and About page. */
export const STATS = [
  { value: 23, suffix: '+', label: 'Insurer partners', note: 'We shop the whole Canadian market' },
  { value: 12, suffix: '+', label: 'Years advising', note: 'Licensed across life, health and travel' },
  { value: 3, suffix: '', label: 'Languages spoken', note: 'English, Punjabi and Hindi' },
  { value: 48, suffix: 'h', label: 'Typical quote time', note: 'Most plans issued same week' },
] as const

/** The 23 Canadian carriers whose products are placed through this office. */
export const PARTNERS: { file: string; name: string; w: number; h: number }[] = [
  { file: '21st-century-2569ad58cc.png', name: '21st Century Travel Insurance', w: 474, h: 216 },
  { file: 'Iafinancial.png', name: 'iA Financial Group', w: 518, h: 277 },
  { file: 'assumptionlife.png', name: 'Assumption Life', w: 711, h: 226 },
  { file: 'beneva.png', name: 'Beneva', w: 681, h: 263 },
  { file: 'bmo.png', name: 'BMO Insurance', w: 687, h: 325 },
  { file: 'canadalife.png', name: 'Canada Life', w: 990, h: 489 },
  { file: 'desjardins.png', name: 'Desjardins Insurance', w: 627, h: 197 },
  { file: 'destination.png', name: 'Destination Travel Group', w: 459, h: 173 },
  { file: 'empirelife.png', name: 'Empire Life', w: 758, h: 369 },
  { file: 'equitablecanada.png', name: 'Equitable Life of Canada', w: 467, h: 238 },
  { file: 'foresteresfinancial.png', name: 'Foresters Financial', w: 684, h: 261 },
  { file: 'gms.png', name: 'GMS Insurance', w: 316, h: 170 },
  { file: 'ingleinter.png', name: 'Ingle International', w: 347, h: 162 },
  { file: 'insurecanada.png', name: 'Insure Canada', w: 588, h: 267 },
  { file: 'manulifepartner.png', name: 'Manulife', w: 855, h: 294 },
  { file: 'protectionplan.png', name: 'Travel Protection Plan', w: 579, h: 344 },
  { file: 'rbcinsurance.png', name: 'RBC Insurance', w: 677, h: 360 },
  { file: 'securetravle.png', name: 'Secure Travel', w: 612, h: 289 },
  { file: 'sunlife.png', name: 'Sun Life', w: 537, h: 208 },
  { file: 'travelance.png', name: 'Travelance', w: 797, h: 193 },
  { file: 'tugo.png', name: 'TuGo', w: 799, h: 377 },
  { file: 'uv-insurance.png', name: 'UV Insurance', w: 896, h: 323 },
  { file: 'wawanesa.png', name: 'Wawanesa Life', w: 660, h: 301 },
]

export const WHY_US = [
  {
    icon: 'compass',
    title: 'Personalized Guidance',
    body: 'We take the time to understand your lifestyle, budget, and goals before recommending coverage.',
  },
  {
    icon: 'shield',
    title: 'Expertise You Can Trust',
    body: 'Years of experience in the Canadian insurance landscape help you make confident, informed decisions.',
  },
  {
    icon: 'globe',
    title: 'Multilingual & Culturally Attuned',
    body: 'We offer services in English, Punjabi, and Hindi for South Asian families across Canada.',
  },
  {
    icon: 'bolt',
    title: 'Fast, Hassle-Free Process',
    body: 'We handle the paperwork so you don’t have to — often with no medical exam required.',
  },
  {
    icon: 'layers',
    title: 'Comprehensive Coverage',
    body: 'From life insurance to RESP and RRSP, you get complete protection under one roof.',
  },
  {
    icon: 'handshake',
    title: 'Strong Industry Partnerships',
    body: 'We work with top Canadian providers to give you competitive rates and trusted reliability.',
  },
] as const

/** How an enquiry actually progresses, shown on the homepage. */
export const PROCESS = [
  {
    step: '01',
    title: 'Tell us what you need',
    body: 'A short call or form. We ask about your family, your budget, and the risk you want covered.',
  },
  {
    step: '02',
    title: 'We shop the market',
    body: 'We compare plans across 23+ Canadian insurers and explain the trade-offs in plain language.',
  },
  {
    step: '03',
    title: 'Apply without the paperwork',
    body: 'We complete the application with you, handle the underwriting, and chase the insurer for you.',
  },
  {
    step: '04',
    title: 'Reviewed every year',
    body: 'Your needs change. We revisit your coverage annually and adjust it as your life moves on.',
  },
] as const
