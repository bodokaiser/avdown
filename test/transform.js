var assert = require('assert')

var Transform = require('../lib/transform')

const sample3x3 = new Uint8ClampedArray([
  1, 1, 1,
  1, 1, 1,
  1, 1, 1
])

const sample3x4 = new Uint8ClampedArray([
  3, 3, 3,
  1, 2, 1,
  1, 2, 2,
  3, 3, 3
])

const sample4x3 = new Uint8ClampedArray([
  4, 4, 4, 3,
  1, 1, 1, 3,
  4, 4, 4, 3
])

const sample6x6 = new Uint8ClampedArray([
  1, 1, 1, 3, 3, 3,
  2, 2, 2, 1, 1, 1,
  3, 3, 3, 2, 2, 2,
  2, 2, 2, 3, 3, 3,
  2, 2, 2, 3, 3, 3,
  2, 2, 2, 3, 3, 3
])

describe('Transform', () => {

  beforeEach(() => {
    this.t = new Transform(3, 3)
  })

  describe('new', () => {
    it('should set width', () => {
      assert.equal(this.t._width, 3)
    })
    it('should set height', () => {
      assert.equal(this.t._height, 3)
    })
    it('should set length', () => {
      assert.equal(this.t._length, 9)
    })
    it('should throw invalid width', () => {
      assert.throws(() => {
        new Transform(null)
      })
      assert.throws(() => {
        new Transform('abc')
      })
    })
    it('should throw invalid height', () => {
      assert.throws(() => {
        new Transform(3, null)
      })
      assert.throws(() => {
        new Transform(3, 'abc')
      })
    })
  })

  describe('.image', () => {
    it('should set image', () => {
      this.t.image(sample3x3)

      assert.deepEqual(this.t._image, sample3x3)
    })
    it('should throw invalid type error', () => {
      assert.throws(() => {
        this.t.image([1, 2, 3, 4, 5, 6, 7, 8, 9])
      })
    })
    it('should throw invalid length error', () => {
      assert.throws(() => {
        this.t.image(simple3x4)
      })
      assert.throws(() => {
        this.t.image(simple4x3)
      })
    })
  })

  describe('.kernel', () => {
    it('should set kernel', () => {
      this.t.kernel(3)

      assert.equal(this.t._factor, 3)
    })
    it('should throw kernel too large error', () => {
      assert.throws(() => {
        this.t.kernel(5)
      })
    })
    it('should throw kernel must be odd error', () => {
      assert.throws(() => {
        this.t.kernel(2)
      })
    })
    it('should throw kernel must be positive error', () => {
      assert.throws(() => {
        this.t.kernel(-3)
      })
    })
  })

  describe('.transform', () => {
    it('should throw error on missing image', () => {
      assert.throws(() => {
        this.t.kernel(3)
        this.t.transform()
      })
    })
    it('should throw error on missing kernel', () => {
      assert.throws(() => {
        this.t.image(sample3x3)
        this.t.transform()
      })
    })
    it('should downsample 3 x 3', () => {
      this.t.image(sample3x3)
      this.t.kernel(3)
      this.t.transform((err, image, width, height) => {
        assert.equal(err, null)
        assert.equal(width, 1)
        assert.equal(height, 1)

        assert.deepEqual(image, new Uint8ClampedArray([1]))
      })
    })
    it('should downsample 3 x 4', () => {
      new Transform(3, 4)
        .image(sample3x4)
        .kernel(3)
        .transform((err, image, width, height) => {
          assert.equal(err, null)
          assert.equal(width, 1)
          assert.equal(height, 1)

          assert.deepEqual(image, new Uint8ClampedArray([2]))
        })
    })
    it('should downsample 4 x 3', () => {
      new Transform(4, 3)
        .image(sample4x3)
        .kernel(3)
        .transform((err, image, width, height) => {
          assert.equal(err, null)
          assert.equal(width, 1)
          assert.equal(height, 1)

          assert.deepEqual(image, new Uint8ClampedArray([3]))
        })
    })
    it('should downsample 6 x 6', () => {
      new Transform(6, 6)
        .image(sample6x6)
        .kernel(3)
        .transform((err, image, width, height) => {
          assert.equal(err, null)
          assert.equal(width, 2)
          assert.equal(height, 2)

          assert.deepEqual(image, new Uint8ClampedArray([2, 2, 2, 3]))
        })
    })
  })

})