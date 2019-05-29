import styled, { css } from 'styled-components'
import { cssElevation } from 'css-elevation'

export const Widget = styled.div`
  ${({ theme: { spacing, colors, dark, radius } }) => css`
    overflow: hidden;
    max-height: 100%;
    background-color: ${dark ? colors.gray[10] : colors.white};
    padding: 0;
    border-radius: ${radius}px;

    p {
      line-height: ${spacing.medium}px;
    }

    ${cssElevation({ z: 1 })}
  `}
`

export const Content = styled.div`
  ${({ theme: { spacing } }) => css`
    padding: ${spacing.big}px;
  `}
`

export const Footer = styled.div`
  ${({ theme: { spacing, colors, dark, font } }) => css`
    display: flex;
    align-items: center;
    padding: ${spacing.small}px;
    color: ${dark ? colors.gray[7] : colors.gray[6]};
    font-size: ${font.sizes.small}px;
    border-top: 1px solid ${dark ? colors.gray[9] : colors.gray[3]};

    > svg {
      margin-right: ${spacing.base}px;
    }
  `}
`
