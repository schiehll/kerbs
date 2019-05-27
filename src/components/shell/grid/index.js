import React, { useRef, useState, useEffect } from 'react'

import * as S from './styles'

const Grid = ({ children, gap, minWidth = 400 }) => {
  const wrapper = useRef()
  const [columnsNumber, setColumnsNumber] = useState(3)

  const calculateColumnsNumber = () => {
    setColumnsNumber(Math.floor(wrapper.current.offsetWidth / minWidth) || 1)
  }

  useEffect(() => {
    calculateColumnsNumber()

    window.addEventListener(`resize`, calculateColumnsNumber)
    return () => window.removeEventListener(`resize`, calculateColumnsNumber)
  }, [])

  return (
    <S.Wrapper ref={wrapper} gap={gap}>
      {children
        .reduce((columns, child, i) => {
          columns[i % columnsNumber] = (
            columns[i % columnsNumber] || []
          ).concat(child)

          return columns
        }, [])
        .map((column, i) => {
          return (
            <S.Column key={i} gap={gap}>
              {column}
            </S.Column>
          )
        })}
    </S.Wrapper>
  )
}

export default Grid
