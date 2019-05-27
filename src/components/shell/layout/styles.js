import styled, { css } from 'styled-components'
import media from 'styles/media'
import { Button as LightSwitch } from 'components/shell/light-switch/styles'

const sidebarSize = 180

export const Wrapper = styled.div`
  ${({ theme: { spacing } }) => css`
    max-width: 1200px;
    margin: 0 auto;
    padding: ${spacing.big}px;
  `}
`

export const Sidebar = styled.div`
  ${({ theme: { spacing } }) => css`
    width: ${sidebarSize}px;
    margin-right: ${spacing.big}px;
    position: fixed;
    height: calc(100vh - ${spacing.big}px);

    ${media.lessThan('tablet')`display: none;`}
  `}
`

export const Content = styled.div`
  ${({ theme: { spacing } }) => css`
    max-width: 100%;
    margin-left: ${sidebarSize + spacing.big}px;

    ${media.lessThan('tablet')`margin-left: 0;`}
  `}
`

export const SideSheetButton = styled.button`
  ${({ theme: { spacing } }) => css`
    border: none;
    background-color: transparent;
    color: currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `}
`

export const Header = styled.div`
  ${({ theme: { spacing } }) => css`
    position: relative;
    margin-bottom: ${spacing.huge}px;
    display: flex;
    align-items: center;

    ${SideSheetButton} {
      margin-right: ${spacing.small}px;
      ${media.greaterThan('tablet')`display: none;`}
    }

    ${LightSwitch} {
      position: absolute;
      right: 0;
    }
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
    width: ${sidebarSize + spacing.big * 2}px;
    padding: ${spacing.big}px;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 20;
  `}
`
