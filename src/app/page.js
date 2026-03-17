'use client'

import Topbar      from '@/components/Topbar'
import Sidebar     from '@/components/Sidebar'
import Hero        from '@/components/Hero'
import Roles       from '@/components/Roles'
import Portfolio   from '@/components/Portfolio'
import About       from '@/components/About'
import Services    from '@/components/Services'
import Experience  from '@/components/Experience'
import Tools       from '@/components/Tools'
import Contact     from '@/components/Contact'
import Footer      from '@/components/Footer'
import ClientShell from '@/components/ClientShell'

export default function Home() {
  return (
    <ClientShell>
      <Topbar />
      <div className="xp-prog"><div className="xp-fill" id="xp-fill" /></div>
      <Sidebar />
      <div className="overlay" id="overlay" />
      <div className="tip" id="tip" />
      <div className="main" id="main">
        <Hero />
        <Roles />
        <Portfolio />
        <About />
        <Services />
        <Experience />
        <Tools />
        <Contact />
      </div>
      <Footer />
    </ClientShell>
  )
}
