import React from 'react'
import { styled, AppBar, Box, Typography, IconButton } from '@mui/material'

import { ReactComponent as TimeIcon } from '../icons/time.svg'
import { ReactComponent as MenuIcon } from '../icons/switcher.svg'

const USERNAME = 'GCS Operator'
const ROLE = 'SPA-ENG'

const Divider = styled(Box)(({ theme }) => ({
  width: '1px',
  height: 24,
  backgroundColor: theme.palette.foreground.contrastPrimary,
  opacity: 0.38,
}))

const TimeIconStyled = styled(TimeIcon)(({ theme }) => ({
  color: theme.palette.foreground.contrastSecondary,
}))

const AppHeader = () => (
  <AppBar
    elevation={0}
    sx={{
      display: 'flex',
      padding: '8px 12px',
      alignItems: 'center',
      alignSelf: 'stretch',
      backgroundColor: 'background.header',
      cursor: 'default',
    }}
  >
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '16px',
        flex: '1 0 0',
        color: 'foreground.contrastPrimary',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <TimeIconStyled width={16} height={16} />
        <Typography variant="subtitle2">{new Date().toISOString().slice(0, -1)}</Typography>
      </Box>
      <Divider />
      {/* REVIEW this should be a button */}
      <Typography variant="buttonSmall" sx={{ p: '4px 5px' }}>
        On-call info
      </Typography>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="subtitle2">{USERNAME}</Typography>
        <Typography variant="caption">{ROLE}</Typography>
      </Box>
      <Divider />
      <IconButton
        disableRipple
        disableFocusRipple
        color="inherit"
        sx={{ p: 1.5 }}
      >
        <MenuIcon width={24} height={24} />
      </IconButton>
    </Box>
  </AppBar>
)

export default AppHeader
