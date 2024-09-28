import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { styled, Box, Typography, Collapse, IconButton } from '@mui/material'

import { ReactComponent as ChevronUpIcon } from '../icons/chevron-up.svg'

import StatusChip from './StatusChip'
import DomainChip from './DomainChip'
import LinkStatus from './LinkStatus'

import getStatusLabel from './getStatusLabel'

import { STATUS } from './constants'

import data from './fixture'

// REVIEW receive the whole domain, not just the name?
export const SingleSatelliteMonitoring = (props) => {
  const { satellite } = props

  const domain = data.find((domain) => domain.name === satellite)

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '8px 38px 8px 16px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px',
        alignSelf: 'stretch',
        borderRadius: '0px 0px 8px 8px',
        backgroundColor: 'background.default',
        mb: 0.75,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Typography variant="subtitle1">
            Single-satellite monitoring
          </Typography>
          <Typography variant="h6">{satellite}</Typography>
          <DomainChip
            label={getStatusLabel(domain.status)}
            status={domain.status}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <LinkStatus type="TC" status={domain.tc} />
          <LinkStatus type="TM" status={domain.tm} />
        </Box>
      </Box>
    </Box>
  )
}

SingleSatelliteMonitoring.propTypes = {
  satellite: PropTypes.string.isRequired,
}

const AnimatedCollapseIcon = styled(ChevronUpIcon, {
  shouldForwardProp: (p) => p !== 'open',
})(({ theme, open }) => ({
  transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const FleetMonitoring = (props) => {
  const { addSingleSatelliteView } = props

  const [open, setOpen] = useState(true)

  const summary = data.reduce((acc, domain) => {
    if (!acc[domain.status]) acc[domain.status] = 0
    acc[domain.status]++
    return acc
  }, {})

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        padding: '8px 38px 8px 16px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px',
        alignSelf: 'stretch',
        borderRadius: '0px 0px 8px 8px',
        backgroundColor: 'background.default',
        mb: 0.75,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Typography variant="subtitle1">Fleet monitoring</Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          {Object.values(STATUS).map((status) =>
            summary[status] > 0 ? (
              <StatusChip
                key={status}
                status={status}
                count={summary[status]}
              />
            ) : null,
          )}
        </Box>
      </Box>
      <Collapse in={open}>
        <Box
          sx={{
            display: 'flex',
            padding: '8px 0px',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            gap: '4px',
            alignSelf: 'stretch',
            flexWrap: 'wrap',
          }}
        >
          {data.map((domain) => (
            <DomainChip
              key={domain.name}
              label={domain.name}
              status={domain.status}
              onClick={() => addSingleSatelliteView(domain.name)}
            />
          ))}
        </Box>
      </Collapse>
      <IconButton
        disableRipple
        disableFocusRipple
        color="inherit"
        sx={{ position: 'absolute', right: '4px', bottom: '4px' }}
        onClick={() => setOpen((open) => !open)}
      >
        <AnimatedCollapseIcon width={20} height={20} open={open} />
      </IconButton>
    </Box>
  )
}

FleetMonitoring.propTypes = {
  satellite: PropTypes.string,
  addSingleSatelliteView: PropTypes.func.isRequired,
}

export default FleetMonitoring
