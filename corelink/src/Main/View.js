import { styled, Box } from '@mui/material'

import { SIDEBAR_WIDTH } from '../Sidebar'

const Main = styled(Box, { shouldForwardProp: (p) => p !== 'sidebarOpen' })(
  ({ theme, sidebarOpen }) => ({
    backgroundColor: theme.palette.background.barMedium,
    padding: '16px 16px 24px 16px',

    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: SIDEBAR_WIDTH.COLLAPSED,
    ...(sidebarOpen && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: SIDEBAR_WIDTH.EXPANDED,
    }),
  }),
)

Main.defaultProps = {
  component: 'main',
}

export default Main
