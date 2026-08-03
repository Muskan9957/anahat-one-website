// Generate the browser-tab icons from the Anahat One waveform mark.
//
// The previous icons were a leftover "v0" template glyph — unrelated to the
// brand. These reuse the same pulse used by <SiteLogo>, redrawn for a square
// canvas (the header mark is 4:1, which is unreadable at 32px) and set on the
// site's dark ground so it stays legible on both light and dark tab bars.
import sharp from 'sharp'

const AMBER = '#E9A45B'   // --primary, oklch(0.78 0.15 55)
const GROUND = '#0E0C1F'  // site background, slightly lifted

// Pulse redrawn for a 64x64 box: shorter flat runs, taller peaks, so the shape
// still reads when it is 16 CSS pixels wide in a tab.
const mark = (size, bg) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  ${bg ? `<rect width="64" height="64" rx="14" fill="${GROUND}"/>` : ''}
  <path d="M 7,32 H 21 C 24.5,32 25.5,15 29.5,15 C 33.5,15 33.5,49 37.5,49 C 41.5,49 42.5,25 45.5,25 C 48.5,25 49.5,32 53,32 H 57"
        fill="none" stroke="${AMBER}" stroke-width="5"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const out = 'C:/nuove-site/public'

// Same artwork for both colour schemes: the icon carries its own ground, so it
// reads on a white tab bar and a dark one, and the brand stays consistent.
for (const [file, size] of [['icon-light-32x32.png', 32], ['icon-dark-32x32.png', 32]]) {
  await sharp(Buffer.from(mark(size * 4, true)))     // render 4x then downscale for clean edges
    .resize(size, size)
    .png()
    .toFile(`${out}/${file}`)
  console.log('  ', file)
}

// iOS home screen — no rounded corners, iOS applies its own mask.
await sharp(Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${GROUND}"/>
  <path d="M 7,32 H 21 C 24.5,32 25.5,15 29.5,15 C 33.5,15 33.5,49 37.5,49 C 41.5,49 42.5,25 45.5,25 C 48.5,25 49.5,32 53,32 H 57"
        fill="none" stroke="${AMBER}" stroke-width="5"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`)).png().toFile(`${out}/apple-icon.png`)
console.log('   apple-icon.png')

// Vector icon for browsers that prefer it (stays sharp at any size)
const { writeFileSync } = await import('fs')
writeFileSync(`${out}/icon.svg`, mark(64, true).trim())
console.log('   icon.svg')
