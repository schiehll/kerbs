import React from 'react'
import * as S from './styles'

export default S.Grid

export const GridItem = ({ children, size = 2, ...props }) => {
  return (
    <S.GridItem size={size} {...props}>
      {children}
    </S.GridItem>
  )
}
