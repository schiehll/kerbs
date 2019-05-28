import styled, { css } from 'styled-components'
import { FiExternalLink } from 'react-icons/fi'

export const ExternalLinkIcon = styled(FiExternalLink)`
  ${({ theme: { spacing, dark } }) => css`
    margin-left: ${spacing.base}px;
    transition: all 0.3 ease;
  `}
`

export const Logo = styled.img`
  ${({ theme: { spacing, colors, dark }, src }) => css`
    width: auto;
    height: ${spacing.small}px;
    margin-right: ${spacing.base}px;
  `}
`

export const Link = styled.a`
  ${({ theme: { spacing, colors, dark } }) => css`
    text-decoration: none;
    color: currentColor;
    padding: ${spacing.base / 2}px ${spacing.base}px;
    border-radius: 50px;
    background-color: ${dark ? colors.black : colors.gray[2]};
    cursor: pointer;
    display: inline-flex;
    align-items: center;

    &:hover {
      ${ExternalLinkIcon} {
        transform: scale(1.2);
      }
    }
  `}
`
