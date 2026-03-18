'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon, MapPin, PanelLeftClose, PanelLeftOpen, ArrowRight, Radio } from 'lucide-react'

function toggleTheme() {
  const isLight = document.body.classList.toggle('light')
  localStorage.setItem('kgx-theme', isLight ? 'light' : 'dark')
}

function toggleSidebar() {
  if (window.innerWidth <= 900) {
    document.getElementById('sidebar')?.classList.toggle('open')
    document.getElementById('overlay')?.classList.toggle('show')
  } else {
    document.body.classList.toggle('sb-hidden')
    localStorage.setItem('kgx-sidebar', document.body.classList.contains('sb-hidden') ? 'hidden' : 'visible')
  }
}

export default function Topbar() {
  const [isLight, setIsLight] = useState(false)
  const [sbHidden, setSbHidden] = useState(false)

  useEffect(() => {
    setIsLight(document.body.classList.contains('light'))
    setSbHidden(document.body.classList.contains('sb-hidden'))

    const obs = new MutationObserver(() => {
      setIsLight(document.body.classList.contains('light'))
      setSbHidden(document.body.classList.contains('sb-hidden'))
    })
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return (
    <header className="topbar">
      {/* Sidebar toggle — always visible */}
      <button
        className="tb-sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        title={sbHidden ? 'Show sidebar' : 'Hide sidebar'}
      >
        {sbHidden
          ? <PanelLeftOpen  size={16} strokeWidth={1.75} />
          : <PanelLeftClose size={16} strokeWidth={1.75} />
        }
      </button>

      <div className="tb-sep" />
      <span className="tb-wordmark">Korgonxx</span>
      <div className="tb-sep tb-sep-hide" />

      <div className="tb-pill tb-pill-hide">
        <Radio size={9} strokeWidth={2.5} className="tb-live-ico" />
        Available for new projects
      </div>

      <div className="tb-sep tb-sep-hide" />
      <div className="tb-pill tb-pill-hide">
        <MapPin size={10} strokeWidth={1.75} />
        Haryana, India
      </div>

      <div className="tb-right">
        <span className="tb-clock" id="tb-clock">00:00</span>

        <button
          className="theme-btn"
          onClick={() => { toggleTheme(); setIsLight(p => !p) }}
          aria-label="Toggle theme"
        >
          {isLight
            ? <Moon  size={13} strokeWidth={1.75} />
            : <Sun   size={13} strokeWidth={1.75} />
          }
          <span id="theme-label">{isLight ? 'Dark' : 'Light'}</span>
        </button>

        <a href="#contact" className="tb-cta">
          Hire Me
          <ArrowRight size={13} strokeWidth={2} />
        </a>
      </div>
    </header>
  )
}