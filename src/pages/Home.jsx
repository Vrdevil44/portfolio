import Hero from '../components/Hero'
import MotionPage from '../components/MotionPage'
import { BentoGrid, BentoItem } from '../components/BentoGrid'
import LogosMarquee from '../components/LogosMarquee'
import NewsletterSignup from '../components/NewsletterSignup'
import ProjectCard from '../components/ProjectCard'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <MotionPage keyId="home">
      <Hero />
      <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
        <LogosMarquee items={["/public/vite.svg","/public/vite.svg","/public/vite.svg","/public/vite.svg"]} />
      </section>
      <BentoGrid>
        <BentoItem col="span 7" row="span 2">
          <h3 className="primary-font" style={{ marginBottom: 'var(--space-3)' }}>Live Tech Stack</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>React, Vite, Framer Motion, Vanta.js, Three.js, GSAP-ready.</p>
        </BentoItem>
        <BentoItem col="span 5" row="span 2">
          <h3 className="primary-font" style={{ marginBottom: 'var(--space-3)' }}>Now</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>Exploring AI UX, realtime, and shader‑based visuals.</p>
        </BentoItem>
        <BentoItem col="span 12" row="span 2">
          <h3 className="primary-font" style={{ marginBottom: 'var(--space-3)' }}>Featured</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            <ProjectCard title="Prognosys AI" description="Predictive analytics platform." tags={["React","Node","AI"]} links={{ demo: '#', code: '#' }} />
            <ProjectCard title="Webly" description="Modern web toolkit." tags={["Vite","Design System"]} links={{ demo: '#', code: '#' }} />
          </div>
        </BentoItem>
      </BentoGrid>
      <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
        <NewsletterSignup onSubscribe={async ()=> new Promise(r=>setTimeout(r,600))} />
      </section>
      <section style={{ padding: '0 var(--container-pad) var(--space-6)', marginTop: 'var(--space-6)' }}>
        <h3 className="primary-font" style={{ margin: '0 0 var(--space-3)' }}>Testimonials</h3>
        <Testimonials items={[
          { quote: 'A joy to work with; delivers beyond expectations.', author: 'Client A', role: 'Founder' },
          { quote: 'Top-tier engineering and design instincts.', author: 'Client B', role: 'CTO' },
        ]} />
      </section>
    </MotionPage>
  )
}

export default Home


