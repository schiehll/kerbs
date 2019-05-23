import React, { Fragment } from 'react'
import GlobalStyles from 'styles/global'
import theme from 'styles/theme'
import Layout from 'components/layout'
import { ThemeProvider } from 'styled-components'

const Kerbs = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyles />
        <Layout />
      </Fragment>
    </ThemeProvider>
  )
}

export default Kerbs
