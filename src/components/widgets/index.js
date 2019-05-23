import React, { Fragment } from 'react'
import Grid from 'components/grid'
import Overview from 'docs/overview.mdx'
import Other from 'docs/other.mdx'

import * as S from './styles'

const Widgets = () => {
  return (
    <Fragment>
      <Grid gap="20px">
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
      </Grid>
    </Fragment>
  )
}

export default Widgets
