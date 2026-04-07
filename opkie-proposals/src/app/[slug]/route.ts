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

  return bonuses
    .map(
      (bonus) => `
        <div class="bonus-card bg-white rounded-xl p-6 card-shadow border border-gray-100">
          <div class="flex justify-between items-start mb-3">
            <h3 class="text-lg font-semibold text-gray-900">${bonus.title}</h3>
            <span class="text-green-600 font-bold text-lg">$${bonus.value.toLocaleString()}</span>
          </div>
          <p class="text-gray-600 text-sm">${bonus.description}</p>
        </div>
      `
    )
    .join('\n')
}

function replacePlaceholders(
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

  // Inject tracking pixel before </body>
  const trackingPixel = `<img src="/api/track/${slug}" width="1" height="1" style="position:absolute;opacity:0;" />`
  result = result.replace('</body>', `${trackingPixel}\n</body>`)

  return result
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

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
  const html = replacePlaceholders(template.html, proposal, slug)

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
