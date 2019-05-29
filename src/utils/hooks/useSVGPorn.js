import { useEffect, useState } from 'react'

const useSVGPorn = name => {
  const [SVGPornList, setSVGPornList] = useState(null)
  const [SVGPorn, setSVGPorn] = useState(null)

  useEffect(() => {
    const getSVGPorn = async () => {
      if (SVGPornList === null) {
        const response = await fetch(
          'https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json'
        )

        const list = await response.json()
        setSVGPornList(list)
      }
    }

    if (name) {
      getSVGPorn()
    }
  }, [name])

  useEffect(() => {
    if (SVGPornList !== null) {
      const svgPornFound = SVGPornList.find(
        sp =>
          sp.name.toLowerCase() === name.toLowerCase() ||
          sp.shortname === name.toLowerCase()
      )

      if (svgPornFound) {
        setSVGPorn({
          ...svgPornFound,
          src: `https://cdn.svgporn.com/logos/${svgPornFound.files[0]}`
        })
      }
    }
  }, [SVGPornList])

  return SVGPorn
}

export default useSVGPorn
