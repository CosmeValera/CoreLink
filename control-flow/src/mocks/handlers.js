import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://localhost:4040/api/mif/316', (resolver) => {
    return HttpResponse.json(responseSatellite316())
  }),

  http.post('http://localhost:4040/api/mif/:domain', async (resolver) => {
    const res = resolver
    const authorization = res.request.headers.get('Authorization')
    const authToken = 'c30ce96f0fce27580bd3bd3501bc58867b023249b22bc7772f3a92ed7fa8f143'

    if (!authorization) {
      return HttpResponse.json({ error: 'Authorization header not present. Access denied.' })
    } else if (authorization !== authToken) {
      return HttpResponse.json({ error: 'Incorrect token. Access denied.' })
    }

    const requestBody = await res.request.json()
    return HttpResponse.json(
      {
        content: requestBody
      }
    )
  })

]

const responseSatellite316 = () => ([
  {
    key: 'OPERATIONAL_SERVER_FAMILY',
    value: 'PRIME',
    readOnly: false
  },
  {
    key: 'ANOMALY_FLAG',
    value: '0',
    readOnly: false
  },
  {
    key: 'CMD_TM_LINK',
    value: 'NO TM FLOW',
    readOnly: false
  },
  {
    key: 'CMD_TC_LINK',
    value: 'DISCONNECTED',
    readOnly: false
  },
  {
    key: 'CMD_RESPONSIBILITY',
    value: 'NOT RESPONSIBLE',
    readOnly: false
  },
  {
    key: 'OOL_ACK_TIME',
    value: '1970-01-01T00:00:00.000',
    readOnly: false
  },
  {
    key: 'NEW_STP_FLAG',
    value: 'FALSE',
    readOnly: false
  },
  {
    key: 'NCTRS_ID',
    value: 'NONE',
    readOnly: false
  },
  {
    key: 'PAST_RAPID_SATMAN_FILE_CREATION_TIMEOUT_SECS',
    value: '300',
    readOnly: false
  },
  {
    key: 'PAST_RAPID_LOCAL_FILE_CREATION_TIMEOUT_SECS',
    value: '20',
    readOnly: false
  },
  {
    key: 'PAST_RAPID_IOT_FILE_CREATION_TIMEOUT_SECS',
    value: '20',
    readOnly: false
  },
  {
    key: 'PAST_RAPID_INTERSITE_FILE_CREATION_TIMEOUT_SECS',
    value: '20',
    readOnly: false
  },
  {
    key: 'PARC_SYNCH_ENABLED',
    value: 'TRUE',
    readOnly: false
  },
  {
    key: 'PARC_SATMAN_ENABLED',
    value: 'FALSE',
    readOnly: false
  },
  {
    key: 'PARC_LOCAL_ENABLED',
    value: 'TRUE',
    readOnly: false
  },
  {
    key: 'PARC_IOT_ENABLED',
    value: 'FALSE',
    readOnly: false
  },
  {
    key: 'STM_PROCESSING',
    value: 'DISABLED',
    readOnly: false
  },
  {
    key: 'STM_SKMF_PROCESSING',
    value: 'DISABLED',
    readOnly: false
  },
  {
    key: 'STM_MKMF_PROCESSING',
    value: 'DISABLED',
    readOnly: false
  },
  {
    key: 'STM_PKMF_PROCESSING',
    value: 'DISABLED',
    readOnly: false
  },
  {
    key: 'STM_MKMF_LAST_PACKET_TIME',
    value: '1970.001.01.00.00.000',
    readOnly: false
  },
  {
    key: 'STM_PKMF_LAST_PACKET_TIME',
    value: '1970.001.01.00.00.000',
    readOnly: false
  },
  {
    key: 'STM_SKMF_LAST_PACKET_TIME',
    value: '1970.001.01.00.00.000',
    readOnly: false
  },
  {
    key: 'SDHS_A_TTCF',
    value: '1',
    readOnly: false
  },
  {
    key: 'SDHS_B_TTCF',
    value: '2',
    readOnly: false
  }
])
