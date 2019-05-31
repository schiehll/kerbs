import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { createBrowserHistory } from 'history'
import queryString from 'query-string'
import GlobalStyles from 'styles/global'
import Search from 'components/shell/search'
import Widgets from 'components/shell/widgets'
import Sidebar from 'components/shell/sidebar'
import Loading from 'components/shell/loading'
import Code from 'components/shell/code'
import InlineCode from 'components/shell/inline-code'
import Blockquote from 'components/shell/blockquote'
import LightSwitch from 'components/shell/light-switch'
import getKerbs from 'utils/getKerbs'
import { FiMenu } from 'react-icons/fi'
import LightContext from 'utils/lightContext'
import useDebounce from 'utils/hooks/useDebounce'
import theme from 'styles/theme'
import { MDXProvider } from '@mdx-js/react'

import * as S from './styles'

const history = createBrowserHistory()

const Layout = ({ toggleLightSwitch, ...props }) => {
  const searchInputRef = useRef(null)
  const sideSheetRef = useRef(null)
  const allKerbs = useRef([])
  const [kerbs, setKerbs] = useState([])
  const [navItems, setNavItems] = useState([])
  const [activeItem, setActiveItem] = useState(null)
  const [openSideSheet, setOpenSideSheet] = useState(false)
  const lightContext = useContext(LightContext)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const debouncedSearch = useDebounce(search, 250)

  const toggleSideSheet = () => {
    setOpenSideSheet(!openSideSheet)
  }

  const handleNavbarItemClick = itemId => {
    if (searchInputRef.current) {
      searchInputRef.current.value = ''
    }

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

  const doSearch = useCallback(() => {
    const regex = new RegExp(debouncedSearch, 'ig')
    return allKerbs.current.filter(kerb => {
      if (
        kerb?.meta?.title.search(regex) !== -1 ||
        kerb?.contents.search(regex) !== -1
      ) {
        return true
      }

      return false
    })
  }, [debouncedSearch])

  const handleSearch = e => {
    const query = e.target.value
    setSearch(query)
  }

  useEffect(() => {
    let activeId = '__DASHBOARD__'

    if (!debouncedSearch) {
      setKerbs(allKerbs.current)
    } else {
      const searchResults = doSearch()
      setKerbs(searchResults)

      if (searchResults.length === 1) {
        activeId = searchResults[0].id
      }
    }

    setActiveItem(activeId)
  }, [debouncedSearch, doSearch])

  useEffect(() => {
    const loadKerbs = async () => {
      allKerbs.current = await getKerbs()
      const initialNavItems = [
        {
          id: '__DASHBOARD__',
          meta: { title: 'dashboard' },
          slug: 'dashboard'
        },
        ...allKerbs.current.sort(
          (a, b) => (a?.meta?.order || 0) - b?.meta?.order
        )
      ]

      const { kerb } = queryString.parse(history.location.search)
      let initialActiveItem = initialNavItems[0].id
      let initialKerbs = allKerbs.current

      if (kerb) {
        const filteredKerbs = allKerbs.current.filter(k => k.slug === kerb)

        if (filteredKerbs.length > 0) {
          initialActiveItem = allKerbs.current.find(k => k.slug === kerb).id
          initialKerbs = filteredKerbs
        }
      }

      setKerbs(initialKerbs)
      setNavItems(initialNavItems)
      setActiveItem(initialActiveItem)
      setLoading(false)
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
  }, [activeItem, navItems])

  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          foreground: theme.colors.gray[lightContext ? 2 : 8],
          background: lightContext ? theme.colors.white : theme.colors.gray[10],
          text: theme.colors.gray[lightContext ? 9 : 5]
        },
        dark: !lightContext
      }}
    >
      <MDXProvider
        components={{
          pre: Code,
          code: InlineCode,
          blockquote: Blockquote
        }}
      >
        <Fragment>
          <GlobalStyles />
          <S.Wrapper {...props}>
            {loading && <Loading />}
            {!loading && (
              <Fragment>
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
                    <Search ref={searchInputRef} onChange={handleSearch} />
                    <LightSwitch
                      light={lightContext}
                      onClick={toggleLightSwitch}
                    />
                  </S.Header>
                  <Widgets widgets={kerbs} />
                </S.Content>
              </Fragment>
            )}
          </S.Wrapper>
        </Fragment>
      </MDXProvider>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  toggleLightSwitch: PropTypes.func.isRequired
}

export default Layout
