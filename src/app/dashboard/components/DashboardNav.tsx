'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DashboardNav({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="bg-brand-navy shadow-sm border-b border-brand-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-xl font-bold text-brand-gold">
              Opkie
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Proposals
              </Link>
              <Link
                href="/dashboard/template"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Template
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300 hidden sm:block">{userEmail}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-300 hover:text-white font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
