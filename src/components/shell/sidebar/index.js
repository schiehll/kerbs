import React, { Fragment } from 'react'
import { Transition } from 'react-transition-group'
import Logo from 'components/shell/logo'
import Nav from 'components/shell/nav'
import { config } from 'utils/getKerbs'

import { duration, overlayStyles, sideSheetStyles } from './transitions'
import * as S from './styles'

const Sidebar = ({
  items,
  activeItem,
  onClick,
  shouldShowSideSheet,
  toggleSideSheet
}) => {
  return (
    <Fragment>
      <S.Sidebar>
        <Logo>{config?.name || 'unnamed project'}</Logo>
        <Nav items={items} activeItem={activeItem} onClick={onClick} />
      </S.Sidebar>
      <Transition
        appear
        mountOnEnter
        unmountOnExit
        in={shouldShowSideSheet}
        timeout={duration}
      >
        {state => (
          <Fragment>
            <S.Overlay style={overlayStyles(state)} onClick={toggleSideSheet} />
            <S.SideSheet style={sideSheetStyles(state)}>
              <Logo>{config?.name || 'unnamed project'}</Logo>
              <Nav items={items} activeItem={activeItem} onClick={onClick} />
            </S.SideSheet>
          </Fragment>
        )}
      </Transition>
    </Fragment>
  )
}

export default Sidebar
