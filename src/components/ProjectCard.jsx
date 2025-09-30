import React from 'react'
import Surface from './ui/Surface'

const Tag = ({ label }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 10px',
      borderRadius: '999px',
      fontSize: '12px',
      color: 'var(--color-text)',
      border: '1px solid',
      borderColor: 'color-mix(in oklab, var(--role-secondary), white 60%)',
      background: 'color-mix(in oklab, var(--secondary-soft), transparent 70%)',
    }}
  >{label}</span>
)

const ProjectCard = ({
  title,
  description,
  tags = [],
  imageUrl,
  links = {},
}) => {
  return (
    <Surface type="card" elevation={2} radius="lg" style={{ overflow: 'hidden' }}>
      {imageUrl && (
        <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
          <img src={imageUrl} alt="project" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.3))'
          }} />
        </div>
      )}
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 6px', fontSize: '18px', color: 'var(--color-text)' }}>{title}</h3>
        <p style={{ margin: '0 0 12px', color: 'var(--color-text-muted)' }}>{description}</p>
        {!!tags.length && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {tags.map((t) => <Tag key={t} label={t} />)}
          </div>
        )}
        <div style={{ display: 'flex', gap: 10 }}>
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noreferrer" className="ui-button primary">Live</a>
          )}
          {links.code && (
            <a href={links.code} target="_blank" rel="noreferrer" className="ui-button secondary">Code</a>
          )}
        </div>
      </div>
    </Surface>
  )
}

export default ProjectCard


