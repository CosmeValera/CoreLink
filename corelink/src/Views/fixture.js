import { PANEL_NAMES } from '../Panels/index.js'

import satelliteData from '../FleetMonitoring/fixture.js'

// FIXME the way satellites are handled in the application is pretty hacky and
// error prone, take some time to find a better approach
export const SATELLITES = satelliteData.map((satellite) => satellite.name)

export const DEFAULT_VIEW = {
  name: 'Untitled view',
  // NOTE single-satellite views should specify a value here
  satellite: undefined,
  layout: {
    type: 'row',
    weight: 100,
    children: [],
  },
}

export const views = [
  {
    name: 'Default views',
    items: [
      {
        name: 'Default M&C View',
        layout: {
          type: 'row',
          weight: 100,
          children: [
            {
              type: 'row',
              weight: 100,
              children: [
                {
                  type: 'row',
                  weight: 50,
                  children: [
                    {
                      type: 'tabset',
                      weight: 60,
                      active: true,
                      children: [
                        {
                          type: 'tab',
                          name: 'SCPF - Gantt',
                        },
                      ],
                    },
                    {
                      type: 'tabset',
                      weight: 40,
                      children: [
                        {
                          type: 'tab',
                          name: 'SCCF - TC History',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'row',
                  weight: 50,
                  children: [
                    {
                      type: 'tabset',
                      weight: 50,
                      children: [
                        {
                          type: 'tab',
                          name: 'FDF - AFINTP',
                        },
                        {
                          type: 'tab',
                          name: 'FDF - CALIB',
                        },
                        {
                          type: 'tab',
                          name: 'FDF - EOP',
                        },
                      ],
                    },
                    {
                      type: 'tabset',
                      weight: 50,
                      children: [
                        {
                          type: 'tab',
                          name: 'SCCF - TM Packets',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        name: 'Sysadmin View',
        layout: {
          type: 'row',
          children: [
            {
              type: 'tabset',
              weight: 70,
              children: [
                {
                  type: 'tab',
                  name: 'Full Desktop',
                  component: PANEL_NAMES.REMOTE_DESKTOP_FULL,
                },
              ],
              active: true,
            },
            {
              type: 'row',
              weight: 30,
              children: [
                {
                  type: 'tabset',
                  weight: 50,
                  children: [
                    {
                      type: 'tab',
                      name: 'Tabular Data',
                      component: PANEL_NAMES.MONICO_TABULAR,
                    },
                  ],
                },
                {
                  type: 'tabset',
                  weight: 50,
                  children: [
                    {
                      type: 'tab',
                      name: 'Time Series',
                      component: PANEL_NAMES.MONICO_TIME_SERIES,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        name: 'Procurement View',
        layout: {
          type: 'row',
          children: [
            {
              type: 'tabset',
              weight: 80,
              children: [
                {
                  type: 'tab',
                  name: 'Dashboard',
                  component: 'monico-dashboard',
                },
              ],
            },
            {
              type: 'row',
              weight: 20,
              children: [
                {
                  type: 'tabset',
                  weight: 75,
                  children: [
                    {
                      type: 'tab',
                      name: 'Single App',
                      component: 'remote-desktop-single-app',
                    },
                  ],
                },
                {
                  type: 'tabset',
                  weight: 25,
                  children: [
                    {
                      type: 'tab',
                      name: 'AFINTP',
                    },
                  ],
                  active: true,
                },
              ],
            },
          ],
        },
      },
      {
        name: 'MONICO',
        layout: {
          type: 'row',
          weight: 100,
          children: [
            {
              type: 'row',
              weight: 100,
              children: [
                {
                  type: 'tabset',
                  weight: 100,
                  active: true,
                  children: [
                    {
                      type: 'tab',
                      name: 'MONICO - Dashboard',
                      component: PANEL_NAMES.MONICO_DASHBOARD,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        name: 'SCCF - System Supervisor',
        layout: {
          type: 'row',
          weight: 100,
          children: [
            {
              type: 'row',
              weight: 100,
              children: [
                {
                  type: 'tabset',
                  weight: 100,
                  active: true,
                  children: [
                    {
                      type: 'tab',
                      name: 'SCCF - System Supervisor - Dashboard',
                      component: PANEL_NAMES.REACT_SUPERVISOR_MICRO_FRONTEND,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
]

// NOTE for development purposes
export const INITIAL_VIEW = views[0].items[0]
