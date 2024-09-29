import React, { useState, useEffect } from 'react'

import useSidebarPanels, { Item } from '../customHooks/useSidebarPanels'
import { useStore } from '../state/store'
import ModuleLoader from './ModuleLoader'

export interface DynamicMicrofrontendProps {
  name: string;
  component: string;
  width: number;
  height: number;
}

const DynamicMicrofrontend: React.FC<DynamicMicrofrontendProps> = (props) => {
  const [remote, setRemote] = useState<Item>()

  const { sidebarPanels } = useSidebarPanels()

  const changePanelData = useStore((state) => state.changePanelData)
  const getCurrentView = useStore((state) => state.getCurrentView)

  // const { keycloak } = useAuth()

  // SET REMOTE from sidebar.json
  useEffect(() => {
    const sidebarPanel = sidebarPanels.find(sidebarPanel =>
      sidebarPanel.items.some(item => item.name === props.name)
    )

    if (sidebarPanel) {
      const panelItem: Item | undefined = sidebarPanel.items.find(item => item.name === props.name)
      if (panelItem) {
        setRemote(panelItem)
      }
    }
  }, [sidebarPanels, props.component])

  return (
    <>
      {remote && (
        <ModuleLoader 
          url={remote.url} 
          {...props} 
          {...remote.customProps} 
          changePanelData={changePanelData} 
          getCurrentView={getCurrentView} 
          component={remote.component}
        />
      )}
    </>
  )
}

export default DynamicMicrofrontend