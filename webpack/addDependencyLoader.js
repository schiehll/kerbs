// https://github.com/kentcdodds/babel-plugin-preval/issues/19#issuecomment-346998504

module.exports = function(source, map) {
  this.addDependency(this.query.file)
  this.callback(null, source, map)
}
