import React from 'react'
import useSVGLogo from 'utils/hooks/useSVGLogo'

import * as S from './styles'

const Link = ({ children, to, ...props }) => {
  const SVGData = useSVGLogo(to)

  return (
    <S.Link href={SVGData?.url || '#'} target="_blank" {...props}>
      {SVGData?.src && <S.Logo src={SVGData.src} alt={SVGData.name} />}
      {children}
      <S.ExternalLinkIcon />
    </S.Link>
  )
}

export default Link
