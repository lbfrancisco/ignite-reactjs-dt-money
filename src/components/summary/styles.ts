import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`

type SummaryCardProps = {
  variant?: 'green' | 'red'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background-color: ${({ theme }) => theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  ${({ variant }) =>
    variant === 'green' &&
    css`
      background-color: ${({ theme }) => theme['green-700']};
    `}

  ${({ variant }) =>
    variant === 'red' &&
    css`
      background-color: ${({ theme }) => theme['red-700']};
    `}

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme['gray-300']};
  }

  > span {
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: bold;
  }
`
