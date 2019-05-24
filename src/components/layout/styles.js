import styled, { css } from 'styled-components'
import media from 'styles/media'

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

export const Header = styled.div`
  ${({ theme: { spacing } }) => css`
    margin-bottom: ${spacing.huge}px;
    display: flex;
    align-items: center;

    > button {
      margin-right: ${spacing.small}px;
      ${media.greaterThan('tablet')`display: none;`}
    }
  `}
`

export const Overlay = styled.div`
  ${({ theme: { spacing, colors } }) => css`
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
  ${({ theme: { spacing, colors } }) => css`
    background-color: ${colors.white};
    width: ${sidebarSize + spacing.big * 2}px;
    padding: ${spacing.big}px;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 20;
  `}
`

export const SideSheetButton = styled.button`
  ${({ theme: { spacing, colors } }) => css`
    border: none;
    background: none;
    color: ${colors.gray[8]};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `}
`
