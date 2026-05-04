'use client'

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
        const PARTICLE_COUNT = 120

        const colors = [
          [15, 30, 60, 80],
          [210, 40, 90, 60],
          [180, 70, 100, 120],
          [320, 50, 95, 40],
        ]

        class Particle {
          constructor() {
            this.reset()
          }
          reset() {
            this.x = p.random(p.width)
            this.y = p.random(p.height)
            this.z = p.random(200) - 100
            this.vx = p.random(-0.3, 0.3)
            this.vy = p.random(-0.3, 0.3)
            this.baseSize = p.random(1.5, 3)
            this.colorIdx = p.int(p.random(colors.length))
          }
          update(mx, my) {
            this.x += this.vx
            this.y += this.vy
            const dx = this.x - mx
            const dy = this.y - my
            const d = Math.sqrt(dx*dx + dy*dy)
            if (d < 120) {
              const force = (120 - d) / 120 * 0.4
              this.x += (dx / d) * force
              this.y += (dy / d) * force
            }
            if (this.x < 0) this.x = p.width
            if (this.x > p.width) this.x = 0
            if (this.y < 0) this.y = p.height
            if (this.y > p.height) this.y = 0
          }
          display(p5ctx) {
            const depth = p.map(this.z, -100, 100, 0.6, 1.4)
            const size = this.baseSize * depth
            const alpha = p.map(this.z, -100, 100, 40, 120)
            p5ctx.noStroke()
            p5ctx.fill(colors[this.colorIdx][0], colors[this.colorIdx][1], colors[this.colorIdx][2], alpha)
            p5ctx.ellipse(this.x, this.y, size)
          }
        }

        function setup() {
          p.pixelDensity(1)
          p.colorMode(p.HSB, 360, 100, 100, 255)
          p.frameRate(60)
          const computeSize = () => {
            const rect = containerRef.current?.getBoundingClientRect()
            if (rect && rect.width > 0 && rect.height > 0) {
              p.resizeCanvas(rect.width, rect.height)
            } else {
              p.resizeCanvas(p.windowWidth, p.windowHeight)
            }
          }
          computeSize()
          p.windowResized = computeSize
          p.randomSeed(42)
          p.noiseSeed(42)
          for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle())
        }

        function draw() {
          p.fill(10, 20, 8, 25)
          p.rect(0, 0, p.width, p.height)
          const mx = p.mouseX
          const my = p.mouseY
          for (let part of particles) {
            part.update(mx, my)
            part.display(p)
          }
          p.stroke(210, 30, 90, 30)
          p.strokeWeight(0.5)
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const a = particles[i], b = particles[j]
              const d = p.dist(a.x, a.y, b.x, b.y)
              if (d < 90) {
                const alpha = p.map(d, 0, 90, 50, 0)
                p.stroke(210, 30, 90, alpha)
                p.line(a.x, a.y, b.x, b.y)
              }
            }
          }
        }

        function mousePressed() {
          for (let k = 0; k < 8; k++) {
            const part = new Particle()
            part.x = p.mouseX + p.random(-20, 20)
            part.y = p.mouseY + p.random(-20, 20)
            part.vx = p.random(-1, 1)
            part.vy = p.random(-1, 1)
            part.baseSize = p.random(2, 4)
            particles.push(part)
          }
          if (particles.length > 250) particles.splice(0, 8)
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
