import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme: { colors, spacing, radius, font } }) => css`
    background-color: ${colors.gray[8]};
    display: inline-flex;
    padding: 2px ${spacing.base}px;
    color: ${colors.teal[4]};
    font-family: monospace;
    font-size: ${font.sizes.medium}px;
    border-radius: ${radius}px;
  `}
`
