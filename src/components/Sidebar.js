'use client'
import {
  Home, Layers, FolderOpen, User, Zap,
  TrendingUp, Wrench, Mail,
  Twitter, MessageSquare, Send, X
} from 'lucide-react'

const NAV = [
  { href: '#hero',       sec: 'hero',       Icon: Home,       label: 'Overview',   num: '01' },
  { href: '#roles',      sec: 'roles',      Icon: Layers,     label: 'What I Do',  num: '02' },
  { href: '#portfolio',  sec: 'portfolio',  Icon: FolderOpen, label: 'Projects',   num: '03' },
  { href: '#about',      sec: 'about',      Icon: User,       label: 'About',      num: '04' },
  { href: '#services',   sec: 'services',   Icon: Zap,        label: 'Services',   num: '05' },
  { href: '#experience', sec: 'experience', Icon: TrendingUp, label: 'Experience', num: '06' },
  { href: '#tools',      sec: 'tools',      Icon: Wrench,     label: 'Tools',      num: '07' },
  { href: '#contact',    sec: 'contact',    Icon: Mail,       label: 'Contact',    num: '08' },
]

const SOCIALS = [
  { href: 'https://x.com/Korgonxx',                           Icon: Twitter,       label: 'Twitter',  handle: '@Korgonxx',   tip: 'Twitter / X' },
  { href: 'https://discordapp.com/users/1083960851884683405', Icon: MessageSquare, label: 'Discord',  handle: 'Korgonxx',    tip: 'Discord' },
  { href: 'https://t.me/itxx_happy',                          Icon: Send,          label: 'Telegram', handle: '@itxx_happy', tip: 'Telegram' },
]

function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open')
  document.getElementById('overlay')?.classList.remove('show')
}

function hideSidebar() {
  if (window.innerWidth <= 900) {
    closeSidebar()
  } else {
    document.body.classList.add('sb-hidden')
    localStorage.setItem('kgx-sidebar', 'hidden')
  }
}

export default function Sidebar() {
  return (
    <aside className="sidebar" id="sidebar">

      {/* ── Profile ── */}
      <div className="sb-profile">
        <div className="sb-profile-top">
          <div className="sb-avatar-wrap">
            <div className="sb-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatar.png" alt="Korgonxx" />
            </div>
            <span className="sb-av-corner tl" />
            <span className="sb-av-corner tr" />
            <span className="sb-av-corner bl" />
            <span className="sb-av-corner br" />
          </div>
          <button className="sb-close-btn" onClick={hideSidebar} aria-label="Hide sidebar" title="Hide sidebar">
            <X size={14} strokeWidth={1.75} />
          </button>
        </div>
        <div className="sb-name">Korgonxx</div>
        <div className="sb-role">Web3 Community Builder<br />Moderator · Ambassador</div>
        <div className="sb-status">
          <span className="dot" />
          Open to work
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="sb-nav">
        <div className="sb-nav-label">// Navigate</div>
        {NAV.map(({ href, sec, Icon, label, num }) => (
          <a
            key={sec}
            href={href}
            className="sb-link"
            data-sec={sec}
            onClick={closeSidebar}
          >
            <span className="sb-link-ico">
              <Icon size={14} strokeWidth={1.75} />
            </span>
            <span className="sb-link-label">{label}</span>
            <span className="sb-link-dots" aria-hidden="true" />
            <span className="sb-count">{num}</span>
          </a>
        ))}
      </nav>

      {/* ── Stats ── */}
      <div className="sb-metrics">
        {[
          { count: 50,  label: 'Communities\nImpacted' },
          { count: 5,   label: 'Years\nExperience' },
          { count: 100, label: 'Events\nHosted' },
          { count: 99,  label: 'Server Safety\n%' },
        ].map(({ count, label }) => (
          <div key={label} className="sb-m">
            <div className="sb-m-val" data-count={count}>0</div>
            <div className="sb-m-lbl" style={{ whiteSpace: 'pre-line' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── Socials ── */}
      <div className="sb-social">
        <div className="sb-soc-label">// Connect</div>
        {SOCIALS.map(({ href, Icon, label, handle, tip }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="sb-soc-btn"
            data-tip={tip}
          >
            <span className="sb-soc-ico">
              <Icon size={13} strokeWidth={1.75} />
            </span>
            <span className="sb-soc-info">
              <span className="sb-soc-name">{label}</span>
              <span className="sb-soc-handle">{handle}</span>
            </span>
            <span className="sb-soc-arr">↗</span>
          </a>
        ))}
      </div>

    </aside>
  )
}