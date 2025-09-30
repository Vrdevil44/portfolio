import { useEffect, useRef } from 'react'
import { useDesign } from '../contexts/DesignContext'

export default function DesignStylesApplier() {
  const { overridesById } = useDesign()
  const appliedRef = useRef(new Map()) // id -> Set(varNames)

  useEffect(() => {
    const applyAll = () => {
      const prev = appliedRef.current
      const nextApplied = new Map()

      // Apply current overrides
      Object.entries(overridesById || {}).forEach(([id, vars]) => {
        const el = document.querySelector(`[data-design-id="${id}"]`)
        if (!el) return
        const varNames = new Set(Object.keys(vars || {}))
        // Remove no-longer-present vars
        const prevSet = prev.get(id) || new Set()
        prevSet.forEach((name) => {
          if (!varNames.has(name)) {
            el.style.removeProperty(name)
          }
        })
        // Apply current vars
        for (const [name, value] of Object.entries(vars || {})) {
          if (value == null || value === '') {
            el.style.removeProperty(name)
          } else {
            el.style.setProperty(name, value)
          }
        }
        nextApplied.set(id, varNames)
      })

      // Clean up ids that were removed
      prev.forEach((names, id) => {
        if (!nextApplied.has(id)) {
          const el = document.querySelector(`[data-design-id="${id}"]`)
          if (el) {
            names.forEach((n) => el.style.removeProperty(n))
          }
        }
      })

      appliedRef.current = nextApplied
    }

    applyAll()

    const observer = new MutationObserver(() => applyAll())
    observer.observe(document.body, { childList: true, subtree: true, attributes: true })
    window.addEventListener('resize', applyAll)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', applyAll)
    }
  }, [overridesById])

  return null
}


