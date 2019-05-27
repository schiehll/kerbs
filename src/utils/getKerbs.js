import nanoid from 'nanoid'

const allKerbs = preval`
  const fs = require('fs')
  const path = require('path')

  const kerbs = fs.readdirSync(path.resolve(process.cwd(), '.kerbs'))

  module.exports = kerbs.filter(kerb => kerb.endsWith('.mdx')).map(kerb => {
    const filePath = path.resolve(process.cwd(), '.kerbs', kerb)

    return {
      path: kerb,
      contents: fs.readFileSync(filePath, 'utf8'),
      stats: fs.statSync(filePath)
    }
  })
`

export const config = preval`
  const fs = require('fs')
  const path = require('path')

  module.exports = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.kerbs/.kerbsrc.json')))
`

const getKerbs = () => {
  return Promise.all(
    allKerbs.map(async kerb => {
      const comp = await import(`kerbs/${kerb.path}`)

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
