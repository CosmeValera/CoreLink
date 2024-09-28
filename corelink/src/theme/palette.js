// IDEA (re-)use css variables here
const palette = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
    clear: '#FFFFFF0',
  },
  primary: {
    main: '#860015',
    light: '#5D96E2',
    dark: '#252525',
  },
  secondary: {
    main: '#1A8EA1',
    light: '#4DCDC6',
    dark: '#136977',
  },
  grey: {
    50: '#F9FAFA',
    100: '#F4F5F6',
    200: '#ECEEEF',
    300: '#DEE2E3',
    400: '#B7C0C2',
    500: '#96A2A6',
    600: '#6C7A7F',
    700: '#596569',
    800: '#3D4548',
    900: '#001026',
    A100: '#D3D8D9',
    A200: '#A4AEB2',
    A400: '#596569',
    A700: '#2D3334',
  },
  critical: {
    main: '#DF0024',
    light: '#F88078',
    dark: '#BA1408',
  },
  serious: {
    main: '#ED6C02',
    light: '#FFB547',
    dark: '#BB5A00',
  },
  caution: {
    main: '#F9B235',
    light: '#FDF082',
    dark: '#B4A203',
    contrastText: '#000000CC',
  },
  normal: {
    main: '#21CB38',
    light: '#7BC67E',
    dark: '#3B873E',
    contrastText: '#000000CC',
  },
  standby: {
    main: '#2196F3',
    light: '#64B6F7',
    dark: '#0B79D0',
  },
  off: {
    main: '#717171',
    light: '#D6D9DC',
    dark: '#6A7177',
  },
  // REVIEW add these colors after creating the theme, so we can reference
  // their bases
  foreground: {
    primary: '#001026DE',
    contrastPrimary: '#F6F6F6',
    secondary: '#00102699',
    contrastSecondary: '#CCCCCC',
    disabled: '#00102661',
    contrastDisabled: '#FFFFFF61',
  },
  background: {
    header: '#252525',
    barDark: '#191919',
    barMedium: '#373737',
    default: '#434343',
    light: '#FFFFFF7a',
    paper: '#FFFFFF',
  },
  action: {
    active: '#0054B647',
    contrastActive: '#FFFFFF7a',
    hover: '#0054B614',
    contrastHover: '#FFFFFF14',
    selected: '#0054B629',
    contrastSelected: '#FFFFFF29',
    disabled: '#00000042',
    contrastDisabled: '#FFFFFF42',
  },
  other: {
    divider: '#0000001F',
    outlinedBorder: '#0000003B',
    backdropOverlay: '#00000080',
    filledInputBackground: '#00000017',
    standardInputLine: '#0000006B',
    snackbar: '#2D3334',
  },
}

export default palette
