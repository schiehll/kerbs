import React from 'react'

import * as S from './styles'

const Nav = ({ items, activeItem, onClick }) => {
  return (
    <S.Nav>
      {items.map(item => {
        return (
          <S.Item
            key={item.id}
            onClick={() => onClick(item.id)}
            active={item.id === activeItem}
          >
            {item.meta.title}
          </S.Item>
        )
      })}
    </S.Nav>
  )
}

export default Nav
