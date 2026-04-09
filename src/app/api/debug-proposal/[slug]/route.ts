import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = createServiceClient()

  const { data: proposal, error } = await supabase
    .from('proposals')
    .select('id, slug, ai_hero_headline, ai_mirror_quote, ai_city_callout')
    .eq('slug', slug)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    slug: proposal.slug,
    ai_hero_headline: proposal.ai_hero_headline,
    ai_mirror_quote: proposal.ai_mirror_quote,
    ai_city_callout: proposal.ai_city_callout,
  })
}
