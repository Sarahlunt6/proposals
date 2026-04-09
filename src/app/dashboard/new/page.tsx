'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'
import {
  US_STATES,
  BIGGEST_CONCERNS,
  SERVICES_FOCUS,
  DEFAULT_BONUSES,
  Bonus,
} from '@/types/database'

function generateSlug(practiceName: string): string {
  const year = new Date().getFullYear()
  const slug = practiceName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return `${slug}-${year}`
}

export default function NewProposalPage() {
  const router = useRouter()
  const supabaseRef = useRef<SupabaseClient | null>(null)

  const getSupabase = () => {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient()
    }
    return supabaseRef.current
  }

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
  const [bonuses, setBonuses] = useState<Bonus[]>(DEFAULT_BONUSES)

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

  // Form state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-generate slug when practice name changes
  useEffect(() => {
    if (practiceName) {
      setSlug(generateSlug(practiceName))
    }
  }, [practiceName])

  // Validate slug uniqueness
  const validateSlug = async (slugValue: string) => {
    if (!slugValue) return

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (slugError) {
      setError('Please fix the URL slug before submitting.')
      setLoading(false)
      return
    }

    const { data: { user } } = await getSupabase().auth.getUser()
    if (!user) {
      setError('You must be logged in to create a proposal.')
      setLoading(false)
      return
    }

    // Insert proposal
    const { data: proposal, error: insertError } = await getSupabase()
      .from('proposals')
      .insert({
        slug,
        created_by: user.id,
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
      })
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    // Generate AI copy
    try {
      const response = await fetch(`/api/generate/${proposal.id}`, {
        method: 'POST',
      })
      if (!response.ok) {
        console.error('AI generation failed, but proposal was saved')
      }
    } catch (err) {
      console.error('AI generation error:', err)
    }

    router.push(`/dashboard/proposals/${proposal.id}`)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Proposal</h1>

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
              <p className="text-sm text-gray-500 mt-1">Just the ID from the Loom URL (e.g., a1b2c3d4)</p>
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
            This information personalizes the proposal with AI.
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
            disabled={loading || !!slugError}
            className="px-6 py-2 bg-brand-gold text-white rounded-md font-medium hover:bg-brand-gold-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Proposal'}
          </button>
        </div>
      </form>
    </div>
  )
}
