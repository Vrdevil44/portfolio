import MotionPage from '../components/MotionPage'

const items = Array.from({ length: 8 }).map((_, i) => ({ id: i }))

const Gallery = () => {
  return (
    <MotionPage keyId="gallery">
      <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
        <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>Gallery</h2>
        <div style={{
          columns: '3 280px',
          columnGap: 'var(--space-4)'
        }}>
          {items.map(it => (
            <div key={it.id} className="surface surface--card elev-2 radius-lg" style={{
              marginBottom: 'var(--space-4)',
              breakInside: 'avoid',
              height: `${220 + (it.id % 3) * 60}px`
            }} />
          ))}
        </div>
      </section>
    </MotionPage>
  )
}

export default Gallery


