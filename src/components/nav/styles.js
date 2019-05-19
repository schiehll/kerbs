import styled, { css } from 'styled-components'

export const Nav = styled.ul`
  list-style: none;
  margin: 120px 0 0 0;
  padding: 0;
`

export const Item = styled.li`
  ${({ active }) => css`
    position: relative;
    padding-left: 20px;
    cursor: pointer;
    height: 40px;
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
        height: 40px;
        width: 4px;
        background-color: white;
        left: 0;
      }
    `}

    &:hover {
      opacity: 1;
    }
  `}
`
