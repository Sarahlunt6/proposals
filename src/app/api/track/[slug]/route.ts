import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// 1x1 transparent GIF
const TRANSPARENT_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Check if this is a preview request - don't track previews
  const { searchParams } = new URL(request.url)
  const isPreview = searchParams.get('preview') === 'true'

  if (isPreview) {
    // Return tracking pixel without recording the view
    return new NextResponse(TRANSPARENT_GIF, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
      },
    })
  }

  try {
    const supabase = createServiceClient()

    // Fetch proposal by slug
    const { data: proposal, error: fetchError } = await supabase
      .from('proposals')
      .select('id, first_opened_at, open_count, status')
      .eq('slug', slug)
      .single()

    if (!fetchError && proposal) {
      // Build update object
      const updates: Record<string, unknown> = {
        open_count: (proposal.open_count || 0) + 1,
        last_opened_at: new Date().toISOString(),
      }

      // Set first_opened_at if null
      if (!proposal.first_opened_at) {
        updates.first_opened_at = new Date().toISOString()
      }

      // Set status to 'viewed' if not already
      if (proposal.status !== 'viewed') {
        updates.status = 'viewed'
      }

      // Update the proposal
      await supabase
        .from('proposals')
        .update(updates)
        .eq('id', proposal.id)
    }
  } catch (error) {
    // Silently fail - we don't want tracking errors to affect the user
    console.error('Tracking error:', error)
  }

  // Return 1x1 transparent GIF
  return new NextResponse(TRANSPARENT_GIF, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
    },
  })
}
