'use client'
import { useEffect, useRef, useState } from 'react'

export default function ClientShell({ children }) {
  const cursorRef = useRef(null)

  useEffect(() => {
    /* ── CURSOR ─────────────────────────────── */
    const cur = document.createElement('canvas')
    cur.width = 40; cur.height = 48
    Object.assign(cur.style, {
      position: 'fixed', pointerEvents: 'none', zIndex: 99998,
      imageRendering: 'pixelated', transform: 'translate(-3px,-1px)',
    })
    document.body.appendChild(cur)
    const cx = cur.getContext('2d')
    cx.imageSmoothingEnabled = false
    const S = 4

    function cpx(x,y,w=1,h=1,c='#fff'){ cx.fillStyle=c; cx.fillRect(x*S,y*S,w*S,h*S) }
    const G='#505050'

    function drawIdle(){
      cx.clearRect(0,0,40,48)
      cpx(3,1,2,7); cpx(2,2,1,5,G); cpx(5,2,1,5,G); cpx(3,0,2,1)
      cpx(5,5,2,3); cpx(4,6,1,2,G)
      cpx(7,6,2,2); cpx(9,7,1,1)
      cpx(0,5,2,4); cpx(1,4,1,1)
      cpx(1,8,8,4); cpx(0,9,1,2); cpx(9,9,1,2)
      cpx(2,12,6,1); cpx(9,9,1,2,G)
    }
    function drawHover(){
      cx.clearRect(0,0,40,48)
      cpx(3,0,2,9); cpx(2,1,1,8,G); cpx(5,1,1,8,G)
      cpx(3,9,1,1,G); cpx(5,9,1,1,G)
      cpx(5,6,2,3); cpx(4,7,1,2,G)
      cpx(7,7,2,2); cpx(9,8,1,1)
      cpx(0,6,2,4); cpx(1,5,1,1)
      cpx(1,9,8,4); cpx(0,10,1,2); cpx(9,10,1,2)
      cpx(2,13,6,1); cpx(9,10,1,2,G)
    }
    function drawClick(){
      cx.clearRect(0,0,40,48)
      cpx(3,1,2,9); cpx(2,2,1,8,G); cpx(5,2,1,8,G)
      cpx(3,10,1,1,G); cpx(5,10,1,1,G)
      cpx(5,7,2,3); cpx(4,8,1,2,G)
      cpx(7,8,2,2); cpx(9,9,1,1)
      cpx(0,7,2,4); cpx(1,6,1,1)
      cpx(1,10,8,4); cpx(0,11,1,2); cpx(9,11,1,2)
      cpx(2,14,6,1); cpx(9,11,1,2,G)
    }
    drawIdle()

    let state=0, mx=0, my=0, ft=0
    const HSEL='a,button,[role="button"],.proj-card,.role-card,.svc,.xp-item,.hm,.sb-link,.tb-cta,.big-cta,.social-link,.sb-soc-btn,.chip,.ft-r,.about-link,.tool-card,.creation-card'

    const onMove = e => {
      mx=e.clientX; my=e.clientY
      cur.style.left=mx+'px'; cur.style.top=my+'px'
      // tooltip
      const tip=document.getElementById('tip')
      const t=e.target.closest('[data-tip]')
      if(t&&tip){tip.textContent=t.dataset.tip;tip.style.left=mx+'px';tip.style.top=my+'px';tip.style.opacity='1'}
      else if(tip) tip.style.opacity='0'
    }
    const onOver = e => { if(e.target.closest(HSEL)&&state!==2){state=1;drawHover()} }
    const onOut  = e => { if(e.target.closest(HSEL)&&state!==2){state=0;drawIdle()} }
    const onDown = () => { state=2; drawClick() }
    const onUp   = () => { state=0; drawIdle(); setTimeout(()=>{ const el=document.elementFromPoint(mx,my); if(el?.closest(HSEL)){state=1;drawHover()} },10) }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup',   onUp)

    let raf
    const floatLoop = () => { ft+=.055; if(state===0) cur.style.top=(my+Math.sin(ft)*1.3)+'px'; raf=requestAnimationFrame(floatLoop) }
    floatLoop()

    /* ── CLICK RIPPLE ───────────────────────── */
    const onClick = e => {
      const r=document.createElement('div')
      r.className='ripple-el'
      r.style.left=e.clientX+'px'; r.style.top=e.clientY+'px'
      document.body.appendChild(r)
      setTimeout(()=>r.remove(),600)
    }
    document.addEventListener('click', onClick)

    /* ── SCROLL: progress + active nav ─────── */
    const xpFill = document.getElementById('xp-fill')
    const sections = document.querySelectorAll('section[id]')
    const sideLinks = document.querySelectorAll('.sb-link')
    let lastSec = ''
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100
      if(xpFill) xpFill.style.width = pct + '%'
      let cur2 = ''
      sections.forEach(s => { if(window.scrollY >= s.offsetTop - 90) cur2 = s.id })
      if(cur2 !== lastSec){
        lastSec = cur2
        sideLinks.forEach(a => a.classList.toggle('act', a.dataset.sec === cur2))
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ── INTERSECTION: reveals + bars + counters ── */
    const rvObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.rv').forEach(el => rvObs.observe(el))

    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(!e.isIntersecting) return
        const el = e.target
        if(el.dataset.w) setTimeout(() => { el.style.width = el.dataset.w + '%' }, 120)
        barObs.unobserve(el)
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('[data-w]').forEach(el => barObs.observe(el))

    const cntObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(!e.isIntersecting) return
        const el = e.target
        const target = parseInt(el.dataset.count, 10)
        const suf = target === 99 ? '%' : '+'
        let c = 0; const step = Math.ceil(target / 20)
        const id = setInterval(() => {
          c = Math.min(c + step, target)
          el.textContent = c + (c === target ? suf : '')
          if(c >= target) clearInterval(id)
        }, 45)
        cntObs.unobserve(el)
      })
    }, { threshold: 0.4 })
    document.querySelectorAll('[data-count]').forEach(el => cntObs.observe(el))

    /* ── CLOCK ──────────────────────────────── */
    const tickClock = () => {
      const n = new Date()
      const el = document.getElementById('tb-clock')
      if(el) el.textContent = [n.getHours(),n.getMinutes()].map(x=>String(x).padStart(2,'0')).join(':')
    }
    tickClock()
    const clockId = setInterval(tickClock, 1000)

    /* ── THEME: restore from localStorage ──── */
    if(localStorage.getItem('kgx-theme') === 'light'){
      document.body.classList.add('light')
      const icon = document.getElementById('theme-icon')
      const label = document.getElementById('theme-label')
      if(icon) icon.textContent = '🌙'
      if(label) label.textContent = 'Dark'
    }

    return () => {
      document.body.removeChild(cur)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup',   onUp)
      document.removeEventListener('click',     onClick)
      window.removeEventListener('scroll',      onScroll)
      cancelAnimationFrame(raf)
      clearInterval(clockId)
      rvObs.disconnect(); barObs.disconnect(); cntObs.disconnect()
    }
  }, [])

  return <>{children}</>
}
