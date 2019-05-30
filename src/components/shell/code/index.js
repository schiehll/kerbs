import 'prism-themes/themes/prism-hopscotch.css'
import React from 'react'
import { FiTerminal } from 'react-icons/fi'

import * as S from './styles'

const Code = ({ children, ...props }) => {
  return (
    <S.Wrapper {...props}>
      <S.Header>
        <FiTerminal />
      </S.Header>
      <S.Pre>{children}</S.Pre>
    </S.Wrapper>
  )
}

export default Code
