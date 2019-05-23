import styled, { css } from 'styled-components'

export const Logo = styled.div`
  ${({ theme: { font } }) => css`
    text-transform: uppercase;
    font-weight: ${font.weights.bold};
    max-width: 100%;
  `}
`
