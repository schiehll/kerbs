import React, { Fragment, useState, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import Logo from 'components/logo'
import Nav from 'components/nav'
import Search from 'components/search'
import Widgets from 'components/widgets'
import getKerbs from 'utils/getKerbs'
import { FiMenu } from 'react-icons/fi'
import { duration, overlayStyles, sideSheetStyles } from './transitions'

import * as S from './styles'

const Layout = () => {
  const [kerbs, setKerbs] = useState([
    { id: '__DASHBOARD__', meta: { title: 'dashboard' } }
  ])
  const [activeItem, setActiveItem] = useState(kerbs[0].id)
  const [openSideSheet, setOpenSideSheet] = useState(false)

  const toggleSideSheet = () => {
    setOpenSideSheet(!openSideSheet)
  }

  useEffect(() => {
    const loadKerbs = async () => {
      const allKerbs = await getKerbs()
      setKerbs(kerbs.concat(allKerbs))
    }

    loadKerbs()
  }, [])

  return (
    <S.Wrapper>
      <S.Sidebar>
        <Logo>project name that's big</Logo>
        <Nav items={kerbs} activeItem={activeItem} onClick={setActiveItem} />
      </S.Sidebar>
      <S.Content>
        <S.Header>
          <S.SideSheetButton onClick={toggleSideSheet}>
            <FiMenu />
          </S.SideSheetButton>
          <Search />
        </S.Header>
        <Widgets widgets={kerbs.filter(k => k.id !== '__DASHBOARD__')} />
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
              <Nav
                items={kerbs}
                activeItem={activeItem}
                onClick={setActiveItem}
              />
            </S.SideSheet>
          </Fragment>
        )}
      </Transition>
    </S.Wrapper>
  )
}

export default Layout
