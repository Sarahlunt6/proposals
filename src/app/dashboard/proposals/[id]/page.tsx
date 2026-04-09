'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'
import {
  US_STATES,
  BIGGEST_CONCERNS,
  SERVICES_FOCUS,
  Bonus,
} from '@/types/database'

function formatDate(dateString: string | null): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
}

export default function EditProposalPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const supabaseRef = useRef<SupabaseClient | null>(null)

  const getSupabase = () => {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient()
    }
    return supabaseRef.current
  }

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [savingAiCopy, setSavingAiCopy] = useState(false)
  const [aiCopySaved, setAiCopySaved] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Practice Info
  const [dentistFirstName, setDentistFirstName] = useState('')
  const [dentistLastName, setDentistLastName] = useState('')
  const [practiceName, setPracticeName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  // Sender Info
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [senderPhone, setSenderPhone] = useState('')
  const [senderCalendarUrl, setSenderCalendarUrl] = useState('')

  // Proposal Details
  const [loomVideoId, setLoomVideoId] = useState('')
  const [bonusExpiryDate, setBonusExpiryDate] = useState('')
  const [bonuses, setBonuses] = useState<Bonus[]>([])

  // Practice Context
  const [biggestConcerns, setBiggestConcerns] = useState<string[]>([])
  const [customConcern, setCustomConcern] = useState('')
  const [servicesFocus, setServicesFocus] = useState<string[]>([])
  const [customService, setCustomService] = useState('')
  const [currentMarketing, setCurrentMarketing] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')

  // Slug
  const [slug, setSlug] = useState('')
  const [slugError, setSlugError] = useState<string | null>(null)
  const [slugChecking, setSlugChecking] = useState(false)
  const [originalSlug, setOriginalSlug] = useState('')

  // AI Copy
  const [aiHeroHeadline, setAiHeroHeadline] = useState('')
  const [aiMirrorQuote, setAiMirrorQuote] = useState('')
  const [aiCityCallout, setAiCityCallout] = useState('')

  // Tracking
  const [openCount, setOpenCount] = useState(0)
  const [firstOpenedAt, setFirstOpenedAt] = useState<string | null>(null)
  const [lastOpenedAt, setLastOpenedAt] = useState<string | null>(null)

  // Initial context values for detecting changes
  const [initialContext, setInitialContext] = useState<string>('')

  useEffect(() => {
    fetchProposal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchProposal = async () => {
    const { data: proposal, error } = await getSupabase()
      .from('proposals')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !proposal) {
      setError('Proposal not found')
      setLoading(false)
      return
    }

    // Set all fields
    setDentistFirstName(proposal.dentist_first_name || '')
    setDentistLastName(proposal.dentist_last_name || '')
    setPracticeName(proposal.practice_name || '')
    setCity(proposal.city || '')
    setState(proposal.state || '')
    setSenderName(proposal.sender_name || '')
    setSenderEmail(proposal.sender_email || '')
    setSenderPhone(proposal.sender_phone || '')
    setSenderCalendarUrl(proposal.sender_calendar_url || '')
    setLoomVideoId(proposal.loom_video_id || '')
    setBonusExpiryDate(proposal.bonus_expiry_date || '')
    setBonuses(proposal.bonuses_offered || [])
    setBiggestConcerns(proposal.biggest_concerns || [])
    setServicesFocus(proposal.services_focus || [])
    setCurrentMarketing(proposal.current_marketing || '')
    setAdditionalNotes(proposal.additional_notes || '')
    setSlug(proposal.slug)
    setOriginalSlug(proposal.slug)
    setAiHeroHeadline(proposal.ai_hero_headline || '')
    setAiMirrorQuote(proposal.ai_mirror_quote || '')
    setAiCityCallout(proposal.ai_city_callout || '')
    setOpenCount(proposal.open_count || 0)
    setFirstOpenedAt(proposal.first_opened_at)
    setLastOpenedAt(proposal.last_opened_at)

    // Store initial context for change detection
    setInitialContext(
      JSON.stringify({
        biggest_concerns: proposal.biggest_concerns,
        services_focus: proposal.services_focus,
        current_marketing: proposal.current_marketing,
        additional_notes: proposal.additional_notes,
      })
    )

    setLoading(false)
  }

  const validateSlug = async (slugValue: string) => {
    if (!slugValue || slugValue === originalSlug) {
      setSlugError(null)
      return
    }

    setSlugChecking(true)
    setSlugError(null)

    const { data } = await getSupabase()
      .from('proposals')
      .select('id')
      .eq('slug', slugValue)
      .single()

    if (data) {
      setSlugError('This URL is already taken. Please choose a different one.')
    }
    setSlugChecking(false)
  }

  const handleConcernToggle = (concern: string) => {
    setBiggestConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    )
  }

  const handleAddCustomConcern = () => {
    if (customConcern.trim() && !biggestConcerns.includes(customConcern.trim())) {
      setBiggestConcerns((prev) => [...prev, customConcern.trim()])
      setCustomConcern('')
    }
  }

  const handleServiceToggle = (service: string) => {
    setServicesFocus((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    )
  }

  const handleAddCustomService = () => {
    if (customService.trim() && !servicesFocus.includes(customService.trim())) {
      setServicesFocus((prev) => [...prev, customService.trim()])
      setCustomService('')
    }
  }

  const handleBonusChange = (index: number, field: keyof Bonus, value: string | number) => {
    setBonuses((prev) =>
      prev.map((bonus, i) =>
        i === index ? { ...bonus, [field]: value } : bonus
      )
    )
  }

  const handleAddBonus = () => {
    setBonuses((prev) => [...prev, { title: '', description: '', value: 0 }])
  }

  const handleRemoveBonus = (index: number) => {
    setBonuses((prev) => prev.filter((_, i) => i !== index))
  }

  const handleRegenerateAI = async () => {
    setRegenerating(true)
    setError(null)

    try {
      const response = await fetch(`/api/generate/${id}`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to regenerate AI copy')
      }

      const result = await response.json()
      if (result.success && result.data) {
        setAiHeroHeadline(result.data.ai_hero_headline)
        setAiMirrorQuote(result.data.ai_mirror_quote)
        setAiCityCallout(result.data.ai_city_callout)
      }
    } catch {
      setError('Failed to regenerate AI copy. Please try again.')
    }

    setRegenerating(false)
  }

  const handleSaveAiCopy = async () => {
    setSavingAiCopy(true)
    setError(null)

    const { error: updateError, data } = await getSupabase()
      .from('proposals')
      .update({
        ai_hero_headline: aiHeroHeadline,
        ai_mirror_quote: aiMirrorQuote,
        ai_city_callout: aiCityCallout,
      })
      .eq('id', id)
      .select()

    if (updateError) {
      setError('Failed to save AI copy: ' + updateError.message)
      setSavingAiCopy(false)
      return
    }

    if (!data || data.length === 0) {
      setError('Failed to save AI copy: No rows updated')
      setSavingAiCopy(false)
      return
    }

    // Show brief success state
    setSavingAiCopy(false)
    setAiCopySaved(true)
    setTimeout(() => setAiCopySaved(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    if (slugError) {
      setError('Please fix the URL slug before saving.')
      setSaving(false)
      return
    }

    // Check if context fields changed
    const currentContext = JSON.stringify({
      biggest_concerns: biggestConcerns,
      services_focus: servicesFocus,
      current_marketing: currentMarketing,
      additional_notes: additionalNotes,
    })
    const contextChanged = currentContext !== initialContext

    // Update proposal
    const { error: updateError, data: updateData } = await getSupabase()
      .from('proposals')
      .update({
        slug,
        dentist_first_name: dentistFirstName,
        dentist_last_name: dentistLastName,
        practice_name: practiceName,
        city,
        state,
        sender_name: senderName,
        sender_email: senderEmail,
        sender_phone: senderPhone,
        sender_calendar_url: senderCalendarUrl,
        loom_video_id: loomVideoId,
        bonus_expiry_date: bonusExpiryDate,
        bonuses_offered: bonuses,
        biggest_concerns: biggestConcerns,
        services_focus: servicesFocus,
        current_marketing: currentMarketing,
        additional_notes: additionalNotes,
        ai_hero_headline: aiHeroHeadline,
        ai_mirror_quote: aiMirrorQuote,
        ai_city_callout: aiCityCallout,
      })
      .eq('id', id)
      .select()

    if (updateError) {
      setError('Failed to save: ' + updateError.message)
      setSaving(false)
      return
    }

    if (!updateData || updateData.length === 0) {
      setError('Failed to save: No rows updated. You may not have permission to edit this proposal.')
      setSaving(false)
      return
    }

    // Regenerate AI if context changed
    if (contextChanged) {
      try {
        const response = await fetch(`/api/generate/${id}`, {
          method: 'POST',
        })
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data) {
            setAiHeroHeadline(result.data.ai_hero_headline)
            setAiMirrorQuote(result.data.ai_mirror_quote)
            setAiCityCallout(result.data.ai_city_callout)
          }
        }
      } catch (err) {
        console.error('AI regeneration failed:', err)
      }
    }

    // Update initial context
    setInitialContext(currentContext)
    setOriginalSlug(slug)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading proposal...</p>
      </div>
    )
  }

  if (error && !dentistFirstName) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Proposal</h1>
        <a
          href={`/${slug}?preview=true`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
        >
          Preview Proposal
        </a>
      </div>

      {/* Tracking Summary */}
      {openCount > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-green-800 mb-2">Tracking Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-green-600 font-medium">Opens:</span>
              <span className="ml-2 text-green-800">{openCount}</span>
            </div>
            <div>
              <span className="text-green-600 font-medium">First opened:</span>
              <span className="ml-2 text-green-800">{formatDate(firstOpenedAt)}</span>
            </div>
            <div>
              <span className="text-green-600 font-medium">Last opened:</span>
              <span className="ml-2 text-green-800">{formatDate(lastOpenedAt)}</span>
            </div>
          </div>
        </div>
      )}

      {/* AI Copy Section */}
      <div className="bg-brand-navy/10 border border-brand-gold/30 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-semibold text-brand-navy">AI-Generated Copy</h3>
          <button
            onClick={handleRegenerateAI}
            disabled={regenerating}
            className="text-sm text-brand-gold hover:text-brand-gold-dark font-medium disabled:opacity-50"
          >
            {regenerating ? 'Regenerating...' : 'Regenerate AI Copy'}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-gold mb-1">
              Hero Headline
            </label>
            <input
              type="text"
              value={aiHeroHeadline}
              onChange={(e) => setAiHeroHeadline(e.target.value)}
              placeholder="Not generated yet"
              className="w-full px-3 py-2 border border-brand-gold/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-gold mb-1">
              Mirror Quote
            </label>
            <textarea
              value={aiMirrorQuote}
              onChange={(e) => setAiMirrorQuote(e.target.value)}
              placeholder="Not generated yet"
              rows={2}
              className="w-full px-3 py-2 border border-brand-gold/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-gold mb-1">
              City Callout
            </label>
            <textarea
              value={aiCityCallout}
              onChange={(e) => setAiCityCallout(e.target.value)}
              placeholder="Not generated yet"
              rows={2}
              className="w-full px-3 py-2 border border-brand-gold/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleSaveAiCopy}
              disabled={savingAiCopy}
              className={`px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 ${
                aiCopySaved
                  ? 'bg-green-600 text-white'
                  : 'bg-brand-gold text-white hover:bg-brand-gold-dark'
              }`}
            >
              {savingAiCopy ? 'Saving...' : aiCopySaved ? 'Saved!' : 'Save AI Copy'}
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section A - Practice Info */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Section A — Practice Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dentist First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={dentistFirstName}
                onChange={(e) => setDentistFirstName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dentist Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={dentistLastName}
                onChange={(e) => setDentistLastName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Practice Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={practiceName}
                onChange={(e) => setPracticeName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              >
                <option value="">Select a state</option>
                {US_STATES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Section B - Sender Info */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Section B — Your Info (Sender)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Scheduling Link (URL) <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={senderCalendarUrl}
                onChange={(e) => setSenderCalendarUrl(e.target.value)}
                required
                placeholder="https://calendly.com/yourname"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
          </div>
        </section>

        {/* Section C - Proposal Details */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Section C — Proposal Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loom Video ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={loomVideoId}
                onChange={(e) => setLoomVideoId(e.target.value)}
                required
                placeholder="a1b2c3d4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bonus Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={bonusExpiryDate}
                onChange={(e) => setBonusExpiryDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>

            {/* Bonuses */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bonuses</label>
              <div className="space-y-3">
                {bonuses.map((bonus, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-2 p-3 bg-gray-50 rounded-md">
                    <input
                      type="text"
                      value={bonus.title}
                      onChange={(e) => handleBonusChange(index, 'title', e.target.value)}
                      placeholder="Title"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                    <input
                      type="text"
                      value={bonus.description}
                      onChange={(e) => handleBonusChange(index, 'description', e.target.value)}
                      placeholder="Description"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                    <input
                      type="number"
                      value={bonus.value}
                      onChange={(e) => handleBonusChange(index, 'value', parseInt(e.target.value) || 0)}
                      placeholder="Value"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBonus(index)}
                      className="text-red-600 hover:text-red-700 px-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddBonus}
                  className="text-brand-gold hover:text-brand-gold-dark text-sm font-medium"
                >
                  + Add Bonus
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section D - Practice Context */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Section D — Practice Context</h2>
          <p className="text-sm text-gray-600 mb-4 bg-brand-navy/10 p-3 rounded-md">
            This information personalizes the proposal with AI. Changes will trigger AI regeneration on save.
          </p>

          <div className="space-y-6">
            {/* Biggest Concerns */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Biggest Concerns</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {BIGGEST_CONCERNS.map((concern) => (
                  <label key={concern} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={biggestConcerns.includes(concern)}
                      onChange={() => handleConcernToggle(concern)}
                      className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                    />
                    <span className="text-sm text-gray-700">{concern}</span>
                  </label>
                ))}
              </div>
              <div className="flex mt-2 gap-2">
                <input
                  type="text"
                  value={customConcern}
                  onChange={(e) => setCustomConcern(e.target.value)}
                  placeholder="Add custom concern"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
                <button
                  type="button"
                  onClick={handleAddCustomConcern}
                  className="px-3 py-2 text-brand-gold hover:text-brand-gold-dark text-sm font-medium"
                >
                  Add
                </button>
              </div>
              {biggestConcerns.filter((c) => !(BIGGEST_CONCERNS as readonly string[]).includes(c)).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {biggestConcerns
                    .filter((c) => !(BIGGEST_CONCERNS as readonly string[]).includes(c))
                    .map((concern) => (
                      <span
                        key={concern}
                        className="inline-flex items-center px-2 py-1 bg-brand-gold/20 text-brand-gold-dark rounded-full text-sm"
                      >
                        {concern}
                        <button
                          type="button"
                          onClick={() => handleConcernToggle(concern)}
                          className="ml-1 text-brand-gold hover:text-brand-gold-dark"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Services Focus */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Services Focus</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {SERVICES_FOCUS.map((service) => (
                  <label key={service} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={servicesFocus.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
              <div className="flex mt-2 gap-2">
                <input
                  type="text"
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  placeholder="Add custom service"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
                <button
                  type="button"
                  onClick={handleAddCustomService}
                  className="px-3 py-2 text-brand-gold hover:text-brand-gold-dark text-sm font-medium"
                >
                  Add
                </button>
              </div>
              {servicesFocus.filter((s) => !(SERVICES_FOCUS as readonly string[]).includes(s)).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {servicesFocus
                    .filter((s) => !(SERVICES_FOCUS as readonly string[]).includes(s))
                    .map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center px-2 py-1 bg-brand-gold/20 text-brand-gold-dark rounded-full text-sm"
                      >
                        {service}
                        <button
                          type="button"
                          onClick={() => handleServiceToggle(service)}
                          className="ml-1 text-brand-gold hover:text-brand-gold-dark"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Current Marketing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Marketing</label>
              <textarea
                value={currentMarketing}
                onChange={(e) => setCurrentMarketing(e.target.value)}
                placeholder="What are they currently doing to get new patients?"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Anything else relevant to this practice or conversation?"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
          </div>
        </section>

        {/* Section E - Proposal URL Slug */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Section E — Proposal URL Slug</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL Slug
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">proposal.opkie.com/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                onBlur={() => validateSlug(slug)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            {slugChecking && <p className="text-sm text-gray-500 mt-1">Checking availability...</p>}
            {slugError && <p className="text-sm text-red-600 mt-1">{slugError}</p>}
          </div>
        </section>

        {/* Submit */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || !!slugError}
            className={`px-6 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-brand-gold text-white hover:bg-brand-gold-dark'
            }`}
          >
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
