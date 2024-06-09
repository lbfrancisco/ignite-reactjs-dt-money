import { useFetchTransactions } from '@/hooks/use-fetch-transactions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SearchFormContainer } from './styles'
import { memo } from 'react'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormSchema = z.infer<typeof searchFormSchema>

export function SearchFormComponent() {
  const fetchTransactions = useFetchTransactions()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  })

  async function handleSearchTransactions({ query }: SearchFormSchema) {
    console.log(query)
    await fetchTransactions(query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações..."
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <Search size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
