import React, { useState } from 'react'
import Surface from './ui/Surface'

const Field = ({ label, children }) => (
  <label style={{ display: 'grid', gap: 6 }}>
    <span style={{ color: 'var(--color-text)' }}>{label}</span>
    {children}
  </label>
)

const Input = (props) => (
  <input {...props} style={{
    padding: '12px 14px',
    background: 'var(--surface-control-bg)',
    border: 'var(--glass-border)',
    borderRadius: 8,
    color: 'var(--color-text)'
  }} />
)

const TextArea = (props) => (
  <textarea {...props} rows={5} style={{
    padding: '12px 14px',
    background: 'var(--surface-control-bg)',
    border: 'var(--glass-border)',
    borderRadius: 8,
    color: 'var(--color-text)'
  }} />
)

const ContactForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const handle = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await onSubmit?.(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <Surface type="card" elevation={2} radius="lg" style={{ padding: 20 }}>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        <Field label="Name"><Input required value={form.name} onChange={handle('name')} /></Field>
        <Field label="Email"><Input required type="email" value={form.email} onChange={handle('email')} /></Field>
        <Field label="Message"><TextArea required value={form.message} onChange={handle('message')} /></Field>
        <div>
          <button className="ui-button primary" type="submit" disabled={status==='loading'}>
            {status==='loading' ? 'Sending…' : 'Send'}
          </button>
        </div>
        {status==='success' && <div style={{ color: 'var(--color-text)' }}>Thanks! I’ll get back to you soon.</div>}
        {status==='error' && <div style={{ color: 'salmon' }}>Failed to send. Try again.</div>}
      </form>
    </Surface>
  )
}

export default ContactForm


