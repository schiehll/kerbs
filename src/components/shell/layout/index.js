import React, { Fragment, useState, useEffect, useRef, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { createBrowserHistory } from 'history'
import queryString from 'query-string'
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

const history = createBrowserHistory()

const Layout = ({ toggleLightSwitch }) => {
  const sideSheetRef = useRef(null)
  const fuse = useRef(null)
  const allKerbs = useRef([])
  const [kerbs, setKerbs] = useState([])
  const [navItems, setNavItems] = useState([
    { id: '__DASHBOARD__', meta: { title: 'dashboard' }, slug: 'dashboard' }
  ])
  const [activeItem, setActiveItem] = useState(null)
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

      setNavItems(
        navItems.concat(
          allKerbs.current.sort(
            (a, b) => (a?.meta?.order || 0) - b?.meta?.order
          )
        )
      )

      const { kerb } = queryString.parse(history.location.search)
      let initialActiveItem = navItems[0].id
      let initialKerbs = allKerbs.current

      if (kerb) {
        const filteredKerbs = allKerbs.current.filter(k => k.slug === kerb)

        if (filteredKerbs.length > 0) {
          initialActiveItem = allKerbs.current.find(k => k.slug === kerb).id
          initialKerbs = filteredKerbs
        }
      }

      setKerbs(initialKerbs)
      setActiveItem(initialActiveItem)
    }

    loadKerbs()
  }, [])

  useEffect(() => {
    if (openSideSheet && sideSheetRef.current) {
      sideSheetRef.current.focus()
    }
  }, [openSideSheet])

  useEffect(() => {
    if (activeItem) {
      const slug = navItems.find(kerb => kerb.id === activeItem)?.slug
      if (slug) {
        history.push(slug === 'dashboard' ? '/' : `?kerb=${slug}`)
      }
    }
  }, [activeItem])

  return (
    <ThemeProvider theme={{ ...theme, dark: !lightContext }}>
      <Fragment>
        <GlobalStyles />
        <S.Wrapper>
          <Sidebar
            ref={sideSheetRef}
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
