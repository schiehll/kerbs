import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Transition } from 'react-transition-group'
import Logo from 'components/logo'
import Nav from 'components/nav'
import Search from 'components/search'
import Widgets from 'components/widgets'
import getKerbs from 'utils/getKerbs'
import { FiMenu } from 'react-icons/fi'
import Fuse from 'fuse.js'
import { duration, overlayStyles, sideSheetStyles } from './transitions'

import * as S from './styles'

const Layout = () => {
  const fuse = useRef(null)
  const allKerbs = useRef([])
  const [kerbs, setKerbs] = useState([])
  const [navItems, setNavItems] = useState([
    { id: '__DASHBOARD__', meta: { title: 'dashboard' } }
  ])
  const [activeItem, setActiveItem] = useState(navItems[0].id)
  const [openSideSheet, setOpenSideSheet] = useState(false)

  const toggleSideSheet = () => {
    setOpenSideSheet(!openSideSheet)
  }

  const handleNavbarItemClick = itemId => {
    setActiveItem(itemId)
    setKerbs(
      itemId === '__DASHBOARD__'
        ? allKerbs.current
        : allKerbs.current.filter(kerb => kerb.id === itemId)
    )

    if (openSideSheet) {
      setOpenSideSheet(false)
    }
  }

  const handleSearch = e => {
    const query = e.target.value

    if (!query) {
      setKerbs(allKerbs.current)
    } else {
      const searchResults = fuse.current.search(query)
      setKerbs(allKerbs.current.filter(kerb => searchResults.includes(kerb.id)))
    }
  }

  useEffect(() => {
    const loadKerbs = async () => {
      allKerbs.current = await getKerbs()
      fuse.current = new Fuse(allKerbs.current, {
        keys: ['meta.title', 'contents'],
        id: 'id'
      })
      setKerbs(allKerbs.current)
      setNavItems(navItems.concat(allKerbs.current))

      console.log('allKerbs.current', allKerbs.current)
    }

    loadKerbs()
  }, [])

  return (
    <S.Wrapper>
      <S.Sidebar>
        <Logo>project name that's big</Logo>
        <Nav
          items={navItems}
          activeItem={activeItem}
          onClick={handleNavbarItemClick}
        />
      </S.Sidebar>
      <S.Content>
        <S.Header>
          <S.SideSheetButton onClick={toggleSideSheet}>
            <FiMenu />
          </S.SideSheetButton>
          <Search onChange={handleSearch} />
        </S.Header>
        <Widgets widgets={kerbs} />
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
                items={navItems}
                activeItem={activeItem}
                onClick={handleNavbarItemClick}
              />
            </S.SideSheet>
          </Fragment>
        )}
      </Transition>
    </S.Wrapper>
  )
}

export default Layout
