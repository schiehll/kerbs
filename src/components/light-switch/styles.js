import styled, { css } from 'styled-components'

export const Button = styled.button`
  ${({ theme: { dark, colors } }) => css`
    position: relative;
    background: none;
    border: 2px solid ${dark ? 'currentColor' : colors.yellow[7]};
    border-radius: 100px;
    width: 60px;
    height: 30px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    color: ${dark ? 'currentColor' : colors.yellow[7]};
    cursor: pointer;
  `}
`

export const Circle = styled.div`
  ${({ theme: { dark, colors } }) => css`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: currentColor;
    position: relative;
    left: ${!dark ? -5 : 27}px;
    transition: all 0.3s ease;

    > svg {
      transition: left 0.3s ease;
      position: relative;
      fill: ${colors.gray[11]};
      height: 20px;
      width: 20px;
    }
  `}
`
