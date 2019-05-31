import styled, { css } from 'styled-components'
import { FiExternalLink } from 'react-icons/fi'

export const ExternalLinkIcon = styled(FiExternalLink)`
  ${({ theme: { spacing } }) => css`
    margin-left: ${spacing.base}px;
  `}
`

export const Logo = styled.img`
  ${({ theme: { spacing }, src }) => css`
    width: auto;
    height: ${spacing.small}px;
    margin-right: ${spacing.base}px;
  `}
`

export const Link = styled.a`
  ${({ theme: { spacing, colors } }) => css`
    text-decoration: none;
    color: currentColor;
    padding: ${spacing.base / 2}px ${spacing.base}px;
    border-radius: 50px;
    background-color: ${colors.foreground};
    cursor: pointer;
    display: inline-flex;
    align-items: center;

    ${ExternalLinkIcon} {
      transition: all 0.3s ease;
    }

    &:hover {
      ${ExternalLinkIcon} {
        transform: scale(1.2);
      }
    }

    > span {
      flex: 1;
      min-width: fit-content;
    }
  `}
`
