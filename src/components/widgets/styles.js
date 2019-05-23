import styled, { css } from 'styled-components'

export const Wrapper = styled.main`
  ${({ theme: { spacing } }) => css`
    margin-top: ${spacing.huge}px;
  `}
`

export const Widget = styled.div`
  ${({ theme: { spacing, colors, radius } }) => css`
    overflow: hidden;
    max-height: 100%;
    background-color: ${colors.white};
    padding: ${spacing.big}px;
    border-radius: ${radius}px;
  `}
`
