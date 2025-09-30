import MotionPage from '../components/MotionPage'
import Surface from '../components/ui/Surface'

const CaseStudy = () => (
  <MotionPage keyId="case">
    <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
      <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>Case Study</h2>
      <Surface type="card" elevation={2} radius="lg" style={{ padding: 'var(--space-6)', maxWidth: 1000, margin: '0 auto' }}>
        <h3>Problem</h3>
        <p style={{ color: 'var(--color-text-muted)' }}>Describe the challenge and constraints.</p>
        <h3>Approach</h3>
        <p style={{ color: 'var(--color-text-muted)' }}>Outline research, design and engineering steps.</p>
        <h3>Outcome</h3>
        <p style={{ color: 'var(--color-text-muted)' }}>Quantifiable results and impact.</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <a className="ui-button secondary" href="#">Previous</a>
          <a className="ui-button primary" href="#">Next</a>
        </div>
      </Surface>
    </section>
  </MotionPage>
)

export default CaseStudy


