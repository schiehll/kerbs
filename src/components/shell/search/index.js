import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { FiSearch } from 'react-icons/fi'

import * as S from './styles'

const Search = forwardRef(({ onChange, ...props }, ref) => {
  return (
    <S.Label {...props}>
      <S.InputWrapper>
        <FiSearch />
        <S.StyledInput
          ref={ref}
          onChange={onChange}
          type="search"
          placeholder="Search..."
        />
      </S.InputWrapper>
    </S.Label>
  )
})

Search.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default Search
