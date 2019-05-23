import styled, { css } from 'styled-components'

export const Nav = styled.ul`
  ${({ theme: { spacing } }) => css`
    list-style: none;
    margin: ${spacing.huge * 2}px 0 0 0;
    padding: 0;
  `}
`

export const Item = styled.li`
  ${({ theme: { spacing, colors }, active }) => css`
    position: relative;
    padding: ${spacing.small}px 0 ${spacing.small}px ${spacing.small}px;
    cursor: pointer;
    display: flex;
    align-items: center;
    opacity: 0.8;
    text-transform: capitalize;

    ${active &&
      `
      opacity: 1;
      &:before {
        position: absolute;
        content: '';
        height: 100%;
        width: 4px;
        background-color: ${colors.gray[8]};
        left: 0;
      }
    `}

    &:hover {
      opacity: 1;
    }
  `}
`
