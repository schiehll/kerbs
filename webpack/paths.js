const path = require('path')

module.exports = {
  config: path.resolve(process.cwd(), '.kerbsrc.js'),
  docs: path.resolve(process.cwd(), 'kerbs'),
  public: path.resolve(process.cwd(), 'kerbs_public')
}
