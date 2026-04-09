'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'
import { Proposal } from '@/types/database'

function formatDate(dateString: string | null): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
}

function formatDateTime(dateString: string | null): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    viewed: 'bg-green-100 text-green-700',
  }
  const color = colors[status as keyof typeof colors] || colors.draft

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  )
}

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  practiceName,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  practiceName: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Proposal</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the proposal for <strong>{practiceName}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProposalTable({ proposals }: { proposals: Proposal[] }) {
  const router = useRouter()
  const supabaseRef = useRef<SupabaseClient | null>(null)

  const getSupabase = () => {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient()
    }
    return supabaseRef.current
  }

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; proposal: Proposal | null }>({
    isOpen: false,
    proposal: null,
  })
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyLink = async (proposal: Proposal) => {
    const url = `https://proposal.opkie.com/${proposal.slug}`
    await navigator.clipboard.writeText(url)
    setCopiedId(proposal.id)
    setTimeout(() => setCopiedId(null), 2000)

    // Update status to 'sent' if currently 'draft'
    if (proposal.status === 'draft') {
      await getSupabase()
        .from('proposals')
        .update({ status: 'sent' })
        .eq('id', proposal.id)
      router.refresh()
    }
  }

  const handleDelete = async () => {
    if (!deleteModal.proposal) return

    await getSupabase()
      .from('proposals')
      .delete()
      .eq('id', deleteModal.proposal.id)

    setDeleteModal({ isOpen: false, proposal: null })
    router.refresh()
  }

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Practice Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dentist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Sender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Opens
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proposals.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {proposal.practice_name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {proposal.dentist_first_name} {proposal.dentist_last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                    {proposal.city}, {proposal.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                    {proposal.sender_name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden sm:table-cell">
                    {formatDate(proposal.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={proposal.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                    {proposal.open_count > 0 ? (
                      <div>
                        <span className="font-medium">{proposal.open_count}</span>
                        <span className="block text-xs text-gray-400">
                          Last: {formatDateTime(proposal.last_opened_at)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not yet opened</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleCopyLink(proposal)}
                        className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded text-xs font-medium"
                        title="Copy link"
                      >
                        {copiedId === proposal.id ? 'Copied!' : 'Copy Link'}
                      </button>
                      <a
                        href={`/${proposal.slug}?preview=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded text-xs font-medium"
                      >
                        Preview
                      </a>
                      <Link
                        href={`/dashboard/proposals/${proposal.id}`}
                        className="text-brand-gold hover:text-brand-gold-dark px-2 py-1 rounded text-xs font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, proposal })}
                        className="text-red-600 hover:text-red-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, proposal: null })}
        onConfirm={handleDelete}
        practiceName={deleteModal.proposal?.practice_name || ''}
      />
    </>
  )
}
