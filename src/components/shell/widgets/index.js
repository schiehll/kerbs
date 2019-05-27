import React from 'react'
import Grid from 'components/shell/grid'
import { FiClock } from 'react-icons/fi'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

import * as S from './styles'

const Widgets = ({ widgets }) => {
  return (
    <Grid gap="20px">
      {widgets.map(({ kerb: Kerb, id, stats }) => {
        return (
          <S.Widget key={id}>
            <S.Content>
              <Kerb />
            </S.Content>
            <S.Footer>
              <FiClock /> Updated {dayjs(stats.mtime).from(dayjs())}
            </S.Footer>
          </S.Widget>
        )
      })}
    </Grid>
  )
}

export default Widgets
