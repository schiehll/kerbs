import styled, { css } from 'styled-components'
import media from 'styles/media'
import { Button as LightSwitch } from 'components/shell/light-switch/styles'
import { size as sidebarSize } from 'components/shell/sidebar/styles'

export const Wrapper = styled.div`
  ${({ theme: { spacing } }) => css`
    max-width: 1200px;
    margin: 0 auto;
    padding: ${spacing.big}px;
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
