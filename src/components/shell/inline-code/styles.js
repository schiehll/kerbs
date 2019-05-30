import styled, { css } from 'styled-components'

export const Wrapper = styled.span`
  ${({ theme: { colors, spacing, radius, font } }) => css`
    background-color: ${colors.foreground};
    display: inline-flex;
    padding: 0 ${spacing.base}px;
    color: currentColor;
    font-family: monospace;
    font-size: ${font.sizes.medium}px;
    border-radius: ${radius}px;
  `}
`
