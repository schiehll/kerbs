import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import useComponentSize from '@rehooks/component-size'

import * as S from './styles'

const Grid = ({ children, maxWidth, ...props }) => {
  const wrapper = useRef(null)
  const { width } = useComponentSize(wrapper)
  const [columnsNumber, setColumnsNumber] = useState(3)

  const calculateColumnsNumber = useCallback(() => {
    setColumnsNumber(Math.floor(wrapper.current.offsetWidth / maxWidth) || 1)
  }, [maxWidth])

  useEffect(() => {
    calculateColumnsNumber()
  }, [width, calculateColumnsNumber])

  return (
    <S.Wrapper ref={wrapper} {...props}>
      {children
        .reduce((columns, child, i) => {
          columns[i % columnsNumber] = (
            columns[i % columnsNumber] || []
          ).concat(child)

          return columns
        }, [])
        .map((column, i) => {
          return <S.Column key={i}>{column}</S.Column>
        })}
    </S.Wrapper>
  )
}

Grid.propTypes = {
  maxWidth: PropTypes.number
}

Grid.defaultProps = {
  maxWidth: 500
}

export default Grid
