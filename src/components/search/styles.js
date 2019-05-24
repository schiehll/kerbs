import styled, { css } from 'styled-components'
import { cssElevation } from 'css-elevation'

export const Label = styled.label`
  ${({ theme: { spacing } }) => css`
    width: 50%;
  `}
`

export const InputWrapper = styled.div`
  ${({ theme: { spacing, font } }) => css`
    position: relative;

    > svg {
      position: absolute;
      left: ${spacing.small}px;
      top: ${spacing.small}px;
    }

    > input {
      padding-left: ${spacing.small * 2 + font.sizes.big}px;
    }
  `};
`

export const StyledInput = styled.input`
  ${({ theme: { spacing, colors, radius, font } }) => css`
    padding: ${spacing.small}px;
    width: 100%;
    border: none;
    border-radius: ${radius}px;
    font-size: ${font.sizes.default}px;

    &::placeholder {
      font-size: ${font.sizes.default}px;
      font-weight: ${font.weights.thin};
      color: ${colors.gray[6]};
      opacity: 1;
    }

    background-color: ${colors.white};
    color: ${colors.gray[8]};
    ${cssElevation({ z: 1 })}
  `};
`
