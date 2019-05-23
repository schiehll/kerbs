import colors from 'open-color/open-color.json'

const baseSpacing = 8

const theme = {
  colors,

  spacing: {
    base: baseSpacing,
    small: baseSpacing * 2,
    medium: baseSpacing * 3,
    big: baseSpacing * 4,
    huge: baseSpacing * 5
  },

  radius: 4,

  font: {
    family: 'Arial',
    weights: {
      normal: 400,
      thin: 200,
      bold: 600
    },
    sizes: {
      default: 16,
      small: 12,
      big: 18,
      h1: 42,
      h2: 24
    }
  },

  breakpoints: {
    desktop: 1200,
    tablet: 768,
    phone: 420
  }
}

export default theme