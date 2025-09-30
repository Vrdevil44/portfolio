import MotionPage from '../components/MotionPage'
import Surface from '../components/ui/Surface'

const PostCard = ({ title, excerpt }) => (
  <Surface type="card" elevation={2} radius="lg" style={{ padding: 20 }}>
    <h3 style={{ marginTop: 0 }}>{title}</h3>
    <p style={{ color: 'var(--color-text-muted)' }}>{excerpt}</p>
    <button className="ui-button secondary">Read</button>
  </Surface>
)

const Blog = () => {
  const posts = [
    { title: 'Designing with Roles and Tokens', excerpt: 'A practical guide to semantic theming.' },
    { title: 'Animating Hero Sections', excerpt: 'Patterns for tasteful motion and performance.' },
  ]
  return (
    <MotionPage keyId="blog">
      <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
        <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>Blog</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          {posts.map((p, i) => <PostCard key={i} {...p} />)}
        </div>
      </section>
    </MotionPage>
  )
}

export default Blog


