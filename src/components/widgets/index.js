import React from 'react'
import Grid from 'components/grid'

import * as S from './styles'

const Widgets = ({ widgets }) => {
  return (
    <Grid gap="20px">
      {widgets.map(({ kerb: Kerb, id }) => {
        return (
          <S.Widget key={id}>
            <Kerb />
          </S.Widget>
        )
      })}
    </Grid>
  )
}

export default Widgets
