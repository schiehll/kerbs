import React, { Fragment, useState, useEffect, useRef, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import Fuse from 'fuse.js'
import Search from 'components/shell/search'
import Widgets from 'components/shell/widgets'
import Sidebar from 'components/shell/sidebar'
import LightSwitch from 'components/shell/light-switch'
import getKerbs from 'utils/getKerbs'
import { FiMenu } from 'react-icons/fi'
import LightContext from 'utils/lightContext'
import theme from 'styles/theme'

import * as S from './styles'

const Layout = ({ toggleLightSwitch }) => {
  const fuse = useRef(null)
  const allKerbs = useRef([])
  const [kerbs, setKerbs] = useState([])
  const [navItems, setNavItems] = useState([
    { id: '__DASHBOARD__', meta: { title: 'dashboard' } }
  ])
  const [activeItem, setActiveItem] = useState(navItems[0].id)
  const [openSideSheet, setOpenSideSheet] = useState(false)
  const lightContext = useContext(LightContext)

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
    let activeId = '__DASHBOARD__'

    if (!query) {
      setKerbs(allKerbs.current)
    } else {
      const searchResults = fuse.current.search(query)
      setKerbs(allKerbs.current.filter(kerb => searchResults.includes(kerb.id)))

      if (searchResults.length === 1) {
        activeId = searchResults[0]
      }
    }

    setActiveItem(activeId)
  }

  useEffect(() => {
    const loadKerbs = async () => {
      allKerbs.current = await getKerbs()
      fuse.current = new Fuse(allKerbs.current, {
        keys: ['meta.title', 'contents'],
        id: 'id'
      })
      setKerbs(allKerbs.current)
      setNavItems(
        navItems.concat(
          allKerbs.current.sort(
            (a, b) => (a?.meta?.order || 0) - b?.meta?.order
          )
        )
      )
    }

    loadKerbs()
  }, [])

  return (
    <ThemeProvider theme={{ ...theme, dark: !lightContext }}>
      <Fragment>
        <GlobalStyles />
        <S.Wrapper>
          <Sidebar
            items={navItems}
            activeItem={activeItem}
            onClick={handleNavbarItemClick}
            shouldShowSideSheet={openSideSheet}
            toggleSideSheet={toggleSideSheet}
          />
          <S.Content>
            <S.Header>
              <S.SideSheetButton onClick={toggleSideSheet}>
                <FiMenu />
              </S.SideSheetButton>
              <Search onChange={handleSearch} />
              <LightSwitch light={lightContext} onClick={toggleLightSwitch} />
            </S.Header>
            <Widgets widgets={kerbs} />
          </S.Content>
        </S.Wrapper>
      </Fragment>
    </ThemeProvider>
  )
}

export default Layout
