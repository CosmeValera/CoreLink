import React from 'react'
import PropTypes from 'prop-types'
import { Box, Tooltip, Typography } from '@mui/material'

import { ReactComponent as OpenInNewIcon } from '../icons/launch.svg'

import getStatusIcon from './getStatusIcon'
import getStatusForegroundColor from './getStatusForegroundColor'

import { STATUS } from './constants'

const DomainChip = (props) => {
  const { status, onClick, label } = props

  const Icon = getStatusIcon(status)

  // REVIEW maybe we should add the tooltip in the parent component, but we
  // would need to `forwardRef`
  const tooltip = onClick ? 'Open as a new tab' : null

  return (
    <Tooltip title={tooltip} placement="bottom" arrow describeChild>
      <Box
        sx={[
          {
            display: 'flex',
            // width: '54px',
            height: '28px',
            minWidth: '50px',
            padding: '4px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            borderRadius: 2,
            color: getStatusForegroundColor(status),
            backgroundColor: `${status}.main`,
          },
          onClick && {
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: `${status}.dark`,
              '& .hover-overlay': { visibility: 'visible' },
            },
          },
        ]}
        onClick={onClick}
      >
        <Box
          className="hover-overlay"
          sx={{
            visibility: 'hidden',
            position: 'absolute',
            display: 'flex',
            width: '54px',
            height: '28px',
            padding: '6px 0px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            backgroundColor: `${status}.dark`,
          }}
        >
          <OpenInNewIcon width={16} height={16} />
        </Box>
        <Icon width={16} height={16} />
        {label ? <Typography variant="monospace2">{label}</Typography> : null}
      </Box>
    </Tooltip>
  )
}

DomainChip.propTypes = {
  label: PropTypes.string,
  status: PropTypes.oneOf(Object.values(STATUS)).isRequired,
  onClick: PropTypes.func,
}

export default DomainChip
