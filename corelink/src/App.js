import React, { useState } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import 'primeicons/primeicons.css';

import AppHeader from './AppHeader'
import Sidebar from './Sidebar'
import Main from './Main'
import Views from './Views'

import { ViewsProvider } from './Views'
import { LayoutProvider } from './Layout'

import theme from './theme'

import './variables.scss'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <ViewsProvider>
        <LayoutProvider>
          <CssBaseline />
          <AppHeader />
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <Main mt={8} sidebarOpen={sidebarOpen}>
            <Views />
          </Main>
        </LayoutProvider>
      </ViewsProvider>
    </ThemeProvider>
  )
}

export default App
