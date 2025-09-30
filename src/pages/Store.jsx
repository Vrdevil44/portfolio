import MotionPage from '../components/MotionPage'
import ProjectCard from '../components/ProjectCard'

const Store = () => (
  <MotionPage keyId="store">
    <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
      <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>Store</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        <ProjectCard title="UI Presets" description="Theme presets for your site." tags={["Design","Tokens"]} links={{ demo: '#', code: '#' }} />
        <ProjectCard title="3D Scenes" description="Spline/Three.js scenes." tags={["3D","Assets"]} links={{ demo: '#', code: '#' }} />
      </div>
    </section>
  </MotionPage>
)

export default Store


