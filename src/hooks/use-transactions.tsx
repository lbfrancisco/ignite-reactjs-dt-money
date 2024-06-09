import { TransactionsContext } from '@/contexts/transactions-context'
import { useContextSelector } from 'use-context-selector'

export function useTransactions() {
  return useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })
}
