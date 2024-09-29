import { useState, useEffect } from 'react'

export interface Panel {
  name: string;
  items: Item[];
}

export interface Item {
  name: string;
  component: string;
  url: string;
  customProps: CustomProps;
}

interface CustomProps {
  [key: string]: unknown;
}

const useSidebarPanels = () => {
  const [sidebarPanels, setSidebarPanels] = useState<Panel[]>([])

  useEffect(() => {
    fetch('/config/sidebar.json')
      .then(response => response.json())
      .then(data => {
        setSidebarPanels(data)
      })
      .catch(error => console.error('Error fetching sidebar.json:', error))
  }, [])

  return { sidebarPanels }
}

export default useSidebarPanels
