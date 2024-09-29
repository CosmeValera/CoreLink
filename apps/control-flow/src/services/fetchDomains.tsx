import PORT from '../helpers/ports';
import token from '../helpers/token';

interface ProcessData {
  key: string;
  value: string;
  readOnly: boolean;
}

const headers = {
  'Authorization': token 
};

// fetch(`${PORT}/${domain}/${server}`, {headers})
const fetchGetOneDomain = async (domain: string) => {
  // const res = await fetch(`http://localhost:4040/api/tcSpaconMissionInterface/${domain}`, {headers})
  // if (!res.ok) {
  //   throw new Error(`Network response was not ok. Status: ${res.status}. StatusText: ${res.statusText}`);
  // }
  // return await res.json();
  return [
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
  ]
}
  
export const fetchGetAllDomains = async (domains: string[]): Promise<ProcessData[][]> => {
  const promises: Promise<ProcessData[]>[] = domains.map(domain => fetchGetOneDomain(domain));
  return await Promise.all(promises);
};
      