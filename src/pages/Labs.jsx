import MotionPage from '../components/MotionPage'
import ProjectCard from '../components/ProjectCard'

const Labs = () => (
  <MotionPage keyId="labs">
    <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
      <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>Labs</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        <ProjectCard title="Liquid Metal Orb" description="Interactive shader toy." tags={["Three.js","Shaders"]} links={{ demo: '#', code: '#' }} />
        <ProjectCard title="Neon Particles" description="Mouse gravity particles." tags={["WebGL","FX"]} links={{ demo: '#', code: '#' }} />
      </div>
    </section>
  </MotionPage>
)

export default Labs


