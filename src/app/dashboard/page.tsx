import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProposalTable from './components/ProposalTable'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Proposals</h1>
        <Link
          href="/dashboard/new"
          className="bg-brand-gold text-white px-4 py-2 rounded-md font-medium hover:bg-brand-gold-dark transition-colors"
        >
          New Proposal
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          Error loading proposals: {error.message}
        </div>
      ) : proposals && proposals.length > 0 ? (
        <ProposalTable proposals={proposals} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 mb-4">No proposals yet</p>
          <Link
            href="/dashboard/new"
            className="text-brand-gold hover:text-brand-gold-dark font-medium"
          >
            Create your first proposal
          </Link>
        </div>
      )}
    </div>
  )
}
