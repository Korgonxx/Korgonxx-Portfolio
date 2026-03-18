'use client'
import { useEffect } from 'react'

export default function ClientShell({ children }) {
  useEffect(() => {

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       CURSOR
       – dot:  4×4 sharp square, exact tracking
       – ring: 28×28 square outline, lerp follow
       – hover → corner brackets (matches sidebar motif)
       – click → compress burst
       – text  → thin vertical bar
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    const dot  = document.createElement('div')
    const ring = document.createElement('div')
    dot.className  = 'c-dot'
    ring.className = 'c-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let mx = window.innerWidth  / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my
    let curState = 'default'
    let rafId

    const HOVER_SEL = [
      'a','button','[role="button"]',
      '.proj-card','.role-card','.svc','.xp-item',
      '.hm','.sb-link','.tb-cta','.big-cta',
      '.social-link','.sb-soc-btn','.chip','.ft-r',
      '.about-link','.tl-row','.creation-card',
      '.sb-close-btn','.tb-sidebar-toggle',
    ].join(',')
    const TEXT_SEL = 'input,textarea,[contenteditable]'

    // translate to mouse using calc(-50%) so size-changes auto-center
    function place(el, x, y) {
      el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
    }

    function setState(s) {
      if (curState === 'click') return
      if (curState === s) return
      curState = s
      dot.className  = s === 'default' ? 'c-dot'  : `c-dot is-${s}`
      ring.className = s === 'default' ? 'c-ring' : `c-ring is-${s}`
    }

    const lerp = (a, b, t) => a + (b - a) * t
    function tick() {
      rx = lerp(rx, mx, 0.11)
      ry = lerp(ry, my, 0.11)
      place(ring, rx, ry)
      rafId = requestAnimationFrame(tick)
    }
    tick()

    const onMove = e => {
      mx = e.clientX; my = e.clientY
      place(dot, mx, my)
      // tooltip
      const tip = document.getElementById('tip')
      const t   = e.target.closest('[data-tip]')
      if (t && tip) { tip.textContent = t.dataset.tip; tip.style.left = mx + 'px'; tip.style.top = my + 'px'; tip.style.opacity = '1' }
      else if (tip)   tip.style.opacity = '0'
      // state
      if      (e.target.closest(TEXT_SEL))  setState('text')
      else if (e.target.closest(HOVER_SEL)) setState('hover')
      else setState('default')
    }

    const onDown = () => {
      curState = 'click'
      dot.className  = 'c-dot is-click'
      ring.className = 'c-ring is-click'
    }
    const onUp = () => {
      curState = 'default'
      const el = document.elementFromPoint(mx, my)
      if      (el?.closest(TEXT_SEL))  { dot.className = 'c-dot is-text';  ring.className = 'c-ring is-text' }
      else if (el?.closest(HOVER_SEL)) { dot.className = 'c-dot is-hover'; ring.className = 'c-ring is-hover' }
      else { dot.className = 'c-dot'; ring.className = 'c-ring' }
    }

    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter = () => { dot.style.opacity = '';  ring.style.opacity = '' }

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    /* ━━ CLICK RIPPLE ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    const onClick = e => {
      const r = document.createElement('div')
      r.className = 'ripple-el'
      r.style.left = e.clientX + 'px'
      r.style.top  = e.clientY + 'px'
      document.body.appendChild(r)
      setTimeout(() => r.remove(), 600)
    }
    document.addEventListener('click', onClick)

    /* ━━ SCROLL PROGRESS + ACTIVE NAV ━━━━━━━━━━ */
    const xpFill   = document.getElementById('xp-fill')
    const sections = document.querySelectorAll('section[id]')
    const sbLinks  = document.querySelectorAll('.sb-link')
    let lastSec    = ''
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      if (xpFill) xpFill.style.width = pct + '%'
      let cur = ''
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id })
      if (cur !== lastSec) {
        lastSec = cur
        sbLinks.forEach(a => a.classList.toggle('act', a.dataset.sec === cur))
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ━━ INTERSECTION – reveals + bars + counters ━ */
    const rvObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv').forEach(el => rvObs.observe(el))

    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target
        if (el.dataset.w) setTimeout(() => { el.style.width = el.dataset.w + '%' }, 120)
        barObs.unobserve(el)
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('[data-w]').forEach(el => barObs.observe(el))

    const cntObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el     = e.target
        const target = parseInt(el.dataset.count, 10)
        const suf    = target === 99 ? '%' : '+'
        let c = 0
        const step = Math.ceil(target / 20)
        const id   = setInterval(() => {
          c = Math.min(c + step, target)
          el.textContent = c + (c === target ? suf : '')
          if (c >= target) clearInterval(id)
        }, 45)
        cntObs.unobserve(el)
      })
    }, { threshold: 0.4 })
    document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el))

    /* ━━ CLOCK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    const tickClock = () => {
      const n  = new Date()
      const el = document.getElementById('tb-clock')
      if (el) el.textContent = [n.getHours(), n.getMinutes()]
        .map(x => String(x).padStart(2, '0')).join(':')
    }
    tickClock()
    const clockId = setInterval(tickClock, 1000)

    /* ━━ RESTORE THEME + SIDEBAR ━━━━━━━━━━━━━━━ */
    if (localStorage.getItem('kgx-theme')   === 'light')  document.body.classList.add('light')
    if (localStorage.getItem('kgx-sidebar') === 'hidden') document.body.classList.add('sb-hidden')

    return () => {
      document.body.removeChild(dot)
      document.body.removeChild(ring)
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('click',      onClick)
      window.removeEventListener('scroll',       onScroll)
      cancelAnimationFrame(rafId)
      clearInterval(clockId)
      rvObs.disconnect(); barObs.disconnect(); cntObs.disconnect()
    }
  }, [])

  return <>{children}</>
}