// NOTE auxiliary typeface
const monospace = [
  '"JetBrains Mono"',
  '"Lucida Console"',
  'Courier',
  'monospace',
].join(',')

const typography = {
  fontFamily: ['Readex Pro', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  fontSize: 15, // REVIEW not sure this is ok, check figma
  monospace1: {
    fontFamily: monospace,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '150%',
    letterSpacing: 0.15,
  },
  monospace2: {
    fontFamily: monospace,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '143%',
    letterSpacing: 0.15,
  },
  h1: {
    fontSize: 60,
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: '112.03px',
    letterSpacing: -1.5,
  },
  h2: {
    fontSize: 48,
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: '120%',
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '116.7%',
  },
  h4: {
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '123.5%',
    letterSpacing: 0.25,
  },
  h5: {
    fontFamily: 'Readex Pro',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '133.4%',
  },
  h6: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '160%',
    letterSpacing: 0.15,
    color: 'var(--gmv-text-gray)',
  },
  subtitle1: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '175%',
    letterSpacing: 0.15,
    color: 'var(--gmv-text-white)',
  },
  subtitle2: {
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '157%',
    letterSpacing: 0.1,
    color: 'var(--gmv-text-white)',
  },
  body1: {
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '150%',
    letterSpacing: 0.15,
  },
  body2: {
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '143%',
    letterSpacing: 0.15,
    cursor: 'pointer',
  },
  // NOTE 🆕 custom variant
  buttonLarge: {
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '26px',
    letterSpacing: 0.46,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  // NOTE 🆕 custom variant
  buttonSmall: {
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: 0.46,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '166%',
    letterSpacing: 0.4,
  },
  overline: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '266%',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  // NOTE 🆕 custom variants (from here on)
  avatarLetter: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0.14,
  },
  inputLabel: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '12px',
    letterSpacing: 0.15,
  },
  helperText: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0.4,
  },
  inputText: {
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: 0.15,
  },
  tooltip: {
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '14px',
  },
}

export default typography
