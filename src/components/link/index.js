import React from 'react'
import PropTypes from 'prop-types'
import useSVGLogo from 'utils/hooks/useSVGLogo'

import * as S from './styles'

const Link = ({ children, to, ...props }) => {
  const SVGData = useSVGLogo(to)

  return (
    <S.Link href={SVGData?.url || '#'} target="_blank" {...props}>
      {SVGData?.src && <S.Logo src={SVGData.src} alt={SVGData.name} />}
      <span>{children}</span>
      <S.ExternalLinkIcon />
    </S.Link>
  )
}

Link.propTypes = {
  to: PropTypes.string
}

export default Link
