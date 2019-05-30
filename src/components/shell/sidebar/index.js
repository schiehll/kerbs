import React, { forwardRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import Logo from 'components/shell/logo'
import Nav from 'components/shell/nav'
import { config } from 'utils/getKerbs'

import { duration, overlayStyles, sideSheetStyles } from './transitions'
import * as S from './styles'

const Sidebar = forwardRef(
  (
    { items, activeItem, onClick, shouldShowSideSheet, toggleSideSheet },
    ref
  ) => {
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
              <S.Overlay
                style={overlayStyles(state)}
                onClick={toggleSideSheet}
              />
              <S.SideSheet style={sideSheetStyles(state)}>
                <Logo>{config?.name || 'unnamed project'}</Logo>
                <Nav
                  ref={ref}
                  items={items}
                  activeItem={activeItem}
                  onClick={onClick}
                />
              </S.SideSheet>
            </Fragment>
          )}
        </Transition>
      </Fragment>
    )
  }
)

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      meta: PropTypes.shape({
        title: PropTypes.string
      })
    })
  ).isRequired,
  activeItem: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  toggleSideSheet: PropTypes.func.isRequired,
  shouldShowSideSheet: PropTypes.bool
}

export default Sidebar
