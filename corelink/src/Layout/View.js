import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Layout, Model } from 'flexlayout-react'

import { ReactComponent as EmptyPanelIcon } from '../icons/gui.svg'
import { ReactComponent as CloseIcon } from '../icons/close.svg'
import { ReactComponent as OpenInNewIcon } from '../icons/launch.svg'
import { ReactComponent as MaximizeIcon } from '../icons/maximize.svg'
import { ReactComponent as MinimizeIcon } from '../icons/minimize.svg'
// import { ReactComponent as MoreIcon } from '../icons/overflow-menu-vertical.svg'

import { getPanelComponent } from '../Panels'

import useLayout from './useLayout'

import 'flexlayout-react/style/light.css'
import './layout.scss'

const CONFIG = {
  global: {
    tabEnableFloat: true,
    tabSetEnableClose: true,
    // tabSetEnableTabStrip: false,
    tabSetTabStripHeight: 24,
    // tabSetHeaderHeight: 24,
    tabEnableRename: false,
    tabDragSpeed: 0.15,
  },
  borders: [],
}

const EmptyPanel = () => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <EmptyPanelIcon width={60} height={60} opacity={0.16} />
  </div>
)

const View = (props) => {
  const { satellites, layout, updateLayout } = props
  const { ref } = useLayout()

  const factory = (node) => {
    const { width, height } = node.getRect()
    const panel = node.getComponent()

    if (!panel) {
      return <EmptyPanel />
    }

    const PanelComponent = getPanelComponent(panel)
    return (
      <PanelComponent satellites={satellites} width={width} height={height} />
    )
  }

  const model = useMemo(() => {
    const config = Object.assign({}, CONFIG, { layout })
    return Model.fromJson(config)
  }, [layout])

  return (
    <Layout
      ref={ref}
      model={model}
      factory={factory}
      icons={{
        close: (
          <CloseIcon
            width={16}
            height={16}
            color="var(--gmv-primary-white)"
          />
        ),
        closeTabset: (
          <CloseIcon
            width={16}
            height={16}
            color="var(--foreground-primary, #001026DE)"
          />
        ),
        maximize: (
          <MaximizeIcon
            width={16}
            height={16}
            color="var(--foreground-primary, #001026DE)"
          />
        ),
        restore: (
          <MinimizeIcon
            width={16}
            height={16}
            color="var(--foreground-primary, #001026DE)"
          />
        ),
        popout: (
          <OpenInNewIcon
            width={16}
            height={16}
            color="var(--foreground-primary, #001026DE)"
          />
        ),
        // NOTE displayed when some tabs are hidden
        // more: (
        //   <MoreIcon
        //     width={16}
        //     height={16}
        //     color="var(--foreground-primary, #001026DE)"
        //   />
        // ),
      }}
      onTabSetPlaceHolder={() => (
        <EmptyPanelIcon width={60} height={60} opacity={0.16} />
      )}
      onModelChange={updateLayout}
    />
  )
}

View.propTypes = {
  satellites: PropTypes.arrayOf(PropTypes.string).isRequired,
  layout: PropTypes.object.isRequired,
  updateLayout: PropTypes.func.isRequired,
}

export default View
