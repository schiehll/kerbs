import styled, { css } from 'styled-components'
import ListItem from 'components/list-item'
import { FiFile, FiFolder } from 'react-icons/fi'

export const Item = styled(ListItem)`
  ${({ theme: { colors }, isFolder }) => css`
    margin: 0;
    ${!isFolder &&
      `
      background-color: transparent;
      border: 2px solid ${colors.gray[2]};
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
