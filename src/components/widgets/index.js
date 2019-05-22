import React from 'react'
import Masonry from 'components/masonry'
import Overview from 'docs/overview.mdx'
import Other from 'docs/other.mdx'

import * as S from './styles'

const Widgets = () => {
  return (
    <S.Wrapper>
      <Masonry gap={'20px'}>
        <S.Widget>
          <Overview />
        </S.Widget>

        <S.Widget>
          <Other />
        </S.Widget>

        <S.Widget>
          <Other />
        </S.Widget>

        <S.Widget>
          <Overview />
        </S.Widget>
        <S.Widget>
          <Overview />
        </S.Widget>

        <S.Widget>
          <Other />
        </S.Widget>

        <S.Widget>
          <Other />
        </S.Widget>

        <S.Widget>
          <Overview />
        </S.Widget>
      </Masonry>
    </S.Wrapper>
  )
}

export default Widgets
