"use client"

import { useEffect, useRef } from 'react'

export default function HeroBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.3/p5.min.js'
    script.async = true
    script.onload = () => {
      const p5 = window.p5
      if (!p5) return

      const sketch = (p) => {
        let particles = []
        const PARTICLE_COUNT = 180

        // Vercel-inspired palette: deep blue, magenta, cyan accents on dark
        const colors = [
          [210, 40, 90, 80],    // magenta-pink (Vercel preview)
          [190, 70, 100, 100],  // purple-tinged
          [320, 50, 95, 80],    // pink
          [200, 80, 100, 120],  // cyan-blue
        ]

        class Particle {
          constructor() {
            this.reset()
          }
          reset() {
            this.x = p.random(p.width)
            this.y = p.random(p.height)
            this.z = p.random(200) - 100
            this.vx = p.random(-0.4, 0.4)
            this.vy = p.random(-0.4, 0.4)
            this.baseSize = p.random(1.5, 3.5)
            this.colorIdx = p.int(p.random(colors.length))
          }
          update(mx, my) {
            this.x += this.vx
            this.y += this.vy
            // subtle mouse repulsion
            const dx = this.x - mx
            const dy = this.y - my
            const d = Math.sqrt(dx*dx + dy*dy)
            if (d < 120) {
              const force = (120 - d) / 120 * 0.3
              this.x += (dx / d) * force
              this.y += (dy / d) * force
            }
            // wrap
            if (this.x < 0) this.x = p.width
            if (this.x > p.width) this.x = 0
            if (this.y < 0) this.y = p.height
            if (this.y > p.height) this.y = 0
          }
          display(p5ctx) {
            const depth = p.map(this.z, -100, 100, 0.6, 1.6)
            const size = this.baseSize * depth
            const alpha = p.map(this.z, -100, 100, 30, 150)
            p5ctx.noStroke()
            const c = colors[this.colorIdx]
            p5ctx.fill(c[0], c[1], c[2], alpha)
            p5ctx.ellipse(this.x, this.y, size)
          }
        }

        let resizeTimeout
        function setup() {
          p.pixelDensity(1)
          p.colorMode(p.HSB, 360, 100, 100, 255)
          p.frameRate(60)

          const computeSize = () => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (rect && rect.width > 0 && rect.height > 0) {
              p.resizeCanvas(rect.width, rect.height)
            }
          }
          computeSize()
          // debounce resize
          p.windowResized = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(computeSize, 100)
          }
          p.randomSeed(42)
          p.noiseSeed(42)
          for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle())
        }

        function draw() {
          // fade instead of clear — creates trails
          p.fill(10, 20, 8, 40)
          p.rect(0, 0, p.width, p.height)

          const mx = p.mouseX
          const my = p.mouseY
          for (let part of particles) {
            part.update(mx, my)
            part.display(p)
          }
          // connections
          p.stroke(210, 30, 90, 25)
          p.strokeWeight(0.4)
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const a = particles[i], b = particles[j]
              const d = p.dist(a.x, a.y, b.x, b.y)
              if (d < 90) {
                const alpha = p.map(d, 0, 90, 40, 0)
                p.stroke(210, 30, 90, alpha)
                p.line(a.x, a.y, b.x, b.y)
              }
            }
          }
        }

        function mousePressed() {
          // burst
          for (let k = 0; k < 12; k++) {
            const part = new Particle()
            part.x = p.mouseX + p.random(-30, 30)
            part.y = p.mouseY + p.random(-30, 30)
            part.vx = p.random(-1.2, 1.2)
            part.vy = p.random(-1.2, 1.2)
            part.baseSize = p.random(2, 5)
            particles.push(part)
          }
          if (particles.length > 280) particles.splice(0, 12)
        }
      }

      const p5Instance = new p5(sketch, containerRef.current)
      return () => { p5Instance.remove() }
    }
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    />
  )
}