import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import * as S from './styles'

const Nav = forwardRef(({ items, activeItem, onClick, ...props }, ref) => {
  return (
    <S.Nav {...props}>
      {items.map(item => {
        return (
          <S.Item
            ref={item.id === activeItem ? ref : null}
            key={item.id}
            onClick={() => onClick(item.id)}
            active={item.id === activeItem}
          >
            {item?.meta?.title || 'untitled'}
          </S.Item>
        )
      })}
    </S.Nav>
  )
})

Nav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      meta: PropTypes.shape({
        title: PropTypes.string
      })
    })
  ).isRequired,
  activeItem: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default Nav
