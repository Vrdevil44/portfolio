import MotionPage from '../components/MotionPage'
import Surface from '../components/ui/Surface'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <MotionPage keyId="contact">
    <section style={{ padding: '0 var(--container-pad) var(--space-6)' }}>
      <h2 className="primary-font" style={{ fontSize: 'var(--fs-xl)', margin: '0 0 var(--space-5)' }}>Contact</h2>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <ContactForm onSubmit={async () => {
          // Placeholder submit — integrate with Formspree/Resend later
          await new Promise(r => setTimeout(r, 800))
        }} />
      </div>
    </section>
    </MotionPage>
  )
}

export default Contact


