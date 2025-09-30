import React, { useState } from 'react'

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="setting-section" style={{ marginBottom: 8 }}>
      <summary onClick={(e)=>{ e.preventDefault(); setOpen(o=>!o) }} style={{ padding: 16, cursor: 'pointer', userSelect: 'none' }}>
        {q}
      </summary>
      {open && (
        <div className="setting-content" style={{ padding: 16 }}>
          <div style={{ color: 'var(--color-text)' }}>{a}</div>
        </div>
      )}
    </div>
  )
}

const FAQAccordion = ({ items = [] }) => (
  <div>
    {items.map((it, i) => <FAQItem key={i} q={it.q} a={it.a} />)}
  </div>
)

export default FAQAccordion


