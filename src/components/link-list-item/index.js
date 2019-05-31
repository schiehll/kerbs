import React from 'react'
import PropTypes from 'prop-types'
import ListItem from 'components/list-item'
import useSVGLogo from 'utils/hooks/useSVGLogo'

import * as S from './styles'

const LinkListItem = ({ to, name, img, description, ...props }) => {
  const SVGData = useSVGLogo(to)

  return (
    <S.Link href={SVGData?.url || '#'} target="_blank" {...props}>
      <ListItem
        description={description}
        img={img || SVGData?.src}
        name={name || SVGData?.name}
        rightIcon={S.ExternalLinkIcon}
      />
    </S.Link>
  )
}

LinkListItem.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default LinkListItem
