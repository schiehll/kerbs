import React from 'react'
import useSVGPorn from 'utils/hooks/useSVGPorn'

import * as S from './styles'

const Link = ({ children, to, ...props }) => {
  const SVGPorn = useSVGPorn(to)

  return (
    <S.Link href={SVGPorn?.url || '#'} target="_blank" {...props}>
      {SVGPorn?.src && <S.Logo src={SVGPorn.src} alt={SVGPorn.name} />}
      {children}
      <S.ExternalLinkIcon />
    </S.Link>
  )
}

export default Link
