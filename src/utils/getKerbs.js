import nanoid from 'nanoid'

const allKerbs = preval`
  const React = require('react')
  const fs = require('fs')
  const path = require('path')

  module.exports = fs.readdirSync(path.resolve(process.cwd(), '.docs'))
`

const getKerbs = () => {
  return Promise.all(
    allKerbs.map(async kerb => {
      const comp = await import(`docs/${kerb}`)

      return {
        id: nanoid(),
        kerb: comp.default,
        meta: comp.meta
      }
    })
  )
}

export default getKerbs
