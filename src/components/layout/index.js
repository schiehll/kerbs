import React from 'react'
import Logo from 'components/logo'
import Nav from 'components/nav'
import Search from 'components/search'
import Widgets from 'components/widgets'

import * as S from './styles'

const Layout = () => {
  return (
    <S.Wrapper>
      <S.Sidebar>
        <Logo>project name that's big</Logo>
        <Nav />
      </S.Sidebar>
      <S.Content>
        <Search />
        <Widgets />
      </S.Content>
    </S.Wrapper>
  )
}

export default Layout
