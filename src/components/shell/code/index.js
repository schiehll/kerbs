import 'highlight.js/styles/vs2015.css'
import React from 'react'
import { FiTerminal } from 'react-icons/fi'

import * as S from './styles'

const Code = ({ children }) => {
  return (
    <S.Wrapper>
      <S.Header>
        <FiTerminal />
      </S.Header>
      <S.Pre>{children}</S.Pre>
    </S.Wrapper>
  )
}

export default Code
