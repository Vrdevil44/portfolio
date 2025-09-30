import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const DesignContext = createContext(null)

export const DesignProvider = ({ children }) => {
  const [isDesignMode, setIsDesignMode] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [hoverId, setHoverId] = useState(null)
  const [overridesById, setOverridesById] = useState({})

  const toggleDesignMode = () => setIsDesignMode(prev => !prev)

  const setOverride = (id, cssVarName, value) => {
    setOverridesById(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [cssVarName]: value,
      },
    }))
  }

  const clearOverrides = (id) => {
    setOverridesById(prev => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const value = useMemo(() => ({
    isDesignMode,
    toggleDesignMode,
    selectedId,
    setSelectedId,
    hoverId,
    setHoverId,
    overridesById,
    setOverride,
    clearOverrides,
  }), [isDesignMode, selectedId, hoverId, overridesById])

  return (
    <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
  )
}

export const useDesign = () => {
  const ctx = useContext(DesignContext)
  if (!ctx) throw new Error('useDesign must be used within a DesignProvider')
  return ctx
}


