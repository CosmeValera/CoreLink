import { useContext } from 'react'

import { ViewsContext } from './ViewsProvider'

const useViews = () => {
  return useContext(ViewsContext)
}

export default useViews
