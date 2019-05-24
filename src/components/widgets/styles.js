import styled, { css } from 'styled-components'
import { cssElevation } from 'css-elevation'

export const Widget = styled.div`
  ${({ theme: { spacing, colors, radius } }) => css`
    overflow: hidden;
    max-height: 100%;
    background-color: ${colors.white};
    padding: ${spacing.big}px;
    border-radius: ${radius}px;
    ${cssElevation({ z: 1 })}
  `}
`
