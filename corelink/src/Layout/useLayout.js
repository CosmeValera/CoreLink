import { useContext } from 'react'

import { LayoutContext } from './LayoutProvider'

const useLayout = () => {
  return useContext(LayoutContext)
}

export default useLayout
