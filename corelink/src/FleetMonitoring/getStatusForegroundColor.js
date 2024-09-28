import { STATUS } from './constants'

const getStatusForegroundColor = (status) => {
  switch (status) {
    case STATUS.NORMAL:
      return 'normal.contrastText'
    case STATUS.CAUTION:
      return 'caution.contrastText'
    case STATUS.CRITICAL:
    case STATUS.SERIOUS: // REVIEW
    case STATUS.STANDBY: // REVIEW
    case STATUS.OFF:
    default:
      return 'foreground.contrastPrimary'
  }
}

export default getStatusForegroundColor
