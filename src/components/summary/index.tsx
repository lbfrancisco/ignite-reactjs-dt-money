import { useSummaryTransactions } from '@/hooks/use-summary-transactions'
import { defaultTheme } from '@/styles/themes/default'
import { priceFormatter } from '@/utils/formatter'
import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign } from 'lucide-react'
import { SummaryCard, SummaryContainer } from './styles'

export function Summary() {
  const summary = useSummaryTransactions()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowUpCircle size={32} color={defaultTheme['green-500']} />
        </header>
        <span>{priceFormatter(summary.income)}</span>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowDownCircle size={32} color={defaultTheme['red-300']} />
        </header>
        <span>{priceFormatter(summary.outcome)}</span>
      </SummaryCard>
      <SummaryCard variant={summary.total < 0 ? 'red' : 'green'}>
        <header>
          <span>Total</span>
          <CircleDollarSign size={32} color={defaultTheme.white} />
        </header>
        <span>{priceFormatter(summary.total)}</span>
      </SummaryCard>
    </SummaryContainer>
  )
}
