import React from 'react'

const Button = ({ children, variant = 'primary', ...props }) => {
  const className = `ui-button ${variant}`
  return (
    <button className={className} {...props}>{children}</button>
  )
}

export default Button


