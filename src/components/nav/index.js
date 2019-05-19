import React, { useState } from 'react'
import * as S from './styles'

const items = [
  { id: 0, name: 'dashboard' },
  { id: 1, name: 'overview' },
  { id: 2, name: 'other' }
]

const Nav = () => {
  const [activeItem, setActiveItem] = useState(items[0]?.id)

  return (
    <S.Nav>
      {items.map(item => {
        return (
          <S.Item
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            active={item.id === activeItem}
          >
            {item.name}
          </S.Item>
        )
      })}
    </S.Nav>
  )
}

export default Nav
