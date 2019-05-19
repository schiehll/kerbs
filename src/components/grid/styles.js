import styled, { css } from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  grid-auto-rows: minmax(200px, auto);
  grid-auto-flow: dense;
  padding: 0;
`

export const GridItem = styled.div`
  ${({ size }) => css`
    grid-column-end: span ${size};
    grid-row-end: span ${size};
  `}
`
