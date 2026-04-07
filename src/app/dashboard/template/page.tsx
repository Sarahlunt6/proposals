'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'

const PLACEHOLDERS = [
  { token: '[PREPARED_FOR_COMPANY]', description: 'Practice name' },
  { token: '[PREPARED_FOR_FIRST_NAME]', description: 'Dentist first name' },
  { token: '[PREPARED_FOR_CITY]', description: 'City' },
  { token: '[BONUS_EXPIRATION_DATE]', description: 'Bonus expiry date (MM/DD/YYYY)' },
  { token: '[LOOM_VIDEO_ID]', description: 'Loom video ID' },
  { token: '[PREPARED_BY_NAME]', description: 'Sender full name' },
  { token: '[PREPARED_BY_FIRST_NAME]', description: 'Sender first name' },
  { token: '[PREPARED_BY_INITIALS]', description: 'Sender initials' },
  { token: '[PREPARED_BY_EMAIL]', description: 'Sender email' },
  { token: '[PREPARED_BY_PHONE]', description: 'Sender phone (formatted)' },
  { token: '[PREPARED_BY_PHONE_RAW]', description: 'Sender phone (digits only)' },
  { token: '[PREPARED_BY_CALENDAR_LINK]', description: 'Sender calendar URL' },
  { token: '[AI_HERO_HEADLINE]', description: 'AI-generated hero headline' },
  { token: '[AI_MIRROR_QUOTE]', description: 'AI-generated mirror quote' },
  { token: '[AI_CITY_CALLOUT]', description: 'AI-generated city callout' },
  { token: '<!-- BONUSES_PLACEHOLDER -->', description: 'Dynamic bonus cards' },
]

function formatDate(dateString: string | null): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function TemplateEditorPage() {
  const supabaseRef = useRef<SupabaseClient | null>(null)

  const getSupabase = () => {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient()
    }
    return supabaseRef.current
  }

  const [html, setHtml] = useState('')
  const [templateId, setTemplateId] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchTemplate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTemplate = async () => {
    const { data, error } = await getSupabase()
      .from('template')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .single()

    if (error || !data) {
      setError('Failed to load template')
      setLoading(false)
      return
    }

    setHtml(data.html)
    setTemplateId(data.id)
    setUpdatedAt(data.updated_at)
    setLoading(false)
  }

  const handleSave = async () => {
    if (!templateId) return

    setSaving(true)
    setError(null)
    setSuccess(false)

    const { data: { user } } = await getSupabase().auth.getUser()

    const { error: updateError } = await getSupabase()
      .from('template')
      .update({
        html,
        updated_by: user?.id,
      })
      .eq('id', templateId)

    if (updateError) {
      setError('Failed to save template')
      setSaving(false)
      return
    }

    setUpdatedAt(new Date().toISOString())
    setSuccess(true)
    setSaving(false)

    setTimeout(() => setSuccess(false), 3000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading template...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Template Editor</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-gold text-white px-4 py-2 rounded-md font-medium hover:bg-brand-gold-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? 'Saving...' : 'Save Template'}
        </button>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <span className="text-yellow-600 mr-2">⚠️</span>
          <p className="text-sm text-yellow-800">
            <strong>Changes apply immediately.</strong> All proposals re-render from this template on every page view.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
          Template saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="w-full h-[calc(100vh-280px)] p-4 font-mono text-sm border-0 focus:outline-none focus:ring-0 resize-none"
              spellCheck={false}
            />
          </div>
          {updatedAt && (
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {formatDate(updatedAt)}
            </p>
          )}
        </div>

        {/* Placeholder Reference */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-3">Available Placeholders</h3>
            <div className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto">
              {PLACEHOLDERS.map((placeholder) => (
                <div key={placeholder.token} className="border-b border-gray-100 pb-2 last:border-0">
                  <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-brand-gold break-all">
                    {placeholder.token}
                  </code>
                  <p className="text-xs text-gray-500 mt-1">{placeholder.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
