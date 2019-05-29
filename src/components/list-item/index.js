import React from 'react'
import * as S from './styles'

const ListItem = ({
  name,
  img,
  description,
  icon: Icon,
  rightIcon: RightIcon,
  ...props
}) => {
  return (
    <S.Item {...props}>
      {Icon && !img && <Icon />}
      {img && <S.Image src={img} />}
      <S.Content>
        {name && <S.Name>{name}</S.Name>}
        {description && <S.Description>{description}</S.Description>}
      </S.Content>
      {RightIcon && <RightIcon />}
    </S.Item>
  )
}

export default ListItem
