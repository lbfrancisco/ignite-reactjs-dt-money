import { useCreateTransaction } from '@/hooks/use-create-transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowDownCircle, ArrowUpCircle, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Close,
  Content,
  Overlay,
  Title,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const newTransactionFormSchema = z.object({
  description: z.string().min(1),
  price: z.coerce.number().int().positive(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormSchema = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const createTransaction = useCreateTransaction()

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormSchema>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      description: '',
      // price: 0,
      category: '',
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormSchema) {
    createTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Title>Nova transação</Title>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price')}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowUpCircle size={24} />
                    <span>Entrada</span>
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowDownCircle />
                    <span>Saída</span>
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>

        <Close>
          <X size={24} />
        </Close>
      </Content>
    </Dialog.Portal>
  )
}
