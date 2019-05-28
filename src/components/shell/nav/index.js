import React, { forwardRef } from 'react'

import * as S from './styles'

const Nav = forwardRef(({ items, activeItem, onClick }, ref) => {
  return (
    <S.Nav>
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

export default Nav
