'use client'

function toggleTheme() {
  const isLight = document.body.classList.toggle('light')
  const icon  = document.getElementById('theme-icon')
  const label = document.getElementById('theme-label')
  if (isLight) {
    if (icon)  icon.textContent  = '🌙'
    if (label) label.textContent = 'Dark'
    localStorage.setItem('kgx-theme', 'light')
  } else {
    if (icon)  icon.textContent  = '☀'
    if (label) label.textContent = 'Light'
    localStorage.setItem('kgx-theme', 'dark')
  }
}

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open')
  document.getElementById('overlay')?.classList.toggle('show')
}

export default function Topbar() {
  return (
    <header className="topbar">
      <span className="tb-wordmark">Korgonxx</span>
      <div className="tb-sep" />
      <div className="tb-pill">
        <span className="live" />
        Available for new projects
      </div>
      <div className="tb-sep" />
      <div className="tb-pill">Haryana, India</div>

      <div className="tb-right">
        <span className="tb-clock" id="tb-clock">00:00</span>
        <button className="theme-btn" onClick={toggleTheme}>
          <span id="theme-icon">☀</span>
          <span id="theme-label">Light</span>
        </button>
        <button className="hamburger" onClick={toggleSidebar}>☰ Menu</button>
        <a href="#contact" className="tb-cta">Hire Me →</a>
      </div>
    </header>
  )
}
