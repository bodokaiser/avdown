var Transform = require('./transform')

module.exports = function(width, heigth) {
  return new Transform(width, heigth)
}