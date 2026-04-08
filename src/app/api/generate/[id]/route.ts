import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServiceClient } from '@/lib/supabase/server'

const SYSTEM_PROMPT = `You are a conversion copywriter for Opkie, a dental marketing agency. Generate 3 pieces of custom proposal copy based on the dental practice context provided. Respond ONLY with valid JSON. No preamble, no markdown, no code fences.

Required shape:
{
  "ai_hero_headline": "...",
  "ai_mirror_quote": "...",
  "ai_city_callout": "..."
}

Rules:
- ai_hero_headline: 8–12 words. Speaks directly to their #1 concern. Avoid generic phrases like "grow your practice" or "attract more patients."
- ai_mirror_quote: 1–2 sentences written in first person as if the dentist said it. Should articulate their specific frustration based on their concerns and context. This replaces a pull quote in the proposal.
- ai_city_callout: One sentence. References their city and a specific opportunity tied to their service focus. Should feel locally specific, not generic.`

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const supabase = createServiceClient()

    // Fetch the proposal
    const { data: proposal, error: fetchError } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !proposal) {
      return NextResponse.json(
        { success: false, error: 'Proposal not found' },
        { status: 404 }
      )
    }

    // Build user message with context
    const userMessage = `
Dentist Name: ${proposal.dentist_first_name} ${proposal.dentist_last_name}
Practice Name: ${proposal.practice_name}
City: ${proposal.city}
State: ${proposal.state}
Biggest Concerns: ${(proposal.biggest_concerns || []).join(', ') || 'Not specified'}
Services Focus: ${(proposal.services_focus || []).join(', ') || 'Not specified'}
Current Marketing: ${proposal.current_marketing || 'Not specified'}
Additional Notes: ${proposal.additional_notes || 'None'}
`.trim()

    // Call Anthropic Claude API
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    })

    // Extract text content from response
    const textBlock = message.content.find((block) => block.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json(
        { success: false, error: 'No text response from AI' },
        { status: 500 }
      )
    }

    const textContent = textBlock.text

    // Parse JSON response (clean up any markdown formatting if present)
    let aiCopy: {
      ai_hero_headline: string
      ai_mirror_quote: string
      ai_city_callout: string
    }

    try {
      // Remove potential markdown code blocks
      const cleanedText = textContent
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      aiCopy = JSON.parse(cleanedText)
    } catch {
      return NextResponse.json(
        { success: false, error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    // Update proposal with AI copy
    const { error: updateError } = await supabase
      .from('proposals')
      .update({
        ai_hero_headline: aiCopy.ai_hero_headline,
        ai_mirror_quote: aiCopy.ai_mirror_quote,
        ai_city_callout: aiCopy.ai_city_callout,
      })
      .eq('id', id)

    if (updateError) {
      return NextResponse.json(
        { success: false, error: 'Failed to save AI copy' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: aiCopy,
    })
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { success: false, error: 'AI generation failed' },
      { status: 500 }
    )
  }
}
