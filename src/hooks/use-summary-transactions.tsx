import { TransactionsContext } from '@/contexts/transactions-context'
import { useContextSelector } from 'use-context-selector'

export function useSummaryTransactions() {
  return useContextSelector(TransactionsContext, (context) => {
    return context.summary
  })
}
