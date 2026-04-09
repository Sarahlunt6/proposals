import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Bonus } from '@/types/database'

// Force dynamic rendering - never cache this route
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

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

function replacePlaceholders(
  html: string,
  proposal: Record<string, unknown>,
  slug: string,
  isPreview: boolean = false
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

  // Replace bonuses placeholder with dynamic HTML or remove entire section if no bonuses
  const bonuses = proposal.bonuses_offered as Bonus[] | null
  const hasBonuses = bonuses && bonuses.length > 0

  if (hasBonuses) {
    const bonusesHtml = generateBonusesHtml(bonuses)
    result = result.replace('<!-- BONUSES_PLACEHOLDER -->', bonusesHtml)
  } else {
    // Remove the entire offer section (id="offer") if no bonuses
    // This matches the section with id="offer" that contains the bonuses
    result = result.replace(
      /<section\s+id="offer"[^>]*>[\s\S]*?<\/section>/gi,
      ''
    )
    // Also clean up the placeholder if present
    result = result.replace('<!-- BONUSES_PLACEHOLDER -->', '')
  }

  // Inject favicon link in <head>
  const faviconLink = `<link rel="icon" type="image/png" href="/icon.png">`
  result = result.replace('</head>', `    ${faviconLink}\n</head>`)

  // Inject tracking pixel before </body>
  // Add preview param if this is a preview request so tracking is skipped
  const trackingUrl = isPreview ? `/api/track/${slug}?preview=true` : `/api/track/${slug}`
  const trackingPixel = `<img src="${trackingUrl}" width="1" height="1" style="position:absolute;opacity:0;" />`
  result = result.replace('</body>', `${trackingPixel}\n</body>`)

  return result
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Check if this is a preview request
  const { searchParams } = new URL(request.url)
  const isPreview = searchParams.get('preview') === 'true'

  // Skip reserved routes
  const reservedRoutes = ['login', 'dashboard', 'api', '_next', 'favicon.ico']
  if (reservedRoutes.includes(slug)) {
    return NextResponse.next()
  }

  const supabase = createServiceClient()

  // Fetch proposal by slug
  const { data: proposal, error: proposalError } = await supabase
    .from('proposals')
    .select('*')
    .eq('slug', slug)
    .single()

  if (proposalError || !proposal) {
    // Return a clean 404 page
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proposal Not Found | Opkie</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center">
  <div class="text-center px-4">
    <h1 class="text-6xl font-bold text-gray-300 mb-4">404</h1>
    <h2 class="text-2xl font-semibold text-gray-900 mb-2">Proposal Not Found</h2>
    <p class="text-gray-600 mb-6">The proposal you're looking for doesn't exist or has been removed.</p>
    <a href="https://opkie.com" class="text-purple-600 hover:text-purple-700 font-medium">Visit Opkie</a>
  </div>
</body>
</html>`,
      {
        status: 404,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  }

  // Fetch active template
  const { data: template, error: templateError } = await supabase
    .from('template')
    .select('html')
    .eq('is_active', true)
    .limit(1)
    .single()

  if (templateError || !template) {
    return new NextResponse('Template not found', { status: 500 })
  }

  // Replace placeholders and return raw HTML
  const html = replacePlaceholders(template.html, proposal, slug, isPreview)

  // Add debug info as HTML comment (can be removed later)
  const debugInfo = `<!-- DEBUG: ai_hero_headline="${proposal.ai_hero_headline}" loom_video_id="${proposal.loom_video_id}" updated_at="${proposal.updated_at}" -->\n`
  const htmlWithDebug = debugInfo + html

  return new NextResponse(htmlWithDebug, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
    },
  })
}
