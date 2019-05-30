import styled, { css } from 'styled-components'
import ListItem from 'components/list-item'
import { FiFile, FiFolder, FiFolderMinus } from 'react-icons/fi'

export const Item = styled(ListItem)`
  ${({ theme: { colors }, isFolder }) => css`
    margin: 0;
    ${!isFolder &&
      `
      background-color: transparent;
      border: 2px solid ${colors.foreground};
    `}
  `}
`

export const Button = styled.button`
  ${({ theme: { spacing } }) => css`
    border: none;
    background: none;
    display: flex;
    padding: 0;
    margin: 0;
    text-align: unset;
    width: 100%;
    cursor: pointer;
    color: currentColor;
  `}
`

export const Breadcrumb = styled.div`
  ${({ theme: { spacing, radius, colors } }) => css`
    display: flex;
    margin: ${spacing.small}px 0 0;
    border-radius: ${radius}px;
    padding: ${spacing.base}px ${spacing.small}px;
    border: 2px solid ${colors.foreground};
    flex-wrap: wrap;
  `}
`

export const BreadcrumbItem = styled.button`
  ${({ theme: { spacing } }) => css`
    border: none;
    background: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: ${spacing.base}px 0;
    text-align: unset;
    cursor: pointer;
    color: currentColor;
  `}
`

export const BreadcrumbSeparator = styled.div`
  ${({ theme: { spacing } }) => css`
    padding: 0 ${spacing.base}px;
    display: flex;
    align-items: center;
  `}
`

export const BreadcrumbPath = styled.span`
  ${({ theme: { font }, isActive }) => css`
    font-weight: ${isActive ? font.weights.bold : font.weights.normal};
  `}
`

export const FileIcon = styled(FiFile)`
  ${({ theme: { font, spacing } }) => css`
    font-size: ${font.sizes.big}px;
    margin-right: ${spacing.small}px;
  `}
`

export const FolderIcon = styled(FiFolder)`
  ${({ theme: { font, spacing } }) => css`
    font-size: ${font.sizes.big}px;
    margin-right: ${spacing.small}px;
  `}
`

export const EmptyFolderIcon = styled(FiFolderMinus)`
  ${({ theme: { font, spacing } }) => css`
    font-size: ${font.sizes.big}px;
    margin-right: ${spacing.small}px;
  `}
`

export const Helper = styled.div`
  ${({ theme: { font, spacing } }) => css`
    font-size: ${font.sizes.small}px;
    margin: ${spacing.small}px 0;
  `}
`
