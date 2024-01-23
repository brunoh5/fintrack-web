'use client'

import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

import { api } from '@/services/api'
import { TransactionProps } from '@/types'

import { Transaction } from './components/transaction'
import { TransactionListSkeleton } from './transaction-list-skeleton'

export function RevenueList() {
	const { data: transactions, isLoading } = useQuery<TransactionProps[]>({
		queryKey: ['recent-transactions', 'received'],
		queryFn: async () => {
			const session = await getSession()

			const response = await api.get('/users/transactions?type=received', {
				headers: { Authorization: `Bearer ${session?.user}` },
			})

			return response.data.transactions
		},
	})

	return (
		<div className="flex flex-1 flex-col divide-y divide-[#F3F3F3] pb-2">
			{isLoading ? (
				<TransactionListSkeleton />
			) : (
				transactions?.map((transaction) => (
					<Transaction key={transaction.id} transaction={transaction} />
				))
			)}
		</div>
	)
}
