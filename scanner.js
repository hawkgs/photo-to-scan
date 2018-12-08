(function () {
  'use strict';

  const WHITE = 255;
  const LUMINANCE_THRESHOLD = 200;
  const GRAYSCALE = 1;
  const BRIGHTNESS = 1.5;

  class PhotoToScan {
    constructor(imageSource, options) {
      this._canvas = document.createElement('canvas');
      this._ctx = this._canvas.getContext('2d');

      options = options || {};
      this._luminanceThreshold = options.luminanceThreshold || LUMINANCE_THRESHOLD;
      this._grayscale = options.grayscale || GRAYSCALE;
      this._brightness = options.brightness || BRIGHTNESS;

      this._load(imageSource);
    }

    getCanvas() {
      return this._canvas;
    }

    _load(imageSource) {
      const img = new Image();

      img.onload = () => {
        this._canvas.width = img.width;
        this._canvas.height = img.height;

        this._ctx.filter = `grayscale(${this._grayscale}) brightness(${this._brightness})`;
        this._ctx.drawImage(img, 0, 0, img.width, img.height);

        this._equalizeWhite(img.width, img.height);
      };

      img.src = imageSource;
    }

    _equalizeWhite(width, height) {
      const imgData = this._ctx.getImageData(0, 0, width, height);

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const rgb = this._getRGBIdxs(x, y, width);
          const luminance = this._getLuminance(imgData.data, rgb);

          if (luminance >= this._luminanceThreshold) {
            imgData.data[rgb[0]] = imgData.data[rgb[1]] = imgData.data[rgb[2]] = WHITE;
          }
        }
      }

      this._ctx.putImageData(imgData, 0, 0);
    }

    _getRGBIdxs(x, y, width) {
      const red = y * (width * 4) + x * 4;
      return [red, red + 1, red + 2];
    }

    _getLuminance(data, rgb) {
      return parseInt(data[rgb[0]] * 0.2126 + data[rgb[1]] * 0.7152 + data[rgb[2]] * 0.0722, 10);
    }
  }

  const scan = new PhotoToScan('./image.jpg');
  document.body.appendChild(scan.getCanvas());
}());
