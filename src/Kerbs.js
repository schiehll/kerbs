import React, { useState, useEffect } from 'react'
import Layout from 'components/layout'
import LightContext from 'utils/lightContext'

const initialLight = JSON.parse(localStorage.getItem('light'))

const Kerbs = () => {
  const [light, setLight] = useState(
    initialLight === null ? true : initialLight
  )

  const toggleLightSwitch = () => {
    setLight(!light)
  }

  useEffect(() => {
    localStorage.setItem('light', light)
  }, [light])

  return (
    <LightContext.Provider value={light}>
      <Layout toggleLightSwitch={toggleLightSwitch} />
    </LightContext.Provider>
  )
}

export default Kerbs
