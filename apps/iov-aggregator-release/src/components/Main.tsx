import { styled, Box } from '@mui/material'
import { SIDEBAR_WIDTH } from './Sidebar'

interface MainProps {
  sidebarOpen: boolean;
}

const Main = styled(Box, { shouldForwardProp: (p) => p !== 'sidebarOpen' })<MainProps>(
  ({ theme, sidebarOpen }) => ({
    backgroundColor: theme.palette.background.default,
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

export default Main
