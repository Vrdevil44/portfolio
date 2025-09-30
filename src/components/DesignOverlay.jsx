import { useEffect, useState } from 'react'
import { useDesign } from '../contexts/DesignContext'

const outlineColor = 'rgba(255,255,255,0.9)'
const hoverColor = 'rgba(169,112,255,0.9)'

export default function DesignOverlay() {
  const { isDesignMode, selectedId, setSelectedId, hoverId, setHoverId } = useDesign()
  const [rect, setRect] = useState(null)
  const [hoverRect, setHoverRect] = useState(null)

  useEffect(() => {
    if (!isDesignMode) {
      setRect(null)
      setHoverRect(null)
      return
    }

    const updateRects = () => {
      if (selectedId) {
        const el = document.querySelector(`[data-design-id="${selectedId}"]`)
        setRect(el ? el.getBoundingClientRect() : null)
      } else {
        setRect(null)
      }
      if (hoverId) {
        const elH = document.querySelector(`[data-design-id="${hoverId}"]`)
        setHoverRect(elH ? elH.getBoundingClientRect() : null)
      } else {
        setHoverRect(null)
      }
    }

    updateRects()
    const ro = new ResizeObserver(updateRects)
    ro.observe(document.documentElement)
    window.addEventListener('scroll', updateRects, true)
    window.addEventListener('resize', updateRects)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', updateRects, true)
      window.removeEventListener('resize', updateRects)
    }
  }, [isDesignMode, selectedId, hoverId])

  useEffect(() => {
    if (!isDesignMode) return

    const handlePointerMove = (e) => {
      // find nearest ancestor with data-design-id
      let node = e.target
      let id = null
      while (node && node !== document) {
        if (node instanceof HTMLElement && node.dataset && node.dataset.designId) {
          id = node.dataset.designId
          break
        }
        node = node.parentNode
      }
      setHoverId(id)
    }

    const handleClick = (e) => {
      if (!isDesignMode) return
      let node = e.target
      let id = null
      while (node && node !== document) {
        if (node instanceof HTMLElement && node.dataset && node.dataset.designId) {
          id = node.dataset.designId
          break
        }
        node = node.parentNode
      }
      if (id) {
        e.preventDefault()
        e.stopPropagation()
        setSelectedId(id)
      }
    }

    document.addEventListener('pointermove', handlePointerMove, true)
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('pointermove', handlePointerMove, true)
      document.removeEventListener('click', handleClick, true)
    }
  }, [isDesignMode, setHoverId, setSelectedId])

  if (!isDesignMode) return null

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2500 }}>
      {hoverRect && (!selectedId || hoverId !== selectedId) && (
        <div style={{
          position: 'fixed',
          left: hoverRect.left + 'px',
          top: hoverRect.top + 'px',
          width: hoverRect.width + 'px',
          height: hoverRect.height + 'px',
          outline: `2px dashed ${hoverColor}`,
          outlineOffset: '0px',
          borderRadius: '8px',
          boxShadow: '0 0 0 2px rgba(169,112,255,0.25) inset',
        }} />
      )}
      {rect && (
        <div style={{
          position: 'fixed',
          left: rect.left + 'px',
          top: rect.top + 'px',
          width: rect.width + 'px',
          height: rect.height + 'px',
          outline: `2px solid ${outlineColor}`,
          outlineOffset: '0px',
          borderRadius: '8px',
          boxShadow: '0 0 0 2px rgba(255,255,255,0.25) inset',
        }} />
      )}
    </div>
  )
}


