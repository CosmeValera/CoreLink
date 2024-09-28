import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

import getStatusIcon from './getStatusIcon'
import getStatusLabel from './getStatusLabel'

import { STATUS } from './constants'

const getStatusColor = (status) => {
  switch (status) {
    case STATUS.CRITICAL:
      return 'critical.main'
    case STATUS.SERIOUS:
      return 'serious.main' // REVIEW
    case STATUS.CAUTION:
      return 'caution.dark'
    case STATUS.NORMAL:
      return 'normal.main'
    case STATUS.STANDBY:
      return 'standby.main' // REVIEW
    case STATUS.OFF:
    default:
      return 'off.main'
  }
}

const StatusChip = (props) => {
  const { status, count } = props

  const Icon = getStatusIcon(status)

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '4px 0px',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: getStatusColor(status),
        }}
      >
        <Icon width={16} height={16} />
        <Typography variant="subtitle2">{getStatusLabel(status)}</Typography>
      </Box>
      <Typography variant="subtitle2">{count}</Typography>
    </Box>
  )
}

StatusChip.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUS)).isRequired,
  count: PropTypes.number.isRequired,
}

export default StatusChip
