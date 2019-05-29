import styled, { css } from 'styled-components'

export const Item = styled.div`
  ${({ theme: { spacing, radius, colors, dark } }) => css`
    padding: ${spacing.small}px;
    border-radius: ${radius}px;
    background-color: ${dark ? colors.gray[8] : colors.gray[2]};
    display: flex;
    align-items: center;
    width: 100%;
  `}
`

export const Image = styled.img`
  ${({ theme: { spacing } }) => css`
    height: ${spacing.big}px;
    width: auto;
    margin-right: ${spacing.small}px;
  `}
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Name = styled.div`
  ${({ theme: { font, spacing } }) => css`
    font-weight: ${font.weights.bold};
    margin-bottom: ${spacing.base}px;
  `}
`

export const Description = styled.div`
  ${({ theme: { font, colors } }) => css`
    font-size: ${font.sizes.small}px;
    color: ${colors.gray[6]};
  `}
`
