import styled, { css } from 'styled-components'
import { cssElevation } from 'css-elevation'

export const Widget = styled.div`
  ${({ theme: { spacing, colors, radius } }) => css`
    overflow: hidden;
    max-height: 100%;
    background-color: ${colors.white};
    padding: 0;
    border-radius: ${radius}px;
    ${cssElevation({ z: 1 })}
  `}
`

export const Content = styled.div`
  ${({ theme: { spacing } }) => css`
    padding: ${spacing.big}px;
  `}
`

export const Footer = styled.div`
  ${({ theme: { spacing, colors, font } }) => css`
    display: flex;
    align-items: center;
    padding: ${spacing.small}px;
    color: ${colors.gray[6]};
    font-size: ${font.sizes.small}px;
    border-top: 1px solid ${colors.gray[3]};

    > svg {
      margin-right: ${spacing.base}px;
    }
  `}
`
