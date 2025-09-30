import MotionPage from '../components/MotionPage'
import Surface from '../components/ui/Surface'

const Post = () => (
  <MotionPage keyId="post">
    <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
      <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>Post Title</h2>
      <Surface type="card" elevation={2} radius="lg" style={{ padding: 'var(--space-6)', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Post content (markdown-rendered) goes here.</p>
      </Surface>
    </section>
  </MotionPage>
)

export default Post


