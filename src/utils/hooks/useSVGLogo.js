import { useEffect, useState } from 'react'
import SVGLogos from 'assets/SVGLogos'

const useSVGLogo = name => {
  const [SVGLogo, setSVGLogo] = useState(null)

  useEffect(() => {
    if (SVGLogos !== null && name) {
      const svgLogoFound = SVGLogos.find(
        sp =>
          sp.name.toLowerCase() === name.toLowerCase() ||
          sp.shortname === name.toLowerCase()
      )

      if (svgLogoFound) {
        setSVGLogo({
          ...svgLogoFound,
          src: `https://cdn.svgporn.com/logos/${svgLogoFound.files[0]}`
        })
      }
    }
  }, [name])

  return SVGLogo
}

export default useSVGLogo
