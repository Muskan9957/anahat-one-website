"use client"

import { useEffect, useRef } from "react"

interface Wave {
  color: [number, number, number]
  amp: number
  freq: number
  speed: number
  yBase: number
  alpha: number
  phase: number
}

const WAVES: Wave[] = [
  { color: [201, 146, 79],  amp: 70,  freq: 0.006, speed: 0.45, yBase: 0.18, alpha: 0.10, phase: 0 },
  { color: [120,  55, 200], amp: 90,  freq: 0.005, speed: 0.30, yBase: 0.35, alpha: 0.09, phase: 1.8 },
  { color: [201, 146, 79],  amp: 55,  freq: 0.009, speed: 0.55, yBase: 0.50, alpha: 0.08, phase: 0.9 },
  { color: [80,   40, 160], amp: 100, freq: 0.004, speed: 0.22, yBase: 0.65, alpha: 0.09, phase: 2.6 },
  { color: [220, 170, 100], amp: 45,  freq: 0.011, speed: 0.70, yBase: 0.80, alpha: 0.07, phase: 0.4 },
  { color: [100,  50, 180], amp: 80,  freq: 0.007, speed: 0.35, yBase: 0.95, alpha: 0.08, phase: 3.2 },
]

export function SilkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let t = 0

    // Honour the OS "reduce motion" setting — render one static frame instead
    // of animating.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Assigning canvas.width/height WIPES the canvas. On mobile the URL bar
    // hides and shows as you scroll, which fires resize constantly — that
    // repeated wipe was the flicker/glitch. So only rebuild when the WIDTH
    // actually changes (a real rotation or window resize), and size the height
    // generously so URL-bar movement never leaves a gap.
    let lastWidth = 0

    function resize() {
      if (!canvas) return
      const w = window.innerWidth
      if (w === lastWidth) return          // height-only change → ignore
      lastWidth = w

      // Match device pixel ratio so the waves aren't soft on phones, but cap it
      // at 2 to keep the per-frame cost sane.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const h = Math.max(window.innerHeight, screen?.height || 0) + 120  // headroom for the URL bar

      canvas.width  = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width  = w + "px"
      canvas.style.height = h + "px"
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)   // draw in CSS pixels

      // Repaint the base colour so the wipe never shows through
      if (ctx) {
        ctx.fillStyle = "rgb(8, 7, 18)"
        ctx.fillRect(0, 0, w, h)
      }
    }
    resize()
    window.addEventListener("resize", resize)

    function draw() {
      if (!canvas || !ctx) return
      // CSS-pixel dimensions (the context is scaled by dpr in resize())
      const W = parseFloat(canvas.style.width)  || window.innerWidth
      const H = parseFloat(canvas.style.height) || window.innerHeight

      // Fade trail — very subtle so content stays readable
      ctx.fillStyle = "rgba(8, 7, 18, 0.18)"
      ctx.fillRect(0, 0, W, H)

      WAVES.forEach((w) => {
        ctx.beginPath()
        const baseY = H * w.yBase
        ctx.moveTo(0, baseY)

        for (let x = 0; x <= W; x += 3) {
          const y =
            baseY +
            Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp +
            Math.sin(x * w.freq * 1.65 - t * w.speed * 0.5 + w.phase) * (w.amp * 0.38)
          ctx.lineTo(x, y)
        }

        ctx.lineTo(W, H + 20)
        ctx.lineTo(0, H + 20)
        ctx.closePath()

        const [r, g, b] = w.color
        const grad = ctx.createLinearGradient(0, 0, W, 0)
        grad.addColorStop(0,    `rgba(${r},${g},${b},0)`)
        grad.addColorStop(0.15, `rgba(${r},${g},${b},${w.alpha})`)
        grad.addColorStop(0.5,  `rgba(${r},${g},${b},${w.alpha * 1.3})`)
        grad.addColorStop(0.85, `rgba(${r},${g},${b},${w.alpha})`)
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = grad
        ctx.fill()
      })

      t += 0.012
      if (!reduceMotion) rafRef.current = requestAnimationFrame(draw)
    }

    draw()   // resize() already painted the base colour

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ display: "block" }}
    />
  )
}
