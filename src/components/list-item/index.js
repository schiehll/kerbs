import React from 'react'
import * as S from './styles'

const ListItem = ({ name, img, description, icon: Icon }) => {
  return (
    <S.Item>
      {img && <S.Image src={img} />}
      <S.Content>
        {name && <S.Name>{name}</S.Name>}
        {description && <S.Description>{description}</S.Description>}
      </S.Content>
      {Icon && <Icon />}
    </S.Item>
  )
}

export default ListItem
