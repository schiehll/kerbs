import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${({ gap }) => gap || `1em`};
`

export const Column = styled.div`
  display: grid;
  grid-gap: ${({ gap }) => gap || `1em`};
  grid-auto-rows: max-content;
`
