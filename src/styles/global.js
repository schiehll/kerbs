import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`${({ theme: { font, colors } }) => css`
  body {
    font-family: ${font.family};
    font-size: ${font.sizes.default}px;
    font-weight: ${font.weights.normal};
    margin: 0;
    padding: 0;
    color: ${colors.gray[8]};
    background-color: ${colors.gray[1]};
    overflow-y: scroll;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  textarea,
  input,
  button,
  select {
    font-family: inherit;
    font-size: inherit;
  }
`}`

export default GlobalStyles
