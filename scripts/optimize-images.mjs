// One-off image optimizer for public/.
// Re-encodes in place, keeping the same filenames/extensions so no code changes
// are needed. Screenshots/photos are capped at 1600px wide (they render far
// smaller, even on retina) and re-encoded with mozjpeg / max PNG compression.
import sharp from 'sharp'
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs'
import { join } from 'path'

const DIR = 'public'
const MAX_W = 1600
const SKIP = new Set(['apple-icon.png', 'icon-dark-32x32.png', 'icon-light-32x32.png', 'placeholder-logo.png', 'placeholder-user.jpg', 'placeholder.jpg'])

const files = readdirSync(DIR).filter(f => /\.(png|jpe?g)$/i.test(f) && !SKIP.has(f))
let before = 0, after = 0

for (const f of files) {
  const src = join(DIR, f)
  const sizeBefore = statSync(src).size
  const tmp = join(DIR, `__tmp_${f}`)
  try {
    const img = sharp(src)
    const meta = await img.metadata()
    let pipe = sharp(src).rotate()
    if (meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W, withoutEnlargement: true })

    if (/\.png$/i.test(f)) {
      await pipe.png({ compressionLevel: 9, palette: true, quality: 82, effort: 9 }).toFile(tmp)
    } else {
      await pipe.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(tmp)
    }

    const sizeAfter = statSync(tmp).size
    if (sizeAfter < sizeBefore) {
      unlinkSync(src); renameSync(tmp, src)
      before += sizeBefore; after += sizeAfter
      console.log(`  ${f}: ${(sizeBefore/1024/1024).toFixed(2)}MB -> ${(sizeAfter/1024/1024).toFixed(2)}MB  (-${Math.round((1-sizeAfter/sizeBefore)*100)}%)`)
    } else {
      unlinkSync(tmp)
      before += sizeBefore; after += sizeBefore
      console.log(`  ${f}: kept original (already optimal)`)
    }
  } catch (e) {
    console.log(`  ${f}: SKIPPED (${e.message})`)
  }
}
console.log(`\nTOTAL: ${(before/1024/1024).toFixed(1)}MB -> ${(after/1024/1024).toFixed(1)}MB  (saved ${(( before-after)/1024/1024).toFixed(1)}MB, -${Math.round((1-after/before)*100)}%)`)
