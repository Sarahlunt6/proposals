import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Bonus } from '@/types/database'

function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
}

function getFirstName(fullName: string | null): string {
  if (!fullName) return ''
  return fullName.split(' ')[0]
}

function getInitials(fullName: string | null): string {
  if (!fullName) return ''
  return fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function getPhoneDigitsOnly(phone: string | null): string {
  if (!phone) return ''
  return phone.replace(/\D/g, '')
}

function generateBonusesHtml(bonuses: Bonus[] | null): string {
  if (!bonuses || bonuses.length === 0) return ''

  const icons = [
    'fa-video',
    'fa-envelope-open-text',
    'fa-gift',
    'fa-star',
    'fa-rocket',
    'fa-bullhorn',
  ]

  return bonuses
    .map(
      (bonus, index) => `
        <div class="flex flex-col md:flex-row gap-6 items-center ${index < bonuses.length - 1 ? 'border-b border-white/10 pb-8' : ''}">
          <div class="bg-brand-gold text-brand-navy w-14 h-14 rounded-full flex items-center justify-center text-xl shrink-0">
            <i class="fas ${icons[index % icons.length]}"></i>
          </div>
          <div class="flex-1 text-center md:text-left">
            <h4 class="font-bold text-lg text-brand-gold">${bonus.title}</h4>
            <p class="text-sm text-gray-300 mt-1">${bonus.description}</p>
          </div>
          <div class="text-center md:text-right shrink-0">
            <span class="block text-gray-500 line-through text-sm">$${bonus.value.toLocaleString()} Value</span>
            <span class="block text-brand-gold font-bold text-lg">INCLUDED</span>
          </div>
        </div>
      `
    )
    .join('\n')
}

function renderTemplate(
  html: string,
  proposal: Record<string, unknown>,
  slug: string
): string {
  const replacements: Record<string, string> = {
    '[PREPARED_FOR_COMPANY]': (proposal.practice_name as string) || '',
    '[PREPARED_FOR_FIRST_NAME]': (proposal.dentist_first_name as string) || '',
    '[PREPARED_FOR_CITY]': (proposal.city as string) || '',
    '[BONUS_EXPIRATION_DATE]': formatDate(proposal.bonus_expiry_date as string | null),
    '[LOOM_VIDEO_ID]': (proposal.loom_video_id as string) || '',
    '[PREPARED_BY_NAME]': (proposal.sender_name as string) || '',
    '[PREPARED_BY_FIRST_NAME]': getFirstName(proposal.sender_name as string | null),
    '[PREPARED_BY_INITIALS]': getInitials(proposal.sender_name as string | null),
    '[PREPARED_BY_EMAIL]': (proposal.sender_email as string) || '',
    '[PREPARED_BY_PHONE]': (proposal.sender_phone as string) || '',
    '[PREPARED_BY_PHONE_RAW]': getPhoneDigitsOnly(proposal.sender_phone as string | null),
    '[PREPARED_BY_CALENDAR_LINK]': (proposal.sender_calendar_url as string) || '',
    '[AI_HERO_HEADLINE]': (proposal.ai_hero_headline as string) || 'Your Path to Practice Growth Starts Here',
    '[AI_MIRROR_QUOTE]': (proposal.ai_mirror_quote as string) || 'I know there must be a better way to reach the right patients.',
    '[AI_CITY_CALLOUT]': (proposal.ai_city_callout as string) || 'Let us help you connect with patients in your area.',
  }

  let result = html

  // Replace all placeholders
  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.split(placeholder).join(value)
  }

  // Replace bonuses placeholder with dynamic HTML
  const bonusesHtml = generateBonusesHtml(proposal.bonuses_offered as Bonus[] | null)
  result = result.replace('<!-- BONUSES_PLACEHOLDER -->', bonusesHtml)

  // Inject favicon link in <head>
  const faviconLink = `<link rel="icon" type="image/png" href="/icon.png">`
  result = result.replace('</head>', `    ${faviconLink}\n</head>`)

  // Inject tracking pixel placeholder - will be replaced at serve time
  // Use a placeholder so we can add preview param dynamically when serving
  const trackingPixel = `<img src="/api/track/${slug}" width="1" height="1" style="position:absolute;opacity:0;" data-tracking="true" />`
  result = result.replace('</body>', `${trackingPixel}\n</body>`)

  return result
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createServiceClient()

  // Fetch the proposal
  const { data: proposal, error: proposalError } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', id)
    .single()

  if (proposalError || !proposal) {
    return NextResponse.json({ error: 'Proposal not found' }, { status: 404 })
  }

  // Fetch active template
  const { data: template, error: templateError } = await supabase
    .from('template')
    .select('html')
    .eq('is_active', true)
    .limit(1)
    .single()

  if (templateError || !template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 500 })
  }

  // Render the template with proposal data
  const renderedHtml = renderTemplate(template.html, proposal, proposal.slug)

  // Save the rendered HTML to the proposal
  const { error: updateError } = await supabase
    .from('proposals')
    .update({ rendered_html: renderedHtml })
    .eq('id', id)

  if (updateError) {
    return NextResponse.json({ error: 'Failed to save rendered HTML' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
