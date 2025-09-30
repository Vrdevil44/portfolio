import React, { useState } from 'react'
import Surface from './ui/Surface'

const NewsletterSignup = ({ onSubscribe }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await onSubscribe?.(email)
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }
  return (
    <Surface type="card" elevation={2} radius="lg" style={{ padding: 20 }}>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12, alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Subscribe</h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Get updates on new projects and posts.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
          <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@domain.com" style={{
            padding: '12px 14px', background: 'var(--surface-control-bg)', border: 'var(--glass-border)', borderRadius: 8, color: 'var(--color-text)'
          }} />
          <button className="ui-button primary" type="submit" disabled={status==='loading'}>
            {status==='loading' ? 'Joining…' : 'Join'}
          </button>
        </div>
        {status==='success' && <div style={{ color: 'var(--color-text)' }}>Welcome aboard!</div>}
        {status==='error' && <div style={{ color: 'salmon' }}>Try again later.</div>}
      </form>
    </Surface>
  )
}

export default NewsletterSignup


