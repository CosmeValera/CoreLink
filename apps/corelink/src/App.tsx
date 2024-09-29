import React, { useState } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import AppHeader from './components/AppHeader'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Views from './components/Views/View'
import ViewsProvider from './components/Views/ViewsProvider'
import LayoutProvider from './components/Layout/LayoutProvider'

import theme from './theme'
import { PrimeReactProvider } from 'primereact/api'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'

import './variables.scss'
import './hide-overlay.scss'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <PrimeReactProvider value={{ ripple: true }}>
        <CssBaseline />
        <ViewsProvider>
          <LayoutProvider>
            <CssBaseline />
            <AppHeader />
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <Main
              mt={8}
              sidebarOpen={sidebarOpen}
              sx={{ position: 'relative' }}
            >
              <Views />
            </Main>
          </LayoutProvider>
        </ViewsProvider>
      </PrimeReactProvider>
    </ThemeProvider>
  )
}
export default App
