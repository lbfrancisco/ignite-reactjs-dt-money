import { api } from '@/lib/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createContext } from 'use-context-selector'

export type Transaction = {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  createdAt: string
  category: string
}

type CreateTransaction = {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

type TransactionsContextType = {
  transactions: Transaction[]
  summary: {
    income: number
    outcome: number
    total: number
  }
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransaction) => void
}

export const TransactionsContext = createContext({} as TransactionsContextType)

type TransactionsProviderProps = {
  children: React.ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const createTransaction = useCallback(async (data: CreateTransaction) => {
    const response = await api.post('/transactions', {
      ...data,
      createdAt: new Date().toISOString(),
    })

    setTransactions((prev) => [...prev, response.data])
  }, [])

  const income = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.price, 0)
  }, [transactions])

  const outcome = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === 'outcome')
      .reduce((acc, transaction) => acc + transaction.price, 0)
  }, [transactions])

  const total = useMemo(() => {
    return income + outcome * -1
  }, [income, outcome])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        summary: {
          income,
          outcome,
          total,
        },
        createTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
