import React from 'react'
import Grid from 'components/shell/grid'
import { FiClock, FiXSquare } from 'react-icons/fi'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import * as S from './styles'

dayjs.extend(relativeTime)

const Widgets = ({ widgets, ...props }) => {
  return (
    <Grid {...props}>
      {widgets.length === 0 && (
        <S.Widget>
          <S.Content>
            <S.EmptyState>
              <FiXSquare />
              Nothing found
            </S.EmptyState>
          </S.Content>
        </S.Widget>
      )}
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
