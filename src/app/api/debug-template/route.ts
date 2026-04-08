import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createServiceClient()

  // Fetch active template
  const { data: template, error } = await supabase
    .from('template')
    .select('id, name, is_active, updated_at, html')
    .eq('is_active', true)
    .limit(1)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Check if placeholders exist in template
  const hasHeroPlaceholder = template.html.includes('[AI_HERO_HEADLINE]')
  const hasCityPlaceholder = template.html.includes('[AI_CITY_CALLOUT]')
  const hasMirrorPlaceholder = template.html.includes('[AI_MIRROR_QUOTE]')

  // Get first 500 chars of hero section
  const heroSectionMatch = template.html.match(/<h1[^>]*>[\s\S]*?<\/h1>/)
  const heroSection = heroSectionMatch ? heroSectionMatch[0].substring(0, 300) : 'Not found'

  return NextResponse.json({
    id: template.id,
    name: template.name,
    is_active: template.is_active,
    updated_at: template.updated_at,
    placeholders: {
      '[AI_HERO_HEADLINE]': hasHeroPlaceholder,
      '[AI_CITY_CALLOUT]': hasCityPlaceholder,
      '[AI_MIRROR_QUOTE]': hasMirrorPlaceholder,
    },
    heroSection,
    htmlLength: template.html.length,
  })
}
