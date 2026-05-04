import Hero from './Hero'
import KineticText from './KineticText'
import {
  Handshake, Shield, PenLine,
  Users, Mic2, Globe,
  MessageSquare, Twitter, Send,
  FileText, Palette, LayoutGrid,
  AlignLeft, Map, Megaphone,
  ArrowUpRight
} from 'lucide-react'

/* ━━ All section components ━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* ─── HERO ──────────────────────────────────────────── */
export function Hero() {
  const metrics = [
    { count: 50,  label: 'Communities Impacted' },
    { count: 5,   label: 'Years Experience' },
    { count: 100, label: 'Events Hosted' },
    { count: 99,  label: 'Server Safety %' },
  ]
  return (
    <section id="hero" className="hero">
      <div className="hero-bg"><HeroBackground /></div>
      <p className="hero-kicker">Web3 Community Builder · Asia-Based</p>
      <KineticText text="KORGONXX" className="hero-name" tag="h1" stagger={0.08} delay={0.6} />
      <div className="hero-name-ghost" aria-hidden="true">KORGONXX</div>
      <p className="hero-desc">
        Helping Web3 projects grow by connecting, educating, and empowering communities across Asia and worldwide. Ambassador, Moderator, Content Creator.
      </p>
      <div className="chip-row">
        <span className="chip hi"><span className="blinker" />Available Worldwide</span>
        <span className="chip">Haryana, India</span>
        <span className="chip">Ambassador</span>
        <span className="chip">Moderator</span>
        <span className="chip">Content Creator</span>
      </div>
      <div className="hero-metrics rv">
        {metrics.map(m => (
          <div key={m.label} className="hm">
            <div className="hm-val" data-count={m.count}>0</div>
            <div className="hm-lbl">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── ROLES ─────────────────────────────────────────── */
export function Roles() {
  const roles = [
    { num:'01', Icon: Handshake, title:'Ambassador',      desc:'I represent Web3 projects I believe in — bridging teams with their communities across Asia and worldwide. Building trust, not just reach.' },
    { num:'02', Icon: Shield,    title:'Moderator',       desc:'Hosting events, guiding newcomers, keeping communities safe from bad actors. I create environments where real engagement thrives.' },
    { num:'03', Icon: PenLine,   title:'Content Creator', desc:'Turning complex blockchain ideas into clear, shareable threads and guides. Making Web3 concepts accessible to every level of user.' },
  ]
  return (
    <section id="roles" className="sec">
      <div className="sec-eyebrow rv">
        <span className="sec-num">01</span><div className="sec-line" /><span className="sec-tag">What I Do</span>
      </div>
      <KineticText text="Three Ways I Build Communities" className="sec-h" stagger={0.05} delay={0.8} wave={false} />
      <div className="role-grid">
        {roles.map((r, i) => (
          <div key={r.num} className={`role-card rv d${i+1}`}>
            <span className="rc-num">{r.num} //</span>
            <span className="rc-icon"><r.Icon size={22} strokeWidth={1.5} /></span>
            <div className="rc-title">{r.title}</div>
            <div className="rc-desc">{r.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── PORTFOLIO ─────────────────────────────────────── */
export function Portfolio() {
  const projects = [
    { idx:'01', name:'Movement Labs', role:'Pathfinder Specialist',       desc:'Onboarding new members, running community calls, and helping builders navigate the Movement Labs ecosystem across Asia.', year:'2024–2025', featured:true },
    { idx:'02', name:'Movernance',    role:'Moderator & Event Host',      desc:'Kept the community safe from scammers, hosted Rumble Nights twice weekly, and drove genuine engagement across the server.', year:'2024–2025' },
    { idx:'03', name:'Irys',          role:'Shihan · Ambassador · Creator', desc:'Achieved Shihan status. Created deep-dive content on programmable data, Matrix Packaging, and the IrysVM.', year:'2025' },
    { idx:'04', name:'Hookt.app',     role:'Community Builder',           desc:'Connected creators and sports fans in the Web3 space, driving community growth for this sports-meets-blockchain platform.', year:'2024' },
    { idx:'05', name:'BRKT',          role:'Content Creator',             desc:'Educational content, campaigns, and insights to help this blockchain-based prediction markets platform reach a wider audience.', year:'2024–2025' },
  ]
  return (
    <section id="portfolio" className="sec">
      <div className="sec-eyebrow rv">
        <span className="sec-num">02</span><div className="sec-line" /><span className="sec-tag">2023–2025</span>
      </div>
      <KineticText text="Selected Projects" className="sec-h" stagger={0.05} delay={0.8} wave={false} />
      <div className="proj-grid">
        {projects.map((p, i) => (
          <div key={p.idx} className={`proj-card rv d${(i%5)+1}${p.featured ? ' featured' : ''}`}>
            <span className="arrow"><ArrowUpRight size={15} strokeWidth={1.75} /></span>
            <div>
              {p.featured && <div className="proj-feat-badge">Featured</div>}
              <div className="proj-idx">{p.idx}</div>
              <div className="proj-name">{p.name}</div>
              <div className="proj-role">{p.role}</div>
            </div>
            <div>
              <div className="proj-desc">{p.desc}</div>
              <div className="proj-year">{p.year}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── ABOUT ─────────────────────────────────────────── */
export function About() {
  const attrs = [
    { key:'Charisma',  w:92 },
    { key:'Leadership',w:88 },
    { key:'Knowledge', w:94 },
    { key:'Vigilance', w:97 },
    { key:'Reach',     w:85 },
    { key:'Content',   w:90 },
  ]
  return (
    <section id="about" className="sec">
      <div className="sec-eyebrow rv">
        <span className="sec-num">03</span><div className="sec-line" /><span className="sec-tag">Who I Am</span>
      </div>
      <h2 className="sec-h rv d1">About Korgonxx</h2>
      <div className="about-inner">
        <div className="rv d1">
          <p className="about-body">
            I'm Korgonxx — a Web3 community builder and moderator based out of Haryana, India. The last five years have been all about helping decentralized projects grow, mostly by bringing people together, writing clear content, and keeping communities safe and active.
            <br /><br />
            I particularly enjoy working with founders who care more about genuine engagement than vanity metrics. If you're building something and want people who actually stick around, let's talk.
          </p>
          <a href="https://x.com/Korgonxx" target="_blank" rel="noreferrer" className="about-link" data-tip="Twitter / X">
            Follow on X / Twitter →
          </a>
        </div>
        <div className="rv d2">
          <div className="attr-list">
            {attrs.map(a => (
              <div key={a.key} className="attr">
                <span className="attr-key">{a.key}</span>
                <div className="attr-track">
                  <div className="attr-fill" data-w={a.w} style={{ width: 0 }} />
                </div>
                <span className="attr-val">{a.w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SERVICES ──────────────────────────────────────── */
const TICKER = ['Community Onboarding','Event Hosting','Content Creation','Safety & Moderation','Project Representation','Community Strategy']

export function Services() {
  const svcs = [
    { Icon: Users,    name:'Community\nOnboarding',   tip:'Onboarding' },
    { Icon: Mic2,     name:'Event\nHosting',          tip:'Events' },
    { Icon: PenLine,  name:'Content\nCreation',       tip:'Content' },
    { Icon: Shield,   name:'Safety &\nModeration',    tip:'Moderation' },
    { Icon: Globe,    name:'Project\nRepresentation', tip:'Representation' },
  ]
  return (
    <section id="services" className="sec">
      <div className="sec-eyebrow rv">
        <span className="sec-num">04</span><div className="sec-line" /><span className="sec-tag">Fast Delivery</span>
      </div>
      <h2 className="sec-h rv d1">Services</h2>
      <div className="ticker-outer">
        <div className="ticker-inner">
          {[...TICKER, ...TICKER].map((t,i) => <span key={i} className="tk">{t}</span>)}
        </div>
      </div>
      <div className="svc-grid rv">
        {svcs.map(s => (
          <div key={s.tip} className="svc" data-tip={s.tip}>
            <span className="svc-ico"><s.Icon size={20} strokeWidth={1.5} /></span>
            <div className="svc-name" style={{ whiteSpace: 'pre-line' }}>{s.name}</div>
            <span className="svc-lv">LV.MAX</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── EXPERIENCE ────────────────────────────────────── */
export function Experience() {
  const xp = [
    { org:'Movement Labs', yr:'2024–2025', role:'Pathfinder Specialist',       desc:'Onboarding members, running community calls, helping builders navigate the Movement Labs network across Asia.', w:96 },
    { org:'Movernance',    yr:'2024–2025', role:'Moderator & Event Host',      desc:'Community safety, scam prevention, and hosting Rumble Nights twice a week to build strong server culture.', w:82 },
    { org:'Irys',          yr:'2025',      role:'Shihan · Ambassador · Creator', desc:'Guided members as Shihan. Deep-dive content on programmable data, Matrix Packaging, and the IrysVM.', w:90 },
    { org:'BRKT',          yr:'2024–2025', role:'Content Creator',             desc:'Educational campaigns and insights for this blockchain-based prediction markets platform.', w:75 },
  ]
  return (
    <section id="experience" className="sec">
      <div className="sec-eyebrow rv">
        <span className="sec-num">05</span><div className="sec-line" /><span className="sec-tag">2013–Present</span>
      </div>
      <h2 className="sec-h rv d1">Experience</h2>
      <div className="xp-list rv d1">
        {xp.map(x => (
          <div key={x.org} className="xp-item">
            <div className="xp-l">
              <div className="xp-org">{x.org}</div>
              <div className="xp-yr">{x.yr}</div>
            </div>
            <div className="xp-r">
              <div className="xp-role">{x.role}</div>
              <div className="xp-desc">{x.desc}</div>
              <div className="xp-bar">
                <div className="xp-bar-fill" data-w={x.w} style={{ width: 0 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── TOOLS ─────────────────────────────────────────── */
export function Tools() {
  const tools = [
    { Icon: MessageSquare, name:'Discord',          tag:'Community Hub',     w:98, items:['Movernance Server — 100+ Rumble Night events','Movement Labs community onboarding flows','IRYS community moderation system'] },
    { Icon: Twitter,       name:'Twitter / X',      tag:'Content & Reach',   w:92, items:['Deep-dive IRYS threads on IrysVM & Matrix Packaging','BRKT campaign content & prediction market explainers','Movement Labs Pathfinder outreach threads'] },
    { Icon: Send,          name:'Telegram',         tag:'Direct Engagement', w:88, items:['Community announcements & raid coordination','Direct onboarding pipelines for new Web3 members','Project update broadcasts for multiple guilds'] },
    { Icon: FileText,      name:'Notion',           tag:'Organization',      w:82, items:['Ambassador activity logs & weekly reports','Event planning & Rumble Night runbooks','Community health dashboards for project teams'] },
    { Icon: Palette,       name:'Canva',            tag:'Visual Content',    w:80, items:['Campaign banners & announcement graphics','Social media post templates for ambassador work','Event promo visuals for Discord & Twitter'] },
    { Icon: LayoutGrid,    name:'Google Workspace', tag:'Docs & Sheets',     w:85, items:['Community growth trackers & member analytics','Content calendars for multi-project campaigns','Shared docs for cross-team ambassador coordination'] },
  ]
  const creations = [
    { Icon: AlignLeft, type:'Thread',            title:'IRYS IrysVM Deep-Dive',              desc:'A comprehensive educational Twitter thread breaking down IrysVM, Matrix Packaging, and programmable data.',        tool:'Twitter / X',     project:'Irys · 2025' },
    { Icon: Mic2,      type:'Event Series',      title:'Rumble Nights',                      desc:'Bi-weekly Discord community events for Movernance — structured engagement sessions strengthening server culture.',  tool:'Discord',          project:'Movernance · 2024–25' },
    { Icon: Map,       type:'Onboarding System', title:'Movement Labs Pathfinder Flow',      desc:'A complete onboarding pipeline from first contact to active builder through the Movement Labs ecosystem.',         tool:'Discord · Notion', project:'Movement Labs · 2024' },
    { Icon: Megaphone, type:'Campaign',          title:'BRKT Prediction Market Explainers', desc:'Educational content series explaining blockchain-based prediction markets, driving sustainable audience growth.',   tool:'Twitter/X · Canva',project:'BRKT · 2024–25' },
  ]

  return (
    <section id="tools" className="sec">
      <div className="sec-eyebrow rv">
        <span className="sec-num">06</span><div className="sec-line" /><span className="sec-tag">Stack & Creations</span>
      </div>
      <h2 className="sec-h rv d1">Tools I Use &amp;<br />What I Built</h2>

      {/* ── Tool rows ── */}
      <div className="tools-list rv d1">
        <div className="tl-header">
          <div className="tl-col-a">Tool</div>
          <div className="tl-col-b">Proficiency</div>
          <div className="tl-col-c">Built with it</div>
        </div>
        {tools.map((t, i) => (
          <div key={t.name} className="tl-row tool-card" data-tip={t.name}>
            <div className="tl-left">
              <span className="tl-idx">0{i + 1}</span>
              <span className="tl-icon"><t.Icon size={16} strokeWidth={1.5} /></span>
              <div className="tl-info">
                <div className="tl-name">{t.name}</div>
                <div className="tl-tag">{t.tag}</div>
              </div>
            </div>
            <div className="tl-mid">
              <div className="tl-bar-wrap">
                <div className="tl-bar" data-w={t.w} style={{ width: 0 }} />
              </div>
              <span className="tl-pct">{t.w}%</span>
            </div>
            <div className="tl-right">
              {t.items.map(item => (
                <div key={item} className="tl-item">{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Notable Creations ── */}
      <div className="rv d2">
        <div className="creations-header">
          <span className="creations-label">// Notable Creations</span>
          <div className="creations-line" />
        </div>
        <div className="creations-grid">
          {creations.map((c, i) => (
            <div key={c.title} className={`creation-card rv d${i + 1}`} data-num={`0${i + 1}`}>
              <div className="cc-top">
                <span className="cc-icon"><c.Icon size={18} strokeWidth={1.5} /></span>
                <span className="cc-type">{c.type}</span>
              </div>
              <div className="cc-title">{c.title}</div>
              <div className="cc-desc">{c.desc}</div>
              <div className="cc-footer">
                <span className="cc-tool">{c.tool}</span>
                <span className="cc-project">{c.project}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ───────────────────────────────────────── */
export function Contact() {
  return (
    <section id="contact" className="contact-wrap">
      <div className="contact-l rv">
        <div className="sec-eyebrow" style={{ marginBottom: 20 }}>
          <span className="sec-num">07</span><div className="sec-line" /><span className="sec-tag">Let&#39;s Work Together</span>
        </div>
        <div className="contact-tagline">
          Ready to<br />grow your<br /><em>community?</em>
        </div>
        <p className="contact-sub">
          Whether you&#39;re launching a new project or scaling an existing one — I bring structure, consistency, and energy your community needs to thrive.
        </p>
        <a href="mailto:contact@korgonxx.com" className="big-cta" data-tip="Send Email">
          Get in Touch
          <ArrowUpRight size={15} strokeWidth={2} />
        </a>
      </div>
      <div className="contact-r rv d2">
        <div className="sec-eyebrow" style={{ marginBottom: 28 }}>
          <span className="sec-num">Links</span><div className="sec-line" />
        </div>
        <div className="social-links">
          {[
            { href:'https://x.com/Korgonxx',                           Icon: Twitter,       name:'Twitter / X', handle:'@Korgonxx' },
            { href:'https://discordapp.com/users/1083960851884683405', Icon: MessageSquare, name:'Discord',     handle:'Korgonxx' },
            { href:'https://t.me/itxx_happy',                          Icon: Send,          name:'Telegram',    handle:'@itxx_happy' },
          ].map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="social-link">
              <div className="sl-ico"><s.Icon size={17} strokeWidth={1.75} /></div>
              <div>
                <div className="sl-name">{s.name}</div>
                <div className="sl-handle">{s.handle}</div>
              </div>
              <div className="sl-arr"><ArrowUpRight size={14} strokeWidth={1.75} /></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="footer">
      <div className="ascii-banner" style={{textAlign:'center', marginBottom:'16px'}}>
        <pre style={{fontFamily:'JetBrains Mono, monospace', fontSize:'10px', lineHeight:1.2, color:'var(--neon)', opacity:0.7}}>{`
 __ ______  ____  ______
   / //_/ __ \/ __ \/ ____/
  / ,< / / / / /_/ / / __  
 / /| / /_/ / _, _/ /_/ /  
/_/ |_\\____/_/ |_|\\____/  `}</pre>
      </div>
      <div className="ft-l">Korgonxx</div>
      <div className="ft-c">© 2025 Korgonxx · Haryana, India</div>
      <a href="#hero" className="ft-r">↑ Back to top</a>
    </footer>
  )
}
export { HeroBackground } from './HeroBackground'
