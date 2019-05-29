import styled, { css } from 'styled-components'
import { ExternalLinkIcon } from 'components/link/styles'

export const Link = styled.a`
  ${({ theme: { spacing, radius, colors, dark } }) => css`
  text-decoration: none;
  color: currentColor;
  cursor: pointer;

  &:hover {
    ${ExternalLinkIcon} {
      transform: scale(1.2);
    }
  `}
`

export { ExternalLinkIcon }
