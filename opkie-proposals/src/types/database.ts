export interface Bonus {
  title: string
  description: string
  value: number
}

export interface Proposal {
  id: string
  slug: string
  status: 'draft' | 'sent' | 'viewed'
  created_by: string
  created_at: string
  updated_at: string

  // Practice
  dentist_first_name: string | null
  dentist_last_name: string | null
  practice_name: string | null
  city: string | null
  state: string | null

  // Sender
  sender_name: string | null
  sender_email: string | null
  sender_phone: string | null
  sender_calendar_url: string | null

  // Proposal content
  loom_video_id: string | null
  bonus_expiry_date: string | null
  bonuses_offered: Bonus[] | null

  // Practice context (AI inputs)
  biggest_concerns: string[] | null
  services_focus: string[] | null
  current_marketing: string | null
  additional_notes: string | null

  // AI-generated copy
  ai_hero_headline: string | null
  ai_mirror_quote: string | null
  ai_city_callout: string | null

  // Tracking
  first_opened_at: string | null
  last_opened_at: string | null
  open_count: number
}

export interface Template {
  id: string
  name: string
  html: string
  updated_at: string
  updated_by: string | null
  is_active: boolean
}

export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
] as const

export const BIGGEST_CONCERNS = [
  'Not enough new patients',
  'DSO / chain competition',
  'Low case acceptance',
  'Patient attrition / no-shows',
  'Website underperforming',
  'Marketing not working',
] as const

export const SERVICES_FOCUS = [
  'Implants',
  'Invisalign',
  'Veneers',
  'General / Family',
  'Cosmetic',
  'Pediatric',
  'Ortho',
  'Emergency',
] as const

export const DEFAULT_BONUSES: Bonus[] = [
  {
    title: 'Professional Media & Authority Package',
    description: 'On-site photo/video, podcast appearance, media kit',
    value: 2400,
  },
  {
    title: 'New Resident Direct Mail Campaign',
    description: 'Automated outreach to new movers in their city',
    value: 2500,
  },
]
