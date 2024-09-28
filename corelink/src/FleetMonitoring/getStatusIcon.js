import { ReactComponent as CriticalIcon } from './icons/status-critical.svg'
import { ReactComponent as SeriousIcon } from './icons/status-serious.svg'
import { ReactComponent as CautionIcon } from './icons/status-caution.svg'
import { ReactComponent as NormalIcon } from './icons/status-normal.svg'
import { ReactComponent as StandbyIcon } from './icons/status-standby.svg'
import { ReactComponent as OffIcon } from './icons/status-off.svg'

import { STATUS } from './constants'

const getStatusIcon = (status) => {
  switch (status) {
    case STATUS.CRITICAL:
      return CriticalIcon
    case STATUS.SERIOUS:
      return SeriousIcon
    case STATUS.CAUTION:
      return CautionIcon
    case STATUS.NORMAL:
      return NormalIcon
    case STATUS.STANDBY:
      return StandbyIcon
    case STATUS.OFF:
    default:
      return OffIcon
  }
}

export default getStatusIcon
