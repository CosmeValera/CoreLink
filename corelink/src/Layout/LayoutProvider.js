import React, { useRef, useCallback } from 'react'

export const LayoutContext = React.createContext(/* default value */)

const LayoutProvider = (props) => {
  const layoutRef = useRef()

  const addComponent = useCallback((item) => {
    const { name, component } = item
    layoutRef.current?.addTabToActiveTabSet({ component, name, active: true })
  }, [])

  const dragComponent = useCallback((item, ev) => {
    const { name, component } = item

    // NOTE prevent default dragging behavior
    ev.preventDefault()

    layoutRef.current?.addTabWithDragAndDrop(name, { component, name }, null)
  }, [])

  return (
    <LayoutContext.Provider
      {...props}
      value={{ ref: layoutRef, addComponent, dragComponent }}
    />
  )
}

export default LayoutProvider
