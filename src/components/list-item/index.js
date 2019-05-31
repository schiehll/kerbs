import React from 'react'
import PropTypes from 'prop-types'
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

ListItem.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  icon: PropTypes.elementType,
  rightIcon: PropTypes.elementType
}

export default ListItem
