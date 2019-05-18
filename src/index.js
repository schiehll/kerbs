import React from 'react'
import ReactDOM from 'react-dom'
import Kerbs from './Kerbs'

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.render(<Component />, root)
}

render(Kerbs)

if (module.hot) {
  module.hot.accept('./Kerbs', () => {
    render(Kerbs)
  })
}
