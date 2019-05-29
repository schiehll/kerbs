import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme: { spacing, radius, colors } }) => css`
    display: flex;
    flex-direction: column;
    padding: 0 ${spacing.base / 2}px ${spacing.base}px ${spacing.base / 2}px;
    border-radius: ${radius}px;
    background-color: ${colors.gray[8]};
    color: ${colors.white};
    margin: ${spacing.base}px 0;
  `}
`

export const Header = styled.div`
  ${({ theme: { spacing, colors, radius } }) => css`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: ${spacing.base}px;
    color: ${colors.white};
  `}
`

export const Pre = styled.pre`
  margin: 0;
`
