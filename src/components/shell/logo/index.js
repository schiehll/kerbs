import React from 'react'
import * as S from './styles'

const Logo = ({ children, ...props }) => {
  return <S.Logo {...props}>{children}</S.Logo>
}

export default Logo
