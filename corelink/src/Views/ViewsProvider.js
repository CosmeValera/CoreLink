import React from 'react'
import { useLocalStorage } from 'react-use'
import { nanoid } from 'nanoid'

import { INITIAL_VIEW, DEFAULT_VIEW, SATELLITES } from './fixture'

export const ViewsContext = React.createContext(/* default value */)

const INITIAL_VIEWS = [Object.assign({ id: nanoid() }, INITIAL_VIEW)]

const ViewsProvider = (props) => {
  const [selectedView, setSelectedView] = useLocalStorage('selectedView', 0)
  const [openViews, setOpenViews] = useLocalStorage('openViews', INITIAL_VIEWS)

  // REVIEW is this really needed?
  const getViewSatellites = () => {
    const currentView = openViews[selectedView]

    if (currentView.satellite) {
      return [currentView.satellite]
    }

    return SATELLITES
  }

  const removeView = (id) => {
    // NOTE `useLocalStorage` does not work with updater functions (bug)
    // SEE https://github.com/streamich/react-use/issues/2512
    const views = openViews.filter((view) => view.id !== id)
    setOpenViews(views)

    if (selectedView >= views.length) setSelectedView(selectedView - 1)
  }

  const addSingleSatelliteView = (satellite) => {
    const { layout } = openViews[selectedView]
    const view = {
      name: `Satellite ${satellite}`,
      id: nanoid(),
      satellite,
      layout,
    }
    addView(view)
  }

  const addView = (view = DEFAULT_VIEW) => {
    setOpenViews(openViews.concat(Object.assign({ id: nanoid() }, view)))
    // NOTE use the full length because we have just added another element, but
    // `openViews` is not updated yet
    setSelectedView(openViews.length)
  }

  const updateLayout = (model) => {
    const newLayout = model.toJson().layout
    const newOpenViews = [...openViews]
    newOpenViews[selectedView] = {
      ...openViews[selectedView],
      layout: newLayout,
    }
    setOpenViews(newOpenViews)
  }

  return (
    <ViewsContext.Provider
      {...props}
      value={{
        openViews,
        selectedView,
        setSelectedView,
        removeView,
        addView,
        addSingleSatelliteView,
        updateLayout,
        getViewSatellites,
      }}
    />
  )
}

export default ViewsProvider
