/**
 * The full product catalogue. This file drives the mega menu, the homepage
 * grids, the sitemap and every /products/[slug] page — add a product here and
 * it appears everywhere automatically.
 *
 * Dollar figures and contribution limits are deliberately described in
 * relative terms (or flagged as CRA-set) wherever the Government of Canada
 * indexes them annually, so the copy does not go stale.
 */

export type CategoryKey = 'visitors' | 'life' | 'health' | 'savings'

export type Category = {
  key: CategoryKey
  title: string
  blurb: string
  icon: string
}

export type Faq = { q: string; a: string }

export type Product = {
  slug: string
  name: string
  /** Short label for tight spaces like the mega menu. */
  shortName: string
  category: CategoryKey
  icon: string
  image: string
  /** One line used on cards and in the menu. */
  summary: string
  /** Opening paragraph on the product page. */
  intro: string
  /** Secondary paragraph adding depth. */
  detail: string
  whoFor: string[]
  highlights: { title: string; body: string }[]
  faqs: Faq[]
  featured?: boolean
}

export const CATEGORIES: Category[] = [
  {
    key: 'visitors',
    title: 'Visitors & Travel',
    blurb: 'Cover for family visiting Canada, students arriving, and anyone leaving the country.',
    icon: 'plane',
  },
  {
    key: 'life',
    title: 'Life & Critical Illness',
    blurb: 'Protect your family’s income and your mortgage if something happens to you.',
    icon: 'heart',
  },
  {
    key: 'health',
    title: 'Health & Benefits',
    blurb: 'Day-to-day health costs for individuals, families and small businesses.',
    icon: 'cross',
  },
  {
    key: 'savings',
    title: 'Savings & Investments',
    blurb: 'Registered plans that grow your money with government grants and tax breaks.',
    icon: 'growth',
  },
]

export const PRODUCTS: Product[] = [
  // ─── Visitors & Travel ─────────────────────────────────────────────────────
  {
    slug: 'super-visa-insurance',
    name: 'Super Visa Insurance',
    shortName: 'Super Visa',
    category: 'visitors',
    icon: 'passport',
    image: '/slider/super-visa.jpg',
    featured: true,
    summary:
      'The medical coverage IRCC requires before your parents or grandparents can be approved for a Super Visa.',
    intro:
      'A Super Visa lets the parents and grandparents of Canadian citizens and permanent residents stay in Canada for years at a time rather than the usual six months. Immigration, Refugees and Citizenship Canada will not approve the application without proof of private medical insurance, so the policy has to be in place before you apply.',
    detail:
      'We place Super Visa policies that meet every IRCC condition on day one, and we structure them so you are not paying for coverage you will never use. Where a parent has diabetes, high blood pressure or a heart condition, we know which insurers underwrite those conditions well and which will decline — that is usually the difference between an approval and a refusal.',
    whoFor: [
      'Parents and grandparents of Canadian citizens or permanent residents',
      'Families applying for a first Super Visa or renewing an existing one',
      'Applicants with pre-existing conditions who have been quoted very high premiums elsewhere',
    ],
    highlights: [
      {
        title: 'Meets the IRCC minimum',
        body: 'At least $100,000 in emergency medical coverage, valid for a minimum of one year from the date of entry, from an insurer IRCC accepts.',
      },
      {
        title: 'Pre-existing conditions considered',
        body: 'Many plans cover stable pre-existing conditions after a qualifying stability period. We match the applicant to the insurer most likely to accept them.',
      },
      {
        title: 'Full refund if the visa is refused',
        body: 'If the Super Visa application is denied, the premium is refunded in full on presentation of the refusal letter.',
      },
      {
        title: 'Monthly payment plans',
        body: 'A year of coverage is a large single premium. Most of our insurers let you spread it over monthly instalments instead.',
      },
      {
        title: 'Partial refund if they leave early',
        body: 'If your parents return home before the policy ends and made no claim, the unused portion is refundable on a pro-rata basis.',
      },
      {
        title: 'Deductible options that cut the premium',
        body: 'Choosing a higher deductible can reduce the premium significantly. We model the options so you can see the real trade-off.',
      },
    ],
    faqs: [
      {
        q: 'How much Super Visa insurance is required?',
        a: 'IRCC requires a minimum of $100,000 in emergency medical coverage, valid for at least one year from the date you enter Canada. The policy must cover healthcare, hospitalization and repatriation.',
      },
      {
        q: 'Can I buy the insurance from an insurer outside Canada?',
        a: 'Since 2022 IRCC also accepts policies from insurers outside Canada, provided they are authorised to provide this coverage. Most families still choose a Canadian insurer because claims are settled directly with Canadian hospitals.',
      },
      {
        q: 'What happens if the Super Visa is refused?',
        a: 'You receive a full refund of the premium. Send us the IRCC refusal letter and we process the cancellation for you.',
      },
      {
        q: 'Are pre-existing medical conditions covered?',
        a: 'Often yes. Most insurers cover a pre-existing condition if it has been stable for a defined period — commonly 90 to 180 days — before the policy starts. The definition of "stable" varies by insurer, which is exactly where advice matters.',
      },
      {
        q: 'Can the policy be paid monthly?',
        a: 'Yes. Several of our insurers offer monthly instalments with a small deposit, rather than the full annual premium up front.',
      },
    ],
  },
  {
    slug: 'visitor-insurance',
    name: 'Visitor Insurance in Canada',
    shortName: 'Visitor Insurance',
    category: 'visitors',
    icon: 'suitcase',
    image: '/slider/travel.jpg',
    summary:
      'Emergency medical cover for family and friends visiting Canada, where provincial health care does not apply.',
    intro:
      'Visitors to Canada are not covered by provincial health insurance. A single night in a Canadian hospital can cost several thousand dollars, and an air ambulance far more. Visitor insurance turns that open-ended risk into a known premium.',
    detail:
      'Whether it is a two-week holiday or a six-month stay, we will size the coverage to the trip and the traveller’s health rather than selling a one-size-fits-all plan. Coverage can start the day they land, and can usually be extended from within Canada if plans change.',
    whoFor: [
      'Family and friends visiting on a visitor visa or eTA',
      'New permanent residents waiting out a provincial health care waiting period',
      'Returning Canadians whose provincial coverage has lapsed',
    ],
    highlights: [
      {
        title: 'Emergency medical and hospitalisation',
        body: 'Doctor visits, emergency room care, hospital stays, diagnostics and prescription drugs while in Canada.',
      },
      {
        title: 'Coverage from $25,000 to $500,000',
        body: 'Pick a limit that matches the length of stay and the traveller’s age rather than defaulting to the cheapest option.',
      },
      {
        title: 'Side trips included',
        body: 'Most plans continue to cover short trips to the United States and elsewhere, as long as Canada remains the main destination.',
      },
      {
        title: 'Buy before or after arrival',
        body: 'Policies can be issued before departure or once the visitor is already in Canada, though a waiting period may apply to the latter.',
      },
      {
        title: 'Extendable mid-stay',
        body: 'If the visit is extended, the policy can usually be extended too without a fresh medical review.',
      },
      {
        title: 'Direct billing to hospitals',
        body: 'Canadian insurers settle large claims directly with the hospital, so your family is not asked to pay up front.',
      },
    ],
    faqs: [
      {
        q: 'Is visitor insurance mandatory in Canada?',
        a: 'It is not legally mandatory for a standard visitor visa, unlike the Super Visa. It is strongly recommended, because visitors have no provincial health coverage and are billed the full cost of any care.',
      },
      {
        q: 'Can I buy it after my guest has already arrived?',
        a: 'Yes, though most insurers apply a waiting period of about 48 hours before coverage for new conditions begins. Buying before arrival avoids that gap.',
      },
      {
        q: 'Does it cover a pre-existing condition?',
        a: 'Plans are available with and without pre-existing condition coverage. The version that includes it costs more but is usually worth it for older travellers.',
      },
      {
        q: 'What is not covered?',
        a: 'Routine check-ups, dental cleanings, elective procedures, pregnancy and childbirth, and anything related to a condition that was unstable before the policy started.',
      },
    ],
  },
  {
    slug: 'travel-insurance',
    name: 'Travel Insurance',
    shortName: 'Travel Insurance',
    category: 'visitors',
    icon: 'plane',
    image: '/slider/travel.jpg',
    featured: true,
    summary:
      'Cover for Canadians travelling abroad — emergency medical, trip cancellation, interruption and baggage.',
    intro:
      'Your provincial health plan pays a small fraction of what treatment abroad actually costs, and nothing at all toward an air ambulance home. Travel insurance covers the gap, and can also refund a trip you have to cancel for a covered reason.',
    detail:
      'If you travel more than once a year, a multi-trip annual plan is almost always cheaper than buying single-trip cover each time. We work that comparison out for you, and we read the medical questionnaire carefully with you, since an inaccurate answer is the most common reason a travel claim is denied.',
    whoFor: [
      'Canadians and permanent residents travelling outside their home province',
      'Snowbirds spending winters in the United States or Mexico',
      'Frequent flyers who would be better served by an annual multi-trip plan',
    ],
    highlights: [
      {
        title: 'Emergency medical abroad',
        body: 'Hospital care, physician fees, diagnostics, prescriptions and emergency dental while outside your home province.',
      },
      {
        title: 'Trip cancellation and interruption',
        body: 'Recovers prepaid, non-refundable costs when a covered reason forces you to cancel before departure or return early.',
      },
      {
        title: 'Emergency air transport',
        body: 'Medically supervised evacuation and repatriation, routinely the single largest cost in a serious overseas claim.',
      },
      {
        title: 'Annual multi-trip plans',
        body: 'One premium covers every trip in the year up to a set number of days per trip. Usually cheaper from the third trip onward.',
      },
      {
        title: 'Baggage and travel delay',
        body: 'Compensation for lost, stolen or delayed baggage, and for meals and accommodation during a lengthy delay.',
      },
      {
        title: '24/7 emergency assistance',
        body: 'One number to call from anywhere in the world that will find a hospital, confirm coverage and arrange payment.',
      },
    ],
    faqs: [
      {
        q: 'Does my credit card travel insurance not cover this?',
        a: 'Credit card coverage is usually limited in both dollar amount and trip length, and often excludes travellers over a certain age or with pre-existing conditions. It is worth reading the certificate before relying on it.',
      },
      {
        q: 'Is a single-trip or annual plan better?',
        a: 'If you take two or more trips a year, an annual multi-trip plan is generally cheaper. We compare both before recommending one.',
      },
      {
        q: 'What if I have a heart condition or diabetes?',
        a: 'Coverage is available. You will complete a medical questionnaire, and the premium depends on how stable the condition has been. Answer it precisely — an error here is the main cause of denied claims.',
      },
      {
        q: 'When should I buy trip cancellation coverage?',
        a: 'On the day you make your first non-refundable payment. Buying later means anything that has already happened is treated as a known event and excluded.',
      },
    ],
  },
  {
    slug: 'international-student-insurance',
    name: 'International Student Insurance',
    shortName: 'Student Insurance',
    category: 'visitors',
    icon: 'graduation',
    image: '/slider/student.jpg',
    featured: true,
    summary:
      'Medical coverage for international students, meeting the requirements set by Canadian colleges and universities.',
    intro:
      'Most Canadian institutions require proof of health coverage before enrolment, and in several provinces international students are not eligible for the provincial plan at all — or only after a waiting period. A student plan bridges that gap for the length of the study permit.',
    detail:
      'Student policies are priced for young, healthy applicants, which makes them considerably cheaper than standard visitor insurance. We also make sure the certificate is in the format the school’s registrar will actually accept, which saves a round of emails at a busy time of year.',
    whoFor: [
      'International students arriving on a study permit',
      'Students in provinces where the provincial plan excludes them or imposes a waiting period',
      'Exchange and language-school students on shorter programmes',
    ],
    highlights: [
      {
        title: 'Accepted by Canadian institutions',
        body: 'Certificates issued in the format colleges and universities require as proof of coverage at enrolment.',
      },
      {
        title: 'Priced for students',
        body: 'Rates reflect a young, healthy risk pool, so premiums are well below standard visitor plans.',
      },
      {
        title: 'Walk-in and campus clinic visits',
        body: 'Everyday care as well as emergencies, so a student is not avoiding the doctor over cost.',
      },
      {
        title: 'Prescription drug coverage',
        body: 'Medication prescribed during a covered illness or injury is included up to the plan limit.',
      },
      {
        title: 'Mental health support',
        body: 'Many plans now include counselling sessions, which matters a long way from home.',
      },
      {
        title: 'Renewable each academic year',
        body: 'Coverage extends with the study permit, including through co-op terms and summer breaks.',
      },
    ],
    faqs: [
      {
        q: 'Do I need this if my province covers international students?',
        a: 'Some provinces cover students and some do not, and several impose a waiting period of up to three months. A student plan covers the waiting period and anything the provincial plan excludes.',
      },
      {
        q: 'Can my spouse and children be covered too?',
        a: 'Yes. Dependants who accompany you to Canada can be added to the same plan.',
      },
      {
        q: 'Does it cover me during the summer break or a trip home?',
        a: 'Coverage generally continues while you remain enrolled, including short trips outside Canada. Confirm the limits before an extended stay abroad.',
      },
    ],
  },
  {
    slug: 'new-immigrant-insurance',
    name: 'New Immigrant Insurance',
    shortName: 'New Immigrants',
    category: 'visitors',
    icon: 'home',
    image: '/slider/super-visa.jpg',
    summary:
      'Covers the provincial health care waiting period that new permanent residents face on arrival.',
    intro:
      'Landing in Canada as a permanent resident does not mean immediate health coverage. Several provinces, Ontario and British Columbia among them, apply a waiting period of up to three months before provincial coverage begins. Until then, you are responsible for the full cost of any medical care.',
    detail:
      'A new immigrant plan is designed to cover exactly that window, and then stop. We set the end date to line up with the day your provincial card takes effect, so you are neither exposed nor paying for coverage twice.',
    whoFor: [
      'New permanent residents inside a provincial waiting period',
      'Returning Canadians who lived abroad and have lost provincial coverage',
      'Work permit holders not yet eligible for a provincial plan',
    ],
    highlights: [
      {
        title: 'Covers the waiting period exactly',
        body: 'Coverage is set to end the day provincial health insurance begins, so you never pay for both at once.',
      },
      {
        title: 'Emergency and walk-in care',
        body: 'Hospital, physician and diagnostic costs while you are without a provincial health card.',
      },
      {
        title: 'Family coverage on one policy',
        body: 'Spouse and children are covered under a single plan and a single premium.',
      },
      {
        title: 'No Canadian medical history needed',
        body: 'Underwriting is designed for people who have just arrived and have no local health records.',
      },
      {
        title: 'Prescription drugs included',
        body: 'Medication for a covered condition is included, which matters most for anyone on ongoing treatment.',
      },
      {
        title: 'A path to permanent coverage',
        body: 'When provincial coverage starts, we review whether a private health and dental plan is worth adding.',
      },
    ],
    faqs: [
      {
        q: 'How long is the provincial waiting period?',
        a: 'It depends on the province. Ontario and British Columbia have historically applied up to three months; Alberta and Manitoba typically cover new residents immediately. We confirm the current rule for your province before setting the policy dates.',
      },
      {
        q: 'What happens when my provincial coverage begins?',
        a: 'The policy ends as scheduled. If you paid for a longer term, the unused portion is refunded provided no claim was made.',
      },
      {
        q: 'Should I keep private coverage afterwards?',
        a: 'Provincial plans do not cover prescription drugs, dental, vision or paramedical care for most adults. A drug and dental plan fills that gap and is worth reviewing once you are settled.',
      },
    ],
  },

  // ─── Life & Critical Illness ───────────────────────────────────────────────
  {
    slug: 'life-insurance',
    name: 'Life Insurance',
    shortName: 'Life Insurance',
    category: 'life',
    icon: 'heart',
    image: '/slider/life.jpg',
    featured: true,
    summary:
      'A tax-free payment to the people who depend on you, so your income does not disappear when you do.',
    intro:
      'Life insurance answers a blunt question: if your income stopped permanently tomorrow, could your family stay in their home and keep their plans intact? The benefit is paid tax-free to the beneficiaries you name, and it bypasses probate, so it arrives when it is needed rather than months later.',
    detail:
      'The real decision is not which insurer but which structure. Term insurance buys the largest benefit for the lowest premium over a fixed period, which suits a mortgage and young children. Permanent insurance costs more but never expires and builds cash value you can borrow against. We size the coverage against your actual obligations instead of applying a rule of thumb.',
    whoFor: [
      'Parents whose children depend on their income',
      'Homeowners with a mortgage that would outlive them',
      'Business owners with a partner, a loan guarantee, or a succession plan',
      'Anyone wanting to leave an estate free of tax and probate delay',
    ],
    highlights: [
      {
        title: 'Term life',
        body: 'Coverage for a set period — commonly 10, 20 or 30 years — at the lowest cost per dollar of benefit. Renewable and usually convertible.',
      },
      {
        title: 'Whole and universal life',
        body: 'Permanent coverage that never expires and accumulates cash value you can access during your lifetime.',
      },
      {
        title: 'Paid tax-free, outside probate',
        body: 'The death benefit goes directly to your named beneficiaries. It is not taxable income and is not delayed by the estate.',
      },
      {
        title: 'Convertible without new medicals',
        body: 'A convertible term policy can become permanent later without re-answering health questions — valuable if your health changes.',
      },
      {
        title: 'Joint and family options',
        body: 'Cover two lives on one policy, and add child riders that convert to their own coverage in adulthood.',
      },
      {
        title: 'Living benefit riders',
        body: 'Add critical illness or disability coverage to the same policy so one plan covers more than one risk.',
      },
    ],
    faqs: [
      {
        q: 'How much life insurance do I actually need?',
        a: 'Add up what would still have to be paid: the mortgage balance, other debts, the cost of raising and educating your children, and enough to replace your income for the years your family would need it. Subtract existing savings and group coverage. We do this calculation with you.',
      },
      {
        q: 'Is term or permanent insurance better?',
        a: 'Neither is universally better. Term costs far less and suits a defined period of responsibility such as a mortgage. Permanent suits estate planning, a lifelong dependant, or a tax-efficient way to transfer wealth. Many families hold both.',
      },
      {
        q: 'Is the coverage from my employer enough?',
        a: 'Group life is typically one or two times salary and ends when you leave the job, exactly when you may be least insurable. Treat it as a supplement, not a plan.',
      },
      {
        q: 'Will I need a medical exam?',
        a: 'Not always. Many plans up to a certain benefit amount are issued on health questions alone. No-medical options exist where health history is a barrier.',
      },
      {
        q: 'Does smoking or a health condition mean I cannot get covered?',
        a: 'No, though it affects the premium and which insurers will offer the best terms. Insurers rate conditions very differently, which is the main reason to apply through a broker rather than direct.',
      },
    ],
  },
  {
    slug: 'critical-illness-insurance',
    name: 'Critical Illness Insurance',
    shortName: 'Critical Illness',
    category: 'life',
    icon: 'pulse',
    image: '/slider/critical-illness.jpg',
    featured: true,
    summary:
      'A tax-free lump sum on diagnosis of a covered condition, paid whether or not you stop working.',
    intro:
      'Canadian health care pays for your treatment. It does not pay your mortgage while you recover, cover a spouse taking unpaid leave, fund a drug that is not on the provincial formulary, or pay for care outside the country. Critical illness insurance pays you a lump sum on diagnosis, and you decide what it is for.',
    detail:
      'Most plans cover the big three — cancer, heart attack and stroke — which account for the large majority of claims, while comprehensive plans extend to twenty-five or more conditions. The benefit is paid after a survival period, typically thirty days, and it is yours tax-free with no restriction on how it is spent.',
    whoFor: [
      'Self-employed people and contractors with no sick leave',
      'Single-income households where illness would stop the income entirely',
      'Anyone with a family history of cancer, heart disease or stroke',
      'Business owners who would need to cover a locum or key employee',
    ],
    highlights: [
      {
        title: 'Lump sum on diagnosis',
        body: 'Paid once you survive the qualifying period, typically thirty days. You do not have to be unable to work to claim.',
      },
      {
        title: 'Spend it on anything',
        body: 'Mortgage payments, a spouse’s lost income, private treatment, travel for care, or simply time to recover without financial pressure.',
      },
      {
        title: 'Cancer, heart attack and stroke',
        body: 'The three conditions behind the overwhelming majority of claims are covered by every plan we place.',
      },
      {
        title: 'Comprehensive plans, 25+ conditions',
        body: 'Broader plans add multiple sclerosis, Parkinson’s, major organ transplant, severe burns, blindness and more.',
      },
      {
        title: 'Return of premium',
        body: 'An optional rider refunds the premiums you paid if you never claim — turning the cost into deferred savings.',
      },
      {
        title: 'Child coverage available',
        body: 'Plans covering childhood conditions cost very little and let a parent stop working during a child’s treatment.',
      },
    ],
    faqs: [
      {
        q: 'How is this different from disability insurance?',
        a: 'Critical illness pays a single lump sum on diagnosis regardless of whether you can work. Disability insurance pays a monthly income only while you are unable to work. They solve different problems and many people hold both.',
      },
      {
        q: 'What if I recover quickly?',
        a: 'You keep the money. The benefit is triggered by the diagnosis and the survival period, not by how long the illness lasts.',
      },
      {
        q: 'Are early-stage cancers covered?',
        a: 'Many plans pay a partial benefit, often 10 to 15 percent of the coverage, for early-stage conditions, without reducing the full benefit if a covered condition follows later.',
      },
      {
        q: 'What does return of premium cost?',
        a: 'It raises the premium meaningfully, but refunds everything you paid if you never claim. For younger applicants it often works out well; we will show you the numbers for your age.',
      },
    ],
  },
  {
    slug: 'disability-insurance',
    name: 'Disability Insurance',
    shortName: 'Disability',
    category: 'life',
    icon: 'support',
    image: '/slider/life.jpg',
    summary:
      'Replaces a share of your monthly income if illness or injury stops you from working.',
    intro:
      'Your ability to earn is the asset every other plan rests on. A serious illness or injury is far more likely during your working years than death, yet income protection is the coverage most often skipped. Disability insurance replaces a portion of your earnings — commonly 60 to 70 percent — for as long as you cannot work.',
    detail:
      'The wording matters more than the price here. An "own occupation" definition pays if you cannot perform your own job; an "any occupation" definition only pays if you cannot perform any job you are suited to, and is far harder to claim on. We read those clauses with you before you sign.',
    whoFor: [
      'Self-employed people and contractors with no group coverage',
      'Professionals whose income depends on a specific skill or licence',
      'Employees whose group plan is capped well below their actual income',
      'Anyone whose household could not absorb several months without pay',
    ],
    highlights: [
      {
        title: 'Monthly benefit, tax-free',
        body: 'When you pay the premiums personally, the benefit arrives tax-free — so 60 percent of gross income often replaces most of your take-home pay.',
      },
      {
        title: 'Own-occupation definitions',
        body: 'Pays if you cannot perform the duties of your own profession, even if you could do other work. The single most important clause in the policy.',
      },
      {
        title: 'Waiting period you choose',
        body: 'A longer wait before benefits begin lowers the premium. We match it to how long your savings could realistically carry you.',
      },
      {
        title: 'Benefit periods to age 65',
        body: 'Choose two years, five years, or coverage right through to retirement for a genuinely long-term illness.',
      },
      {
        title: 'Non-cancellable contracts',
        body: 'The insurer cannot change your premium or cancel the policy as long as you pay, regardless of how your health changes.',
      },
      {
        title: 'Partial and residual benefits',
        body: 'Pays a proportionate benefit when you return part-time or at reduced earnings, rather than an all-or-nothing test.',
      },
    ],
    faqs: [
      {
        q: 'Does government support not cover this?',
        a: 'EI sickness benefits are capped and run for a limited number of weeks. CPP disability requires a severe and prolonged disability and pays a modest amount. Neither approaches a professional income.',
      },
      {
        q: 'Is my group disability coverage enough?',
        a: 'Group plans are often capped, frequently use the weaker "any occupation" definition after two years, are taxable when the employer pays the premium, and end when you leave the job.',
      },
      {
        q: 'Can I get coverage if I am self-employed?',
        a: 'Yes. Insurers will ask for proof of income, usually two years of tax returns, to establish the benefit amount.',
      },
      {
        q: 'Are mental health conditions covered?',
        a: 'Most individual policies cover them, though some limit the benefit period for mental health and substance-related claims. We flag those limits before you apply.',
      },
    ],
  },
  {
    slug: 'no-medical-insurance',
    name: 'No Medical Insurance',
    shortName: 'No Medical',
    category: 'life',
    icon: 'check',
    image: '/slider/life.jpg',
    summary:
      'Life coverage issued on a few health questions or none at all — no exam, no nurse visit, no blood work.',
    intro:
      'Traditional life insurance underwriting can involve a medical exam, blood and urine samples, and a wait of several weeks. No-medical plans skip that. Some ask a short list of health questions and issue immediately; guaranteed issue plans ask nothing at all and cannot decline you.',
    detail:
      'You pay for that certainty: premiums are higher than a fully underwritten policy, and guaranteed issue plans usually apply a two-year waiting period during which a death from natural causes returns your premiums rather than the full benefit. For someone who has been declined, has a serious condition, or needs coverage this week, that trade is often worth making.',
    whoFor: [
      'Applicants declined or heavily rated by another insurer',
      'People with a serious or recent medical history',
      'Anyone needing coverage in place within days, not weeks',
      'Older applicants arranging final expense coverage',
    ],
    highlights: [
      {
        title: 'Simplified issue',
        body: 'A short health questionnaire, no exam, and approval often within 24 to 48 hours.',
      },
      {
        title: 'Guaranteed issue',
        body: 'No health questions and no medical history review. Acceptance is guaranteed within the eligible age range.',
      },
      {
        title: 'No needles, no nurse visit',
        body: 'No blood work, no urine sample and no attending physician’s statement to wait on.',
      },
      {
        title: 'Coverage in days',
        body: 'Policies are frequently in force within a week, which matters when coverage is tied to a closing date or a travel plan.',
      },
      {
        title: 'Final expense plans',
        body: 'Smaller benefit amounts designed to cover a funeral and outstanding bills without burdening family.',
      },
      {
        title: 'Honest about the trade-off',
        body: 'If you would qualify for standard underwriting, we will tell you — the premium difference over twenty years is substantial.',
      },
    ],
    faqs: [
      {
        q: 'How much coverage can I get without a medical?',
        a: 'Simplified issue plans commonly go up to several hundred thousand dollars. Guaranteed issue plans are usually capped much lower, in the range of a final expense benefit.',
      },
      {
        q: 'What is the two-year waiting period?',
        a: 'On guaranteed issue plans, death from natural causes in the first two years returns the premiums paid plus interest rather than the full benefit. Accidental death is typically covered in full from day one.',
      },
      {
        q: 'Should I try standard underwriting first?',
        a: 'Almost always, yes. Insurers assess the same condition very differently, and we often place applicants at standard rates after they have been rated elsewhere.',
      },
    ],
  },
  {
    slug: 'accident-and-sickness-insurance',
    name: 'Accident and Sickness Insurance',
    shortName: 'Accident & Sickness',
    category: 'life',
    icon: 'shield',
    image: '/slider/critical-illness.jpg',
    summary:
      'Pays a benefit for accidental injury, hospitalisation or accidental death, at a low monthly cost.',
    intro:
      'Accident and sickness plans pay a defined benefit when something specific happens: a fracture, a hospital admission, an accidental death or a permanent impairment. Because the triggers are narrow and objective, the premiums are among the lowest of any coverage we place.',
    detail:
      'This is not a substitute for life or disability insurance, and we will not sell it as one. It works best as an inexpensive layer on top — particularly for people in physical trades, for families wanting hospital cash benefits, or as a first policy for someone who cannot yet afford full coverage.',
    whoFor: [
      'Tradespeople and workers in physically demanding jobs',
      'Families wanting hospital cash benefits at a low premium',
      'People who cannot yet afford full life or disability coverage',
      'Anyone wanting to top up an existing plan cheaply',
    ],
    highlights: [
      {
        title: 'Accidental death and dismemberment',
        body: 'A lump sum for accidental death, and a scheduled benefit for the loss of a limb, sight or hearing.',
      },
      {
        title: 'Fracture and burn benefits',
        body: 'Fixed payments by injury type, paid directly to you regardless of any other coverage you hold.',
      },
      {
        title: 'Hospital cash benefit',
        body: 'A set amount for each day spent in hospital, which covers parking, meals and a partner’s time off.',
      },
      {
        title: 'Low, stable premiums',
        body: 'Among the least expensive coverage available, with rates that do not depend on a detailed medical history.',
      },
      {
        title: 'Minimal underwriting',
        body: 'Most plans are issued on a handful of questions with no exam.',
      },
      {
        title: 'Pairs with a group plan',
        body: 'Benefits are paid on top of any employer coverage rather than being offset against it.',
      },
    ],
    faqs: [
      {
        q: 'Is this the same as disability insurance?',
        a: 'No. Accident and sickness plans pay fixed amounts for specific listed events. Disability insurance replaces your income for as long as you cannot work, whatever the cause.',
      },
      {
        q: 'Does it pay on top of my work benefits?',
        a: 'Yes. These benefits are paid directly to you and are not reduced by other coverage.',
      },
      {
        q: 'Is sickness covered or only accidents?',
        a: 'It depends on the plan. Some cover accidents only; others add hospitalisation from illness. We will be explicit about which one you are buying.',
      },
    ],
  },
  {
    slug: 'mortgage-insurance',
    name: 'Mortgage Insurance',
    shortName: 'Mortgage Insurance',
    category: 'life',
    icon: 'home',
    image: '/slider/life.jpg',
    summary:
      'Coverage that clears the mortgage if you die or become seriously ill — owned by you, not the bank.',
    intro:
      'The mortgage life insurance a lender offers at closing is convenient, but it has three problems: the benefit falls as your balance falls while the premium does not, the bank is the beneficiary rather than your family, and the coverage ends if you switch lenders.',
    detail:
      'A personally owned term life policy sized to the mortgage fixes all three. The benefit stays level, so as the balance drops your family keeps the difference. You name the beneficiary, and they decide whether paying off the mortgage is the best use of the money. And the policy follows you to any lender. It is frequently cheaper too.',
    whoFor: [
      'New homeowners about to sign a lender’s creditor insurance form',
      'Existing homeowners paying for bank mortgage insurance today',
      'Anyone renewing or switching lenders',
      'Co-owners and co-signers sharing responsibility for a loan',
    ],
    highlights: [
      {
        title: 'Benefit stays level',
        body: 'Unlike creditor insurance, the payout does not shrink as you pay the mortgage down. Your family keeps the difference.',
      },
      {
        title: 'You choose the beneficiary',
        body: 'The money goes to your family, not directly to the lender. They decide whether clearing the mortgage is the right move.',
      },
      {
        title: 'Portable between lenders',
        body: 'The policy is yours. Switch banks, refinance or move house and the coverage continues unchanged.',
      },
      {
        title: 'Underwritten before you pay',
        body: 'Your health is assessed at application, not at claim time — so there is no nasty surprise for your family later.',
      },
      {
        title: 'Often cheaper than the bank',
        body: 'Individually underwritten term rates are frequently lower than the lender’s pooled creditor rate, particularly for non-smokers.',
      },
      {
        title: 'Add critical illness cover',
        body: 'Extend the same structure so a serious diagnosis, not only death, can clear the mortgage.',
      },
    ],
    faqs: [
      {
        q: 'Is the bank’s mortgage insurance mandatory?',
        a: 'No. Creditor life insurance offered at closing is optional. CMHC mortgage default insurance, which protects the lender on a low down payment, is a different product and may be required.',
      },
      {
        q: 'I already have the bank’s coverage. Can I switch?',
        a: 'Yes. Put a personal policy in force first, then cancel the creditor coverage. Never cancel before the replacement is approved and active.',
      },
      {
        q: 'What if I sell the house?',
        a: 'The policy continues. That is the advantage of owning it yourself — it is not attached to the property or the lender.',
      },
    ],
  },

  // ─── Health & Benefits ─────────────────────────────────────────────────────
  {
    slug: 'drug-and-dental-insurance',
    name: 'Drug & Dental Insurance',
    shortName: 'Drug & Dental',
    category: 'health',
    icon: 'tooth',
    image: '/slider/critical-illness.jpg',
    summary:
      'Private health coverage for the prescriptions, dental work and paramedical care provincial plans exclude.',
    intro:
      'Provincial health insurance covers your doctor and your hospital stay. It does not cover prescription drugs for most working-age adults, dental work, glasses, physiotherapy, massage or mental health counselling. For a family, those costs add up quickly and arrive without warning.',
    detail:
      'Individual health and dental plans are most valuable for the self-employed, contractors, retirees leaving a group plan, and anyone between jobs. Some plans are guaranteed acceptance with no medical questions, which matters if you are leaving employer coverage and cannot pass underwriting.',
    whoFor: [
      'Self-employed people and contractors with no group benefits',
      'Retirees who have just lost employer coverage',
      'Families with regular prescription, dental or orthodontic costs',
      'New permanent residents settling in Canada',
    ],
    highlights: [
      {
        title: 'Prescription drug coverage',
        body: 'A share of eligible prescription costs, up to an annual maximum, for the medication provincial plans leave to you.',
      },
      {
        title: 'Dental care',
        body: 'Cleanings, fillings and check-ups, with major work such as crowns and bridges on higher tiers.',
      },
      {
        title: 'Paramedical practitioners',
        body: 'Physiotherapy, chiropractic, massage, psychology and more, each with its own annual limit.',
      },
      {
        title: 'Vision care',
        body: 'A contribution toward eye exams, glasses and contact lenses, usually every one to two years.',
      },
      {
        title: 'Guaranteed acceptance options',
        body: 'Certain plans ask no medical questions, which matters when you are leaving a group plan in poor health.',
      },
      {
        title: 'Convert a group plan without underwriting',
        body: 'If you are leaving an employer plan, you generally have 60 days to convert with no health questions. Do not miss that window.',
      },
    ],
    faqs: [
      {
        q: 'Is a health and dental plan worth the premium?',
        a: 'It depends on your actual spending. If your family has ongoing prescriptions, orthodontics or regular paramedical visits, it usually is. If not, a lower-tier plan covering catastrophic drug costs may make more sense. We compare against what you actually spent last year.',
      },
      {
        q: 'Are pre-existing conditions covered?',
        a: 'On underwritten plans, some are excluded. Guaranteed acceptance plans cover pre-existing conditions but have lower limits and a waiting period.',
      },
      {
        q: 'I am leaving my job. What should I do first?',
        a: 'Apply to convert your group coverage before the deadline, generally 60 days from your last day. Conversion requires no medical questions; applying later does.',
      },
    ],
  },
  {
    slug: 'group-health-benefits',
    name: 'Group Health Benefits',
    shortName: 'Group Benefits',
    category: 'health',
    icon: 'team',
    image: '/slider/student.jpg',
    summary:
      'Employee benefit plans for small and mid-sized Canadian businesses, from three employees upward.',
    intro:
      'A benefits plan is how a small business competes with a larger one for good staff. It is also tax-efficient: employer-paid premiums are generally a deductible business expense, and most benefits are received by employees without being treated as taxable income.',
    detail:
      'We design plans that start as small as three employees, and we review them at renewal rather than letting the premium drift upward year after year. Where a plan has been in place for a while, a market review frequently finds better terms without reducing what employees actually receive.',
    whoFor: [
      'Small business owners hiring or trying to retain staff',
      'Companies whose group premium has risen sharply at renewal',
      'Professional corporations and incorporated contractors',
      'Businesses with as few as three employees',
    ],
    highlights: [
      {
        title: 'Health, dental and drugs',
        body: 'The core plan, covering the everyday costs provincial health insurance leaves to your employees.',
      },
      {
        title: 'Life and disability',
        body: 'Group life, short-term and long-term disability so an illness does not end an employee’s income.',
      },
      {
        title: 'Employee assistance programmes',
        body: 'Confidential counselling and support services, increasingly the benefit staff value most.',
      },
      {
        title: 'Tax-efficient for the business',
        body: 'Employer-paid premiums are generally deductible, and most benefits reach employees without being taxed.',
      },
      {
        title: 'Health spending accounts',
        body: 'A flexible, capped alternative to a traditional plan that gives employees choice and gives you cost certainty.',
      },
      {
        title: 'Annual market review',
        body: 'We re-shop the plan at renewal instead of accepting the incumbent insurer’s increase by default.',
      },
    ],
    faqs: [
      {
        q: 'What is the smallest business you can set up a plan for?',
        a: 'Plans are available from three employees, and some insurers write two-life plans for incorporated businesses.',
      },
      {
        q: 'How much does a group plan cost?',
        a: 'It depends on the size of the group, the age mix, the industry and the benefits selected. We build two or three options at different price points so you can see the trade-offs.',
      },
      {
        q: 'Can I cover my family through my own business?',
        a: 'Yes. Owner-operators can often cover themselves and their dependants through the corporation, which is usually more tax-efficient than paying personally.',
      },
    ],
  },

  // ─── Savings & Investments ─────────────────────────────────────────────────
  {
    slug: 'resp',
    name: 'RESP — Registered Education Savings Plan',
    shortName: 'RESP',
    category: 'savings',
    icon: 'graduation',
    image: '/slider/resp.jpg',
    featured: true,
    summary:
      'Save for your child’s education and collect a federal grant of 20 percent on what you contribute.',
    intro:
      'An RESP is the most straightforward return available to a Canadian parent. The Canada Education Savings Grant adds 20 percent to your contributions — up to $500 a year per child, to a lifetime maximum of $7,200 — and the investments grow tax-sheltered until your child withdraws them.',
    detail:
      'Because withdrawals are taxed in the student’s hands rather than yours, and students generally have little other income, the tax on the way out is usually minimal. Lower-income families may also qualify for the additional CESG and the Canada Learning Bond, which pays into the plan even without a contribution.',
    whoFor: [
      'Parents and grandparents saving for a child’s post-secondary education',
      'Families with more than one child, who may prefer a family plan',
      'Anyone who has not yet claimed grant room from previous years',
      'Newcomers to Canada opening a first registered plan',
    ],
    highlights: [
      {
        title: '20 percent government grant',
        body: 'The CESG matches 20 percent of contributions, up to $500 per child per year and $7,200 over the child’s lifetime.',
      },
      {
        title: 'Catch up on unused grant',
        body: 'Unused grant room carries forward. You can claim up to $1,000 of grant in a single year by contributing $5,000.',
      },
      {
        title: 'Tax-sheltered growth',
        body: 'Investment income compounds inside the plan with no annual tax, for the fifteen or more years until it is needed.',
      },
      {
        title: 'Taxed in the student’s hands',
        body: 'Withdrawals are taxable to the student, who typically has little income and pays little or no tax on them.',
      },
      {
        title: 'Family plans for siblings',
        body: 'One plan for several children lets you move funds between them if one does not pursue post-secondary study.',
      },
      {
        title: 'Additional grants and the Learning Bond',
        body: 'Lower-income families may receive an enhanced grant rate plus the Canada Learning Bond, which requires no contribution at all.',
      },
    ],
    faqs: [
      {
        q: 'How much should I contribute each year?',
        a: 'Contributing $2,500 per child per year captures the full $500 annual grant. If you have unused room from earlier years, $5,000 captures $1,000 of grant.',
      },
      {
        q: 'What if my child does not go to college or university?',
        a: 'You keep your own contributions. The grant is returned to the government. Investment growth can often be transferred to your RRSP if you have room, subject to conditions.',
      },
      {
        q: 'Does an RESP count against student aid?',
        a: 'RESP withdrawals are income to the student in the year received and can affect needs-based assessments. It is worth planning the timing of withdrawals.',
      },
      {
        q: 'When should I open one?',
        a: 'As early as possible. The grant is capped annually, so starting late means years of grant you can only partially recover.',
      },
    ],
  },
  {
    slug: 'rrsp',
    name: 'RRSP — Registered Retirement Savings Plan',
    shortName: 'RRSP',
    category: 'savings',
    icon: 'growth',
    image: '/slider/fhsa.jpg',
    summary:
      'Cut this year’s tax bill while your retirement savings compound tax-deferred.',
    intro:
      'An RRSP contribution does two things at once. It reduces your taxable income for the year, generating a refund at your marginal rate, and it shelters the investments inside from tax until you withdraw them in retirement — when your income, and therefore your tax rate, is usually lower.',
    detail:
      'Your contribution room is 18 percent of the previous year’s earned income, up to the annual maximum the CRA sets, plus any unused room carried forward. The RRSP also funds the Home Buyers’ Plan and the Lifelong Learning Plan, both of which let you borrow from yourself tax-free.',
    whoFor: [
      'Employees and self-employed people in a middle or high tax bracket',
      'Anyone with years of unused contribution room accumulated',
      'First-time home buyers planning to use the Home Buyers’ Plan',
      'Couples who could benefit from a spousal RRSP',
    ],
    highlights: [
      {
        title: 'Immediate tax deduction',
        body: 'Contributions reduce taxable income for the year, so a contribution in a high bracket delivers a substantial refund.',
      },
      {
        title: 'Tax-deferred compounding',
        body: 'No tax on interest, dividends or capital gains inside the plan. Decades of untaxed compounding is the real advantage.',
      },
      {
        title: 'Unused room carries forward',
        body: 'Room you do not use accumulates indefinitely. Your CRA notice of assessment shows exactly how much you have.',
      },
      {
        title: 'Spousal RRSPs',
        body: 'Contribute to a lower-income spouse’s plan, take the deduction yourself, and split retirement income more evenly later.',
      },
      {
        title: 'Home Buyers’ Plan',
        body: 'Withdraw from your RRSP tax-free toward a first home, then repay it over fifteen years.',
      },
      {
        title: 'Lifelong Learning Plan',
        body: 'Fund full-time education or training for yourself or your spouse with a tax-free withdrawal, repaid over ten years.',
      },
    ],
    faqs: [
      {
        q: 'RRSP or TFSA — which should I use first?',
        a: 'As a rule of thumb, the RRSP wins when your current tax rate is higher than the rate you expect in retirement; the TFSA wins when it is lower or when you may need the money sooner. Many people use both, and we will work through your actual brackets.',
      },
      {
        q: 'How much room do I have?',
        a: '18 percent of last year’s earned income up to the CRA annual maximum, plus all unused room from previous years. The exact figure is printed on your latest notice of assessment.',
      },
      {
        q: 'What happens at 71?',
        a: 'You must convert the RRSP to a RRIF or an annuity by the end of the year you turn 71, and begin taking a minimum withdrawal each year after that.',
      },
      {
        q: 'What if I over-contribute?',
        a: 'There is a $2,000 lifetime buffer. Beyond that the CRA charges a penalty of one percent per month on the excess, so it is worth checking your room first.',
      },
    ],
  },
  {
    slug: 'tfsa',
    name: 'TFSA — Tax-Free Savings Account',
    shortName: 'TFSA',
    category: 'savings',
    icon: 'wallet',
    image: '/slider/fhsa.jpg',
    summary:
      'Every dollar of growth is tax-free, and withdrawals never count as income.',
    intro:
      'The TFSA is the most flexible registered account in Canada. Contributions are not deductible, but nothing inside is ever taxed and nothing you withdraw is treated as income — which means it does not claw back Old Age Security, the Guaranteed Income Supplement or any income-tested benefit.',
    detail:
      'Contribution room has accumulated every year since 2009 for anyone who was 18 or older and resident in Canada, whether or not they ever opened an account. Withdraw in one year and the same room comes back on January 1 of the next, so it works equally well for an emergency fund and for long-term growth.',
    whoFor: [
      'Anyone 18 or older resident in Canada',
      'Savers who may need access to the money before retirement',
      'Retirees protecting OAS and GIS from clawback',
      'Lower-income earners for whom an RRSP deduction is worth little',
    ],
    highlights: [
      {
        title: 'Completely tax-free growth',
        body: 'No tax on interest, dividends or capital gains, and no tax when you take the money out.',
      },
      {
        title: 'Withdraw anytime',
        body: 'No penalty, no minimum holding period and no tax consequence. The most flexible account available.',
      },
      {
        title: 'Room is restored the next year',
        body: 'Anything you withdraw is added back to your contribution room on January 1 of the following year.',
      },
      {
        title: 'Does not affect income-tested benefits',
        body: 'Withdrawals are not income, so they do not reduce OAS, GIS, the Canada Child Benefit or the GST credit.',
      },
      {
        title: 'Room accumulates from 2009',
        body: 'If you were 18 and resident in Canada in 2009 and have never contributed, you have well over $100,000 of room.',
      },
      {
        title: 'Holds real investments',
        body: 'A TFSA is not a savings account. It can hold funds, segregated funds, GICs and more — the name is misleading.',
      },
    ],
    faqs: [
      {
        q: 'How much can I put in?',
        a: 'The CRA sets a new dollar limit each year, and your personal room is that plus every unused year since 2009 or since you turned 18, plus any amounts you have withdrawn. Your exact room is in your CRA My Account.',
      },
      {
        q: 'What if I re-contribute in the same year I withdrew?',
        a: 'That is the most common TFSA mistake. Withdrawn room only returns on January 1 of the following year. Re-contributing sooner can create an over-contribution penalty of one percent per month.',
      },
      {
        q: 'Can I hold a TFSA and an RRSP?',
        a: 'Yes, and most people should. They are separate contribution limits and they solve different problems.',
      },
      {
        q: 'What happens to my TFSA when I die?',
        a: 'Naming your spouse as successor holder lets the account transfer to them intact, keeping its tax-free status. Naming them only as beneficiary is less advantageous. This is worth getting right.',
      },
    ],
  },
  {
    slug: 'fhsa',
    name: 'FHSA — First Home Savings Account',
    shortName: 'FHSA',
    category: 'savings',
    icon: 'key',
    image: '/slider/fhsa.jpg',
    featured: true,
    summary:
      'Deductible going in, tax-free coming out — the best account available to a first-time home buyer.',
    intro:
      'The First Home Savings Account combines the two advantages that used to be mutually exclusive. Contributions are tax-deductible like an RRSP, and a qualifying withdrawal to buy a first home is entirely tax-free like a TFSA. Nothing has to be repaid.',
    detail:
      'You can contribute up to $8,000 a year to a lifetime maximum of $40,000. Unused room carries forward once the account is open, which is the strongest reason to open one even if you cannot fund it yet. An FHSA can also be combined with the RRSP Home Buyers’ Plan on the same purchase.',
    whoFor: [
      'First-time home buyers aged 18 to 71 resident in Canada',
      'Anyone who has not owned a home they lived in this year or the previous four',
      'Couples buying together, who can each open their own account',
      'Parents helping an adult child build a down payment',
    ],
    highlights: [
      {
        title: 'Deductible contributions',
        body: 'Reduce your taxable income exactly as an RRSP contribution does, generating a refund at your marginal rate.',
      },
      {
        title: 'Tax-free qualifying withdrawal',
        body: 'Take the money out to buy a first home and pay no tax on the contributions or the growth.',
      },
      {
        title: 'Nothing to repay',
        body: 'Unlike the RRSP Home Buyers’ Plan, an FHSA withdrawal is not a loan to yourself. There is no repayment schedule.',
      },
      {
        title: '$8,000 a year, $40,000 lifetime',
        body: 'Room carries forward once the account is open, so opening early is worth doing even before you can contribute.',
      },
      {
        title: 'Stacks with the Home Buyers’ Plan',
        body: 'Use both on the same purchase to assemble a substantially larger down payment.',
      },
      {
        title: 'Rolls into an RRSP if unused',
        body: 'If you do not buy a home, the balance transfers to your RRSP or RRIF without using RRSP contribution room.',
      },
    ],
    faqs: [
      {
        q: 'Who counts as a first-time buyer?',
        a: 'You must not have lived in a home you or your spouse owned at any point in the current calendar year or the four preceding years. Owning a home long ago does not necessarily disqualify you.',
      },
      {
        q: 'Can my spouse and I both open one?',
        a: 'Yes. Each of you has a separate $40,000 lifetime limit, so a couple can accumulate $80,000 plus growth toward the same home.',
      },
      {
        q: 'What if I never buy a home?',
        a: 'Transfer the balance to your RRSP or RRIF tax-free. It does not consume RRSP room, so nothing is lost.',
      },
      {
        q: 'How long can I keep the account open?',
        a: 'Up to 15 years from opening, or until the end of the year you turn 71, whichever comes first.',
      },
    ],
  },
]

// ── Lookups ──────────────────────────────────────────────────────────────────

export const PRODUCT_SLUGS = PRODUCTS.map((p) => p.slug)

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function productsByCategory(key: CategoryKey): Product[] {
  return PRODUCTS.filter((p) => p.category === key)
}

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured)

/** Products shown as "related" on a product page: same category, excluding self. */
export function relatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  )
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)
  const others = PRODUCTS.filter(
    (p) => p.category !== product.category && p.slug !== product.slug
  )
  return [...sameCategory, ...others].slice(0, limit)
}
