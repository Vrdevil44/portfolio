import MotionPage from '../components/MotionPage'
import Surface from '../components/ui/Surface'

const Resume = () => (
  <MotionPage keyId="resume">
    <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
      <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>Resume</h2>
      <Surface type="card" elevation={2} radius="lg" style={{ padding: 'var(--space-6)', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Embed your resume PDF here or link to download.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <a className="ui-button primary" href="#">Download PDF</a>
          <a className="ui-button" href="#">LinkedIn</a>
        </div>
      </Surface>
    </section>
  </MotionPage>
)

export default Resume


