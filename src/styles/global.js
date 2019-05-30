import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`${({
  theme: { font, colors, dark }
}) => css`
  html {
    color: ${colors.text};
    background-color: ${dark ? colors.gray[11] : colors.gray[1]};
    transition: background-color 0.3s ease;
  }

  body {
    font-family: ${font.family};
    font-size: ${font.sizes.default}px;
    font-weight: ${font.weights.normal};
    margin: 0;
    padding: 0;

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
