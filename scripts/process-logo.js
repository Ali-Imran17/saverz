const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processCrispLogo() {
  const inputPath = path.join(__dirname, '../public/images/Saverz logo.jpeg');
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const rgba = Buffer.alloc(width * height * 4);

  // We want to detect background + faint cast shadow.
  // Let's identify foreground pixels:
  // 1. Red / pink / magenta elements: high saturation or red dominant
  // 2. Maroon text & lines: dark pixels (max(r,g,b) < 180)
  // 3. The white rim around the 3D letters: near the red letters (distance <= 10 pixels from red/maroon)

  const isStrongFg = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const sIdx = idx * channels;
      const r = data[sIdx];
      const g = data[sIdx + 1];
      const b = data[sIdx + 2];

      const maxVal = Math.max(r, g, b);
      const minVal = Math.min(r, g, b);
      const sat = maxVal - minVal;
      const brightness = (r + g + b) / 3;

      // Maroon text ("SUPERMARKET & PHARMACY" and dash lines)
      if (brightness < 170) {
        isStrongFg[idx] = 1;
        continue;
      }

      // Red / Pink / Magenta cart and letters
      // Red letters have r > 180 and sat > 30, or r > g + 25
      if (sat >= 25 && (r > g + 15 || r > b + 15)) {
        isStrongFg[idx] = 1;
        continue;
      }

      // Pink fill in cart
      if (sat >= 15 && r > g && r > b) {
        isStrongFg[idx] = 1;
        continue;
      }
    }
  }

  // Now, expand foreground to include the white 3D bevel / rim around the letters and cart.
  // The white rim is within ~12px of any strong foreground pixel, and has brightness > 180.
  const fgDist = new Int32Array(width * height).fill(999);
  const queue = [];

  for (let i = 0; i < width * height; i++) {
    if (isStrongFg[i]) {
      fgDist[i] = 0;
      queue.push(i % width, Math.floor(i / width));
    }
  }

  let head = 0;
  const maxBevelDist = 12; // bevel is around 8-12px
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];
    const d = fgDist[y * width + x];
    if (d >= maxBevelDist) continue;

    const nbs = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1],
      [x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1]
    ];

    for (const [nx, ny] of nbs) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (fgDist[nIdx] > d + 1) {
          fgDist[nIdx] = d + 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  // Now determine alpha for every pixel:
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const sIdx = idx * channels;
      const dIdx = idx * 4;

      const r = data[sIdx];
      const g = data[sIdx + 1];
      const b = data[sIdx + 2];
      const dist = fgDist[idx];
      const brightness = (r + g + b) / 3;

      if (isStrongFg[idx]) {
        rgba[dIdx] = r;
        rgba[dIdx + 1] = g;
        rgba[dIdx + 2] = b;
        rgba[dIdx + 3] = 255;
      } else if (dist <= 8) {
        // Inside the 3D white bevel: keep white bevel opaque!
        rgba[dIdx] = r;
        rgba[dIdx + 1] = g;
        rgba[dIdx + 2] = b;
        rgba[dIdx + 3] = 255;
      } else if (dist <= 11) {
        // Soft outer antialiasing edge of the bevel
        const alpha = Math.round((11 - dist) / 3 * 255);
        rgba[dIdx] = r;
        rgba[dIdx + 1] = g;
        rgba[dIdx + 2] = b;
        rgba[dIdx + 3] = alpha;
      } else {
        // Background & shadow: completely transparent
        rgba[dIdx] = 0;
        rgba[dIdx + 1] = 0;
        rgba[dIdx + 2] = 0;
        rgba[dIdx + 3] = 0;
      }
    }
  }

  // Trim transparent borders
  const trimmedBuffer = await sharp(rgba, {
    raw: { width, height, channels: 4 }
  })
    .trim({ threshold: 5 })
    .png()
    .toBuffer();

  const outDir = path.join(__dirname, '../public/images');
  const logoDir = path.join(__dirname, '../public/images/logo');
  if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, 'saverz-logo-transparent.png'), trimmedBuffer);
  fs.writeFileSync(path.join(logoDir, 'saverz-logo.png'), trimmedBuffer);
  fs.writeFileSync(path.join(logoDir, 'saverz-logo-transparent.png'), trimmedBuffer);
  fs.writeFileSync(path.join(outDir, 'saverz-logo.png'), trimmedBuffer);
  fs.writeFileSync(path.join(outDir, 'Saverz Supermarket Logo.png'), trimmedBuffer);

  // Also composite on dark blue to check quality
  await sharp({
    create: {
      width: 1200,
      height: 600,
      channels: 4,
      background: { r: 16, g: 43, b: 92, alpha: 1 } // #102B5C
    }
  })
  .composite([{ input: trimmedBuffer, gravity: 'center' }])
  .png()
  .toFile(path.join(outDir, 'test-on-dark.png'));

  console.log('Crisp logo generated and tested!');
}

processCrispLogo().catch(console.error);
