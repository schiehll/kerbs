import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme: { spacing } }) => css`
    display: grid;
    grid-auto-flow: column;
    grid-gap: ${spacing.small}px;
  `}
`

export const Column = styled.div`
  ${({ theme: { spacing } }) => css`
    display: grid;
    grid-gap: ${spacing.small}px;
    grid-auto-rows: max-content;
  `}
`
