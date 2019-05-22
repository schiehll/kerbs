import React, { useRef, useState, useEffect } from 'react'

import * as S from './styles'

const Masonry = ({ children, gap, minWidth = 400 }) => {
  const wrapper = useRef()
  const numCols = useRef(3)
  const [cols, setCols] = useState([])

  const getCols = () => {
    const _cols = []
    for (let i = 0; i < numCols.current; i++) _cols[i] = []
    children.forEach((child, i) => _cols[i % numCols.current].push(child))

    return _cols
  }

  const calcNumCols = () => {
    numCols.current = Math.floor(wrapper.current.offsetWidth / minWidth)
    setCols(getCols())
  }

  useEffect(() => {
    calcNumCols()

    window.addEventListener(`resize`, calcNumCols)
    return () => window.removeEventListener(`resize`, calcNumCols)
  }, [])

  return (
    <S.Wrapper ref={wrapper} gap={gap}>
      {Array(numCols.current)
        .fill()
        .map((_, i) => (
          <S.Col key={i} gap={gap}>
            {cols[i]}
          </S.Col>
        ))}
    </S.Wrapper>
  )
}

export default Masonry
