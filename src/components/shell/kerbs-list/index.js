import React from 'react'
import Grid from 'components/shell/grid'
import { FiClock, FiXSquare } from 'react-icons/fi'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import * as S from './styles'

dayjs.extend(relativeTime)

const KerbsList = ({ kerbs, ...props }) => {
  if (kerbs.length === 0) {
    return (
      <Grid {...props}>
        {[
          <S.Kerbs>
            <S.Content>
              <S.EmptyState>
                <FiXSquare />
                Nothing found
              </S.EmptyState>
            </S.Content>
          </S.Kerbs>
        ]}
      </Grid>
    )
  }

  return (
    <Grid {...props}>
      {kerbs.map(({ kerb: Kerb, id, stats }) => {
        return (
          <S.Kerbs key={id}>
            <S.Content>
              <Kerb />
            </S.Content>
            <S.Footer>
              <FiClock /> Updated {dayjs(stats.mtime).from(dayjs())}
            </S.Footer>
          </S.Kerbs>
        )
      })}
    </Grid>
  )
}

export default KerbsList
