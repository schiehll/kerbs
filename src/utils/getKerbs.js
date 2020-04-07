import nanoid from 'nanoid'
import slugify from '@sindresorhus/slugify'

const allKerbs = preval`
  const fs = require('fs')
  const path = require('path')
  const PATHS = require('../../webpack/paths')

  require('@babel/register')({
    babelrc: false,
    presets: ['@babel/preset-env']
  })

  const kerbs = fs.readdirSync(PATHS.docs)

  module.exports = kerbs.filter(kerb => kerb.endsWith('.mdx')).map(kerb => {
    const filePath = path.resolve(PATHS.docs, kerb)

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
  const PATHS = require('../../webpack/paths')

  require('@babel/register')({
    babelrc: false,
    presets: ['@babel/preset-env']
  })

  module.exports = require(PATHS.config)
`

const getKerbs = () => {
  return Promise.all(
    allKerbs.map(async kerb => {
      const comp = await import(`kerbs/${kerb.path}`)
      const id = nanoid()

      return {
        id,
        kerb: comp.default,
        meta: comp.meta,
        contents: kerb.contents,
        stats: kerb.stats,
        slug: slugify(comp?.meta?.title || `untitled-${id}`)
      }
    })
  )
}

export default getKerbs
