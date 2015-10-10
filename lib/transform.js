function Transform(width, height) {
  if (!Number.isInteger(width) || width < 0) {
    throw new Error('invalid width')
  }
  if (!Number.isInteger(height) || height < 0) {
    throw new Error('invalid height')
  }

  this._width = width
  this._height = height
  this._length = width * height
}

Transform.prototype.image = function(image) {
  if (!ArrayBuffer.isView(image)) throw new Error('typed array required')
  if (image.length !== this._length) throw new Error('invalid image length')

  this._image = image

  return this
}

Transform.prototype.kernel = function(factor) {
  if (!Number.isInteger(factor)) throw new Error('factor required')
  if (factor < 2) throw new Error('kernel too small')
  if (factor % 2 !== 1) throw new Error('kernel must be odd')
  if (factor > this._width || factor > this._heigth) {
    throw new Error('kernel must be positive')
  }

  this._factor = factor

  return this
}

Transform.prototype.transform = function(callback) {
  var im = this._image || this.image()
  var kf = this._factor || this.kernel()

  var width = this._width
  var height = this._height

  var h = Math.floor(this._height / kf)
  var w = Math.floor(this._width / kf)

  var dw = new Uint8ClampedArray(w * h)

  var m = (kf-1)/2

  for (var j = 0; j < h; j++) {
    for (var i = 0; i < w; i++) {
      dw[i + j * w] = kernel(kf, m + i*kf, m + j*kf)
        .map(i => im[i[0] + width * i[1]])
        .reduce((p, v) => p + v) / Math.pow(kf, 2)
    }
  }

  callback(null, dw, w, h)
}

module.exports = Transform

function kernel(kf, x, y) {
  var k = []

  var s = -(kf-1)/2, e = (kf-1)/2
  for (var j = s; j <= e; j++) {
    for (var i = s; i <= e; i++) {
      k.push([x+i, y+j])
    }
  }

  return k
}