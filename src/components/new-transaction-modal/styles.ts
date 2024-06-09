import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background-color: ${({ theme }) => theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin-top: 2rem;

    input {
      border-radius: 6px;
      border: 0;
      background-color: ${({ theme }) => theme['gray-900']};
      color: ${({ theme }) => theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${({ theme }) => theme['gray-500']};
      }
    }

    button[type='submit'] {
      border-radius: 6px;
      border: 0;
      background-color: ${({ theme }) => theme['green-500']};
      color: ${({ theme }) => theme.white};
      padding: 1rem 2rem;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme['green-700']};
        transition: background-color 0.2s;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`
export const Title = styled(Dialog.Title)`
  color: ${({ theme }) => theme['gray-100']};
`

export const Close = styled(Dialog.Close)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme['gray-500']};
  cursor: pointer;
`

export const TransactionType = styled(RadioGroup.Root)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  gap: 1rem;
`

type TransactionTypeButtonProps = {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;

  border: 1px;
  border-radius: 6px;
  padding: 1rem 1.5rem;
  cursor: pointer;

  background-color: ${({ theme }) => theme['gray-700']};
  color: ${({ theme }) => theme['gray-300']};

  &:hover {
    background-color: ${({ theme }) => theme['gray-600']};
  }

  > svg {
    color: ${({ theme, variant }) =>
      variant === 'income' ? theme['green-500'] : theme['red-500']};
  }

  &[data-state='checked'] {
    background-color: ${({ theme, variant }) =>
      variant === 'income' ? theme['green-500'] : theme['red-500']};
    color: ${({ theme }) => theme.white};

    svg {
      color: ${({ theme }) => theme.white};
    }
  }
`
