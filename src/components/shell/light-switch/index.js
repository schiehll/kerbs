import React from 'react'
import { FiMoon } from 'react-icons/fi'

import * as S from './styles'

const LightSwitch = ({ light, onClick }) => {
  return (
    <S.Button onClick={onClick}>
      <S.Circle>{!light && <FiMoon />}</S.Circle>
    </S.Button>
  )
}

export default LightSwitch
