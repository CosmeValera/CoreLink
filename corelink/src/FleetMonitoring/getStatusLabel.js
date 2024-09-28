import { STATUS } from './constants'

const getStatusLabel = (status) => {
  switch (status) {
    case STATUS.CRITICAL:
      return 'Error'
    case STATUS.SERIOUS:
      return '???'
    case STATUS.CAUTION:
      return 'Warning'
    case STATUS.NORMAL:
      return 'OK'
    case STATUS.STANDBY:
      return '???'
    case STATUS.OFF:
    default:
      return 'No Connection'
  }
}

export default getStatusLabel
