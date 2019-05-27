import styled, { css } from 'styled-components'
import media from 'styles/media'

export const size = 180

export const Sidebar = styled.div`
  ${({ theme: { spacing } }) => css`
    width: ${size}px;
    margin-right: ${spacing.big}px;
    position: fixed;
    height: calc(100vh - ${spacing.big}px);

    ${media.lessThan('tablet')`display: none;`}
  `}
`

export const Overlay = styled.div`
  ${({ theme: { spacing } }) => css`
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 10;
  `}
`

export const SideSheet = styled.div`
  ${({ theme: { spacing, colors, dark } }) => css`
    background-color: ${dark ? colors.gray[10] : colors.white};
    width: ${size + spacing.big * 2}px;
    padding: ${spacing.big}px;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 20;
  `}
`
