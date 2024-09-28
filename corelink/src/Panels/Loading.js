import React from 'react'
import { CircularProgress, Box } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        height: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
