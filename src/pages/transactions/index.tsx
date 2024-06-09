import { Header } from '@/components/header'
import { Summary } from '@/components/summary'
import { useTransactions } from '@/hooks/use-transactions'
import { dateFormatter, priceFormatter } from '@/utils/formatter'
import { SearchForm } from './search-form'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const transactions = useTransactions()

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.length > 0 &&
              transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.description}</td>
                    <td>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter(transaction.price)}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>{dateFormatter(transaction.createdAt)}</td>
                  </tr>
                )
              })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
