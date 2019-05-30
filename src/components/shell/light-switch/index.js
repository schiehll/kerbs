import React from 'react'
import PropTypes from 'prop-types'
import { FiMoon } from 'react-icons/fi'

import * as S from './styles'

const LightSwitch = ({ light, onClick, ...props }) => {
  return (
    <S.Button onClick={onClick} {...props}>
      <S.Circle>{!light && <FiMoon />}</S.Circle>
    </S.Button>
  )
}

LightSwitch.propTypes = {
  light: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default LightSwitch
