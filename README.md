# Avdown

**Avdown** uses kernel averaging to down-sample images.

Please note that this is no alternative to full features image resizing
libraries as you cannot define output size and there will be no interpolation
for perfect fit instead we just ignore pixels at the border.

## Examples

    avdown(1920, 1080)
      .kernel(3) // target size 640 x 360
      .image(image) // source size 1920 x 1080
      .transform((err, image, width, height) => {
        if (err) throw err

        // else
      })

## Installation

    npm install avdown

## Documentation

### avdown(width, height)

`width` and `height` from the source image.

#### .image(image)

The source `image` as `TypedArray`.

#### .kernel(factor)

The kernel size (e.g. `3` would yield in a 3x3-Kernel). Remember that the
kernel size needs to be an *odd* positive integer which is smaller than `width`
or `height`.

#### .transform(callback)

*No async execution but callback style api!* Callback is called with `err`,
new `image` with resolution `width` and `height`.

## License

Copyright 2014 Bodo Kaiser <i@bodokaiser.io>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: http://people.csail.mit.edu/tieu/notebook/imageproc/toivanen96.pdf
