import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

import { ReactComponent as CriticalIcon } from './icons/status-critical.svg'
import { ReactComponent as NormalIcon } from './icons/status-normal.svg'

import { LINK_STATUS } from './constants'

const getLinkStatusIcon = (status) => {
  switch (status) {
    case LINK_STATUS.UP:
      return NormalIcon
    case LINK_STATUS.DOWN:
    default:
      return CriticalIcon
  }
}

const getLinkStatusColor = (status) => {
  switch (status) {
    case LINK_STATUS.UP:
      return 'normal.main'
    case LINK_STATUS.DOWN:
    default:
      return 'critical.main'
  }
}

const getLinkStatusLabel = (status) => {
  switch (status) {
    case LINK_STATUS.UP:
      return 'Connected'
    case LINK_STATUS.DOWN:
    default:
      return 'Not connected'
  }
}

const LinkStatus = (props) => {
  const { type, status } = props

  const Icon = getLinkStatusIcon(status)

  return (
    <Box
      sx={{ display: 'flex', p: '4px 0px', alignItems: 'center', gap: '4px' }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: getLinkStatusColor(status),
        }}
      >
        <Icon width={16} height={16} />
        <Typography variant="subtitle2">{type}:</Typography>
      </Box>
      <Typography variant="subtitle2">{getLinkStatusLabel(status)}</Typography>
    </Box>
  )
}

LinkStatus.propTypes = {
  type: PropTypes.oneOf(['TC', 'TM']).isRequired,
  status: PropTypes.oneOf(Object.values(LINK_STATUS)).isRequired,
}

export default LinkStatus
