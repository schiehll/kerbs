import styled, { css } from 'styled-components'

export const Nav = styled.div`
  ${({ theme: { spacing } }) => css`
    margin-top: ${spacing.huge * 4}px;
    padding: 0;
  `}
`

export const Item = styled.button`
  ${({ theme: { spacing, colors, radius }, active }) => css`
    position: relative;
    padding: ${spacing.small}px 0 ${spacing.small}px ${spacing.small}px;
    cursor: pointer;
    display: flex;
    align-items: center;
    opacity: 0.8;
    text-transform: capitalize;
    border: none;
    background: none;
    text-align: left;
    width: 100%;

    ${active &&
      `
      opacity: 1;
      &:before {
        position: absolute;
        content: '';
        height: 70%;
        width: 4px;
        background-color: ${colors.gray[8]};
        border-radius: ${radius}px;
        left: 0;
      }
    `}

    &:hover {
      opacity: 1;
    }
  `}
`
