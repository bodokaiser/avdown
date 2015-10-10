var avdown = require('../lib')

const width = 640
const height = 320

const image = new Uint8ClampedArray(width * height).fill(1)

avdown(width, height)
  .kernel(3)
  .image(image)
  .transform((err, img) => {
    if (err) throw err

    console.log(img.toString())
  })