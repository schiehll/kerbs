import nanoid from 'nanoid'

const allKerbs = preval`
  const React = require('react')
  const fs = require('fs')
  const path = require('path')

  const kerbs = fs.readdirSync(path.resolve(process.cwd(), '.docs'))

  module.exports = kerbs.map(kerb => {
    const filePath = path.resolve(process.cwd(), '.docs', kerb)

    return {
      path: kerb,
      contents: fs.readFileSync(filePath, 'utf8'),
      stats: fs.statSync(filePath)
    }
  })
`

const getKerbs = () => {
  return Promise.all(
    allKerbs.map(async kerb => {
      const comp = await import(`docs/${kerb.path}`)

      return {
        id: nanoid(),
        kerb: comp.default,
        meta: comp.meta,
        contents: kerb.contents,
        stats: kerb.stats
      }
    })
  )
}

export default getKerbs
