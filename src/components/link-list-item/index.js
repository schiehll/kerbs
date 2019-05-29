import React from 'react'
import ListItem from 'components/list-item'
import useSVGPorn from 'utils/hooks/useSVGPorn'

import * as S from './styles'

const LinkListItem = ({ to, name, img, description, ...props }) => {
  const SVGPorn = useSVGPorn(to)

  return (
    <S.Link href={SVGPorn?.url || '#'} target="_blank" {...props}>
      <ListItem
        description={description}
        img={img || SVGPorn?.src}
        name={name || SVGPorn?.name}
        icon={S.ExternalLinkIcon}
      />
    </S.Link>
  )
}

export default LinkListItem
