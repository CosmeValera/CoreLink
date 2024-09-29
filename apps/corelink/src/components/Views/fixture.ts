export interface DefineViews {
  name: string;
  items: Item[];
}

interface Item {
  name: string;
  layout: Layout;
}

interface Layout {
  type: 'row';
  weight?: number;
  children: (Row | Tabset)[];
}

interface Row {
  type: 'row';
  weight: number;
  children: (Row | Tabset)[];
}

interface Tabset {
  type: 'tabset';
  weight: number;
  active?: boolean;
  children: Tab[];
}

interface Tab {
  type: 'tab';
  name: string;
  component?: unknown;
}

export interface DefaultView {
  name: string;
  satellite?: undefined;
  layout?: Layout
}

interface PanelNames {
  [key: string]: string;
}

export const PANEL_NAMES: PanelNames = {
  MONICO_TABULAR: 'monico-tabular',
  MONICO_DASHBOARD: 'monico-dashboard',
  MONICO_TIME_SERIES: 'monico-time-series',
  REMOTE_DESKTOP_FULL: 'remote-desktop-full',
  REMOTE_DESKTOP_SINGLE_APP: 'remote-desktop-single-app',
  REMOTE_DESKTOP_ULTRA_WIDE: 'remote-desktop-ultra-wide',
  REACT_MICRO_FRONTEND: 'react-micro-frontend',
  REACT_CUSTOM_COMPONENT: 'react-custom-component',
  REACT_IFRAME: 'react-iframe',
}

export const DEFAULT_VIEW: DefaultView = {
  name: 'Untitled view',
  // NOTE single-satellite views should specify a value here
  satellite: undefined,
  layout: {
    type: 'row',
    weight: 100,
    children: [],
  },
}

export const views: DefineViews[] = [
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
    ],
  },
]

// NOTE for development purposes
export const INITIAL_VIEW = views[0].items[0]
