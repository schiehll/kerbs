import React, { Fragment, useState } from 'react'
import { Transition } from 'react-transition-group'
import Logo from 'components/logo'
import Nav from 'components/nav'
import Search from 'components/search'
import Widgets from 'components/widgets'
import { FiMenu } from 'react-icons/fi'
import { duration, overlayStyles, sideSheetStyles } from './transitions'

import * as S from './styles'

const Layout = () => {
  const [openSideSheet, setOpenSideSheet] = useState(false)

  const toggleSideSheet = () => {
    setOpenSideSheet(!openSideSheet)
  }

  return (
    <S.Wrapper>
      <S.Sidebar>
        <Logo>project name that's big</Logo>
        <Nav />
      </S.Sidebar>
      <S.Content>
        <S.Header>
          <S.SideSheetButton onClick={toggleSideSheet}>
            <FiMenu />
          </S.SideSheetButton>
          <Search />
        </S.Header>
        <Widgets />
      </S.Content>
      <Transition
        appear
        mountOnEnter
        unmountOnExit
        in={openSideSheet}
        timeout={duration}
      >
        {state => (
          <Fragment>
            <S.Overlay style={overlayStyles(state)} onClick={toggleSideSheet} />
            <S.SideSheet style={sideSheetStyles(state)}>
              <Logo>project name that's big</Logo>
              <Nav />
            </S.SideSheet>
          </Fragment>
        )}
      </Transition>
    </S.Wrapper>
  )
}

export default Layout
