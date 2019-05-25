import React from 'react'
import { FiSearch } from 'react-icons/fi'

import * as S from './styles'

const Search = ({ onChange }) => {
  return (
    <S.Label>
      <S.InputWrapper>
        <FiSearch />
        <S.StyledInput
          onChange={onChange}
          type="search"
          placeholder="Search..."
        />
      </S.InputWrapper>
    </S.Label>
  )
}

export default Search
