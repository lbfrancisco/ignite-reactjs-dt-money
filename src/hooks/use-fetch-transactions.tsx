import { TransactionsContext } from '@/contexts/transactions-context'
import { useContextSelector } from 'use-context-selector'

export function useFetchTransactions() {
  return useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions
  })
}
