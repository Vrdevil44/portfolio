import MotionPage from '../components/MotionPage'
import Surface from '../components/ui/Surface'
import SkillsChips from '../components/SkillsChips'

const About = () => {
  return (
    <MotionPage keyId="about">
    <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
      <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>About</h2>
      <div style={{ display: 'grid', gap: 16, maxWidth: 1100, margin: '0 auto' }}>
        <Surface type="card" elevation={2} radius="lg" style={{ padding: 'var(--space-6)' }}>
          <p style={{ fontSize: 'var(--fs-lg)', color: 'var(--color-text-muted)' }}>
            I design and build immersive, performant experiences across web, 3D and AI.
          </p>
        </Surface>
        <Surface type="card" elevation={2} radius="lg" style={{ padding: 'var(--space-6)' }}>
          <h3 style={{ marginTop: 0 }}>Skills</h3>
          <SkillsChips items={["React","Three.js","Vite","Framer Motion","Shaders","Node","Design Systems"]} />
        </Surface>
      </div>
    </section>
    </MotionPage>
  )
}

export default About


