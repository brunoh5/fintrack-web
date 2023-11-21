import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { RecentTransactionsList } from './recent-transactions-list'

export function RecentTransaction() {
  return (
    <div className="h-[582px] w-full max-w-[352px]">
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-[22px] text-gray-500">Recent Transaction</h2>
        <div className="flex items-center text-gray-500">
          <Link className="text-xs" href="/dashboard/transactions">
            View all
          </Link>
          <ChevronRight size={16} />
        </div>
      </div>

      <div className="flex h-[542px] flex-col gap-3 rounded-lg bg-white px-6 pb-8 pt-4">
        <div className="flex items-center justify-between font-bold text-gray-900">
          <span className="border-b-2 border-persian-green p-2 text-persian-green">
            All
          </span>
          <span className="p-2">Revenue</span>
          <span className="p-2">Expenses</span>
        </div>

        <RecentTransactionsList />
      </div>
    </div>
  )
}
