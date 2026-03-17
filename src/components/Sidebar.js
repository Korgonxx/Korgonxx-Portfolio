'use client'

const NAV = [
  { href: '#hero',       sec: 'hero',        ico: '◈', label: 'Overview',   num: '01' },
  { href: '#roles',      sec: 'roles',       ico: '◇', label: 'What I Do',  num: '02' },
  { href: '#portfolio',  sec: 'portfolio',   ico: '◈', label: 'Projects',   num: '03' },
  { href: '#about',      sec: 'about',       ico: '◇', label: 'About',      num: '04' },
  { href: '#services',   sec: 'services',    ico: '◈', label: 'Services',   num: '05' },
  { href: '#experience', sec: 'experience',  ico: '◇', label: 'Experience', num: '06' },
  { href: '#tools',      sec: 'tools',       ico: '◈', label: 'Tools',      num: '07' },
  { href: '#contact',    sec: 'contact',     ico: '◇', label: 'Contact',    num: '08' },
]

function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open')
  document.getElementById('overlay')?.classList.remove('show')
}

export default function Sidebar() {
  return (
    <aside className="sidebar" id="sidebar">
      {/* Profile */}
      <div className="sb-profile">
        <div className="sb-avatar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatar.png" alt="Korgonxx" />
        </div>
        <div className="sb-name">Korgonxx</div>
        <div className="sb-role">Web3 Community Builder<br />Moderator · Ambassador</div>
        <div className="sb-status">
          <span className="dot" />
          Open to work
        </div>
      </div>

      {/* Nav */}
      <nav className="sb-nav">
        <div className="sb-nav-label">Navigate</div>
        {NAV.map(({ href, sec, ico, label, num }) => (
          <a
            key={sec}
            href={href}
            className="sb-link"
            data-sec={sec}
            onClick={closeSidebar}
          >
            <span className="ico">{ico}</span>
            {label}
            <span className="sb-count">{num}</span>
          </a>
        ))}
      </nav>

      {/* Stats */}
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

      {/* Socials */}
      <div className="sb-social">
        <a href="https://x.com/Korgonxx"                              target="_blank" rel="noreferrer" className="sb-soc-btn" data-tip="Twitter / X">𝕏</a>
        <a href="https://discordapp.com/users/1083960851884683405"    target="_blank" rel="noreferrer" className="sb-soc-btn" data-tip="Discord">DC</a>
        <a href="https://t.me/itxx_happy"                            target="_blank" rel="noreferrer" className="sb-soc-btn" data-tip="Telegram">TG</a>
      </div>
    </aside>
  )
}
