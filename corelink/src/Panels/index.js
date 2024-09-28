import MonicoDashboard from './MonicoDashboard'
import MonicoTabular from './MonicoTabularData'
import MonicoTimeSeries from './MonicoTimeSeries'
import RemoteDesktopFull from './RemoteDesktopFull'
import RemoteDesktopSingleApp from './RemoteDesktopSingleApp'
import RemoteDesktopUltraWide from './RemoteDesktopUltraWide'
import ReactCustomComponent from './ReactCustomComponent'
import ReactTcSpaconMissionInterface from './ReactMicroFrontends/TcSpaconMissionInterface'
import ReactSupervisorMicroFrontend from './ReactMicroFrontends/SystemSupervisor'
import ReactIframe from './ReactIframe'

// REVIEW can we get rid of this export once again? maybe exposing some internal
// panel data structures
export const PANEL_NAMES = {
  MONICO_TABULAR: 'monico-tabular',
  MONICO_DASHBOARD: 'monico-dashboard',
  MONICO_TIME_SERIES: 'monico-time-series',
  REMOTE_DESKTOP_FULL: 'remote-desktop-full',
  REMOTE_DESKTOP_SINGLE_APP: 'remote-desktop-single-app',
  REMOTE_DESKTOP_ULTRA_WIDE: 'remote-desktop-ultra-wide',
  REACT_TC_SPACON_MISSION_INTERFACE: 'react-tc-spacon-mission-interface',
  REACT_SUPERVISOR_MICRO_FRONTEND: 'react-supervisor-micro-frontend',
  REACT_CUSTOM_COMPONENT: 'react-custom-component',
  REACT_IFRAME: 'react-iframe',
}

export const getPanelComponent = (panel) => {
  switch (panel) {
    case PANEL_NAMES.MONICO_TABULAR:
      return MonicoTabular
    case PANEL_NAMES.MONICO_DASHBOARD:
      return MonicoDashboard
    case PANEL_NAMES.MONICO_TIME_SERIES:
      return MonicoTimeSeries
    case PANEL_NAMES.REMOTE_DESKTOP_FULL:
      return RemoteDesktopFull
    case PANEL_NAMES.REMOTE_DESKTOP_SINGLE_APP:
      return RemoteDesktopSingleApp
    case PANEL_NAMES.REMOTE_DESKTOP_ULTRA_WIDE:
      return RemoteDesktopUltraWide
    case PANEL_NAMES.REACT_CUSTOM_COMPONENT:
      return ReactCustomComponent
    case PANEL_NAMES.REACT_TC_SPACON_MISSION_INTERFACE:
      return ReactTcSpaconMissionInterface
    case PANEL_NAMES.REACT_SUPERVISOR_MICRO_FRONTEND:
      return ReactSupervisorMicroFrontend
    case PANEL_NAMES.REACT_IFRAME:
      return ReactIframe
    default:
      throw new Error(`Unknown panel ${panel}`)
  }
}

export const panels = [
  {
    name: 'MONICO',
    items: [
      { name: 'Tabular Data', component: PANEL_NAMES.MONICO_TABULAR },
      { name: 'Time Series', component: PANEL_NAMES.MONICO_TIME_SERIES },
      { name: 'Dashboard', component: PANEL_NAMES.MONICO_DASHBOARD },
    ],
  },
  {
    name: 'FDF',
    items: [
      { name: 'AFINTP' },
      { name: 'BAHN' },
      { name: 'EOP' },
      { name: 'CLERIGO' },
    ],
  },
  {
    name: 'SCCF',
    items: [
      { name: 'Status' },
      { name: 'OOL' },
      { name: 'TM Displays' },
      { name: 'TC History' },
      {
        name: 'TC Spacon MIF',
        component: PANEL_NAMES.REACT_TC_SPACON_MISSION_INTERFACE,
      },
      {
        name: 'SCCF - System Supervisor',
        component: PANEL_NAMES.REACT_SUPERVISOR_MICRO_FRONTEND,
      },
    ],
  },
  { name: 'SCPF', items: [{ name: '⚠️ TBD' }] },
  {
    name: 'REMOTE DESKTOP',
    items: [
      {
        name: 'Full Desktop',
        component: PANEL_NAMES.REMOTE_DESKTOP_FULL,
      },
      {
        name: 'Single App',
        component: PANEL_NAMES.REMOTE_DESKTOP_SINGLE_APP,
      },
      {
        name: 'Ultra Wide',
        component: PANEL_NAMES.REMOTE_DESKTOP_ULTRA_WIDE,
      },
    ],
  },
  {
    name: 'REACT',
    items: [
      {
        name: 'Custom component',
        component: PANEL_NAMES.REACT_CUSTOM_COMPONENT,
      },
      {
        name: 'Iframe',
        component: PANEL_NAMES.REACT_IFRAME,
      },
    ],
  },
]
