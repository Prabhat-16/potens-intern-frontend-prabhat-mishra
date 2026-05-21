import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/icon.svg');
const sizes = [192, 512];

sizes.forEach(size => {
  sharp(svgPath)
    .resize(size, size)
    .png()
    .toFile(path.resolve(`public/pwa-${size}x${size}.png`))
    .then(() => console.log(`Generated pwa-${size}x${size}.png`))
    .catch(err => console.error(err));
});
