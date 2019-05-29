import React from 'react'
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

export default LinkListItem
