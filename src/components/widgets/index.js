import React from 'react'
import Grid, { GridItem } from 'components/grid'
import Overview from 'docs/overview.mdx'
import Other from 'docs/other.mdx'

import * as S from './styles'

const Widgets = () => {
  return (
    <S.Wrapper>
      <Grid>
        <GridItem size="1">
          <S.Widget>
            <Overview />
          </S.Widget>
        </GridItem>
        <GridItem size="1">
          <S.Widget>
            <Other />
          </S.Widget>
        </GridItem>
        <GridItem size="2">
          <S.Widget>
            <Other />
          </S.Widget>
        </GridItem>
        <GridItem size="2">
          <S.Widget>
            <Overview />
          </S.Widget>
        </GridItem>
      </Grid>
    </S.Wrapper>
  )
}

export default Widgets
