import React from 'react'

/**
 * Unified glass surface parent.
 * type: 'panel' | 'card' | 'control'
 * elevation: 1 | 2 | 3
 * radius: 'default' | 'lg'
 */
const Surface = ({ type = 'card', elevation = 1, radius = 'default', className = '', style, children, ...rest }) => {
  const typeClass = type === 'panel' ? 'surface--panel' : type === 'control' ? 'surface--control' : 'surface--card'
  const elevClass = `elev-${elevation}`
  const radiusClass = radius === 'lg' ? 'radius-lg' : ''
  return (
    <div className={`surface ${typeClass} ${elevClass} ${radiusClass} ${className}`} style={style} {...rest}>
      {children}
    </div>
  )
}

export default Surface


