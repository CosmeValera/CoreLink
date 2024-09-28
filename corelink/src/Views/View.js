import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { ReactComponent as AddIcon } from '../icons/add.svg'
import { ReactComponent as CloseIcon } from '../icons/close.svg'
import { ReactComponent as FleetIcon } from '../icons/grid.svg'
import { ReactComponent as SingleSatelliteIcon } from '../icons/group-resource.svg'

import FleetMonitoring, { SingleSatelliteMonitoring } from '../FleetMonitoring'
import Layout from '../Layout'

import useViews from './useViews'
import './tabs.scss'

const Views = () => {
  const {
    getViewSatellites,
    openViews,
    selectedView,
    setSelectedView,
    removeView,
    addView,
    addSingleSatelliteView,
    updateLayout,
  } = useViews()

  return (
    <Tabs
      selectedIndex={selectedView}
      onSelect={(index) => setSelectedView(index)}
    >
      <TabList>
        {openViews.map((view) => (
          <Tab key={view.id}>
            <Box
              className="icon"
              sx={{ display: 'flex', alignItems: 'flex-start' }}
            >
              {view.satellite ? (
                <SingleSatelliteIcon width={16} height={16} />
              ) : (
                <FleetIcon width={16} height={16} />
              )}
            </Box>
            <Typography
              variant="subtitle2"
              sx={{
                flex: '1 0 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {view.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                p: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CloseIcon
                width={16}
                height={16}
                onClick={(ev) => {
                  // NOTE prevent the tab being closed from being selected too!
                  ev.stopPropagation()
                  removeView(view.id)
                }}
              />
            </Box>
          </Tab>
        ))}
        <Button
          variant="text"
          disableRipple
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            p: '6px 12px',
            color: 'foreground.contrastPrimary',
            '.MuiButton-startIcon': {
              m: 0,
              color: 'foreground.contrastSecondary',
            },
            minWidth: 'fit-content',
          }}
          startIcon={<AddIcon width={24} height={24} />}
          onClick={() => addView()}
        >
          Add new
        </Button>
      </TabList>
      {openViews.map((view) => { 
        const headerPanelToRender = (() => {
          const isSystemSupervisorPanel = (view.name === 'SCCF - System Supervisor');
          if (isSystemSupervisorPanel) {
            return null; // Render nothing if it's a System Supervisor panel
          } 
          
          const isSatellitePanel = view.satellite;
          if (isSatellitePanel) {
            return <SingleSatelliteMonitoring satellite={view.satellite} />;
          }
          
          return <FleetMonitoring addSingleSatelliteView={addSingleSatelliteView} />;
        });
   
        return (
          <TabPanel key={view.id}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >

              {headerPanelToRender()}

              <Box sx={{ position: 'relative', flex: '1' }}>
                <Layout
                  satellites={getViewSatellites()}
                  layout={view.layout}
                  updateLayout={updateLayout}
                />
              </Box>
            </Box>
          </TabPanel>
        )
      })}
    </Tabs>
  )
}

export default Views
