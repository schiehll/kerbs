import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

export default async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json'
    )

    const svgJson = await response.json()
    fs.writeFileSync(
      path.resolve(__dirname, '../src/assets/SVGLogos.json'),
      JSON.stringify(svgJson, null, 2)
    )
  } catch (error) {
    console.log(error)
  }
}
