import MotionPage from '../components/MotionPage'
import Surface from '../components/ui/Surface'
import { useState } from 'react'
import FilterTabs from '../components/FilterTabs'
import ProjectCard from '../components/ProjectCard'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Web', value: 'web' },
    { label: '3D', value: '3d' },
    { label: 'AI', value: 'ai' },
  ]

  return (
    <MotionPage keyId="projects">
    <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
      <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>Projects</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        <FilterTabs tabs={tabs} value={filter} onChange={setFilter} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          <ProjectCard title="Neon Particles" description="Interactive particle field." tags={["3D","WebGL"]} links={{ demo: '#', code: '#' }} />
          <ProjectCard title="Liquid Metal" description="Shader metal orb." tags={["3D","Shaders"]} links={{ demo: '#', code: '#' }} />
          <ProjectCard title="AI Notes" description="LLM assisted notes." tags={["AI","React"]} links={{ demo: '#', code: '#' }} />
        </div>
      </div>
    </section>
    </MotionPage>
  )
}

export default Projects


