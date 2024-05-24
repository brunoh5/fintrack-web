import { apiClient } from '@/lib/axios-client'

interface FetchTransactionQuery {
	pageIndex?: number | null
	from?: string | null
	to?: string | null
	name?: string | null
	payment_method?: string | null
	category?: string | null
	transaction_type?: string | null
	accountId?: string | null
}

export interface FetchTransactionsResponse {
	transactions: {
		id: string
		name: string
		amountInCents: number
		created_at: string
		accountId: string
		shopName: string
		transaction_type: 'CREDIT' | 'DEBIT'
		payment_method:
			| 'MONEY'
			| 'PIX'
			| 'CREDIT_CARD'
			| 'DEBIT_CARD'
			| 'BANK_CHECK'
			| 'BANK_TRANSFER'
		category:
			| 'FOOD'
			| 'OTHERS'
			| 'HOME'
			| 'TRANSPORTATION'
			| 'ENTERTAINMENT'
			| 'SHOPPING'
	}[]
	transactionsStatus: {
		totalRevenueInCents: number
		totalExpenseInCents: number
	}
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export async function fetchTransactions({
	pageIndex,
	from,
	to,
	name,
	transaction_type,
	payment_method,
	accountId,
	category,
}: FetchTransactionQuery) {
	console.log({ from, to })
	const response = await apiClient.get<FetchTransactionsResponse>(
		'/transactions',
		{
			params: {
				pageIndex,
				from,
				to,
				name,
				transaction_type,
				payment_method,
				category,
				accountId,
			},
		},
	)

	return response.data
}
