import styled, { css } from 'styled-components'

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
  `}
`

export const Content = styled.div`
  ${({ theme: { spacing } }) => css`
    max-width: 100%;
    margin-left: ${sidebarSize + spacing.big}px;
  `}
`
