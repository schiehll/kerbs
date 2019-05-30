import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme: { colors, spacing } }) => css`
    background-color: ${colors.foreground};
    padding: ${spacing.base}px;
    margin: ${spacing.medium}px 0;
    border-left: 4px solid currentColor;
    font-style: italic;

    > p {
      margin: 0;
      opacity: 0.6;
    }
  `}
`
