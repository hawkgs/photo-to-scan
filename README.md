# photo-to-scan

A simple JavaScript class which converts a document photo to a scan-like image.

Far from perfect. Made for demo purposes.

## API

**`PhotoScan(imageSource[, options])`** - constructor

- `imageSource: string`: Source of the photo
- `options: { luminanceThreshold: number; grayscale: number; brightness: number }` (optional): Set of options for tuning the output scan
  - Default options: `luminanceThreshold`: 200, `grayscale`: 1, `brightness`: 1.5


**`PhotoScan.getCanvas()`** - returns `HTMLCanvasElement` of the scan

## How it works?

```javascript
const scan = new PhotoToScan('./image.jpg');
const canvas = scan.getCanvas(); // Result canvas

// e.g. Append it as a child
element.appendChild(canvas);
```

## License

MIT
