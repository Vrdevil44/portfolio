import MotionPage from '../components/MotionPage'
import ServicesGrid from '../components/ServicesGrid'
import ProcessTimeline from '../components/ProcessTimeline'

const Services = () => {
  return (
    <MotionPage keyId="services">
      <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
        <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>Services</h2>
        <ServicesGrid items={[
          { icon: '⚡', title: 'Product Design', description: 'From idea to interface.', features: ['Research', 'Wireframes', 'Prototypes'] },
          { icon: '🧩', title: 'Frontend Engineering', description: 'Robust, animated UIs.', features: ['React', 'Vite', 'Three.js'] },
          { icon: '🧠', title: 'AI Integration', description: 'LLM features and tooling.', features: ['Chat', 'Agents', 'RAG'] },
        ]} />
      </section>
      <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
        <h3 className="primary-font" style={{ margin: '0 0 var(--space-3)' }}>Process</h3>
        <ProcessTimeline steps={[
          { title: 'Discover', description: 'Goals, audience and constraints.' },
          { title: 'Design', description: 'Flows, prototypes and visuals.' },
          { title: 'Build', description: 'Accessible, performant UI.' },
          { title: 'Iterate', description: 'Measure and refine continuously.' },
        ]} />
      </section>
    </MotionPage>
  )
}

export default Services


