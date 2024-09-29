const token = 'c30ce96f0fce27580bd3bd3501bc58867b023249b22bc7772f3a92ed7fa8f143';
const headers = {
  'Authorization': token,
  'Content-Type': 'application/json'
};

interface ProcessData {
  status: string;
  name: string;
}

const fetchGetOneDomain = async (domain: string) => {
  // Fetch all processes from one domain
  const res = await fetch(`http://localhost:4040/api/supervisor/${domain}`, { headers });
  if (!res.ok) {
    throw new Error(`Network response was not ok. Status: ${res.status}. StatusText: ${res.statusText}`);
  }
  return await res.json();
}

// export const fetchGetAllDomains = async (domains: string[]) => {
//   const promises: Promise<ProcessData[]>[] = []

//   domains.forEach(domain => promises.push(fetchGetOneDomain(domain)))

//   return await Promise.all(promises)
// }

export const fetchGetAllDomains = async (domains: string[]) => {
  await new Promise((resolve) => setTimeout(resolve, 1)); 
  return [
    {"domain": "316", "status": "RUNNING", "name": "CPDTM"},
    {"domain": "316", "status": "RUNNING", "name": "CPDTC"},
    {"domain": "316", "status": "RUNNING", "name": "CPDEV"},
    {"domain": "316", "status": "RUNNING", "name": "PAFDTM"},
    {"domain": "316", "status": "RUNNING", "name": "PAFDTC"},
    {"domain": "316", "status": "RUNNING", "name": "PAFDEV"},
    {"domain": "316", "status": "RUNNING", "name": "PARTTM"},
    {"domain": "316", "status": "RUNNING", "name": "PARTTC"},
    {"domain": "316", "status": "RUNNING", "name": "PARTEV"},
    {"domain": "316", "status": "RUNNING", "name": "PAMAS"},
    {"domain": "316", "status": "RUNNING", "name": "PAFTTM"},
    {"domain": "316", "status": "RUNNING", "name": "PAFTTC"},
    {"domain": "316", "status": "RUNNING", "name": "PAFTEV"},
    {"domain": "316", "status": "RUNNING", "name": "PAIJTM"},
    {"domain": "316", "status": "RUNNING", "name": "PAIJTC"},
    {"domain": "316", "status": "RUNNING", "name": "PAIJEV"},
    {"domain": "316", "status": "RUNNING", "name": "MISC"},
    {"domain": "316", "status": "RUNNING", "name": "EVAC"},
    {"domain": "316", "status": "RUNNING", "name": "ACTION"},
    {"domain": "316", "status": "RUNNING", "name": "EVSC"},
    {"domain": "316", "status": "RUNNING", "name": "TCO"},
    {"domain": "316", "status": "RUNNING", "name": "NMSG"},
    {"domain": "316", "status": "RUNNING", "name": "MULTI"},
    {"domain": "316", "status": "RUNNING", "name": "VERIF"},
    {"domain": "316", "status": "RUNNING", "name": "RELEAS"},
    {"domain": "316", "status": "RUNNING", "name": "OBQM"},
    {"domain": "316", "status": "RUNNING", "name": "TPF"},
    {"domain": "316", "status": "RUNNING", "name": "PIFRT"},
    {"domain": "316", "status": "RUNNING", "name": "PIFOB"},
    {"domain": "316", "status": "RUNNING", "name": "TPKT"},
    {"domain": "316", "status": "RUNNING", "name": "TCSM"},
    {"domain": "316", "status": "RUNNING", "name": "TMSM"},
    {"domain": "316", "status": "RUNNING", "name": "NAVPRS_UPLK_1"},
    {"domain": "316", "status": "RUNNING", "name": "NAVPRS_STACK_1"},
    {"domain": "316", "status": "RUNNING", "name": "KMFTC_LINK"},
    {"domain": "316", "status": "RUNNING", "name": "MKMF_STACK"},
    {"domain": "316", "status": "RUNNING", "name": "PKMF_STACK"},
    {"domain": "316", "status": "RUNNING", "name": "SKMF_STACK"},
    {"domain": "316", "status": "RUNNING", "name": "STM_SUBSCRIBER"},
    {"domain": "316", "status": "RUNNING", "name": "NAVSAT"},
    {"domain": "316", "status": "RUNNING", "name": "LBANDPAR"},
    {"domain": "316", "status": "RUNNING", "name": "MMSATSTATRD"},
    {"domain": "316", "status": "RUNNING", "name": "MMSATSTATHD"},
    {"domain": "316", "status": "RUNNING", "name": "TCHML"},
    {"domain": "316", "status": "RUNNING", "name": "EVLML"},
    {"domain": "316", "status": "RUNNING", "name": "OBEML"},
    {"domain": "316", "status": "RUNNING", "name": "TPHML"},
    {"domain": "316", "status": "RUNNING", "name": "SMON_SHARED_LIVE"},
    {"domain": "316", "status": "RUNNING", "name": "SMON_SHARED_AUTO"},
    {"domain": "316", "status": "RUNNING", "name": "OOLS_SHARED_LIVE"},
    {"domain": "316", "status": "RUNNING", "name": "BEHVNRT"},
    {"domain": "316", "status": "RUNNING", "name": "BEHVNOB"},
    {"domain": "316", "status": "RUNNING", "name": "SPPGNRT"},
    {"domain": "316", "status": "RUNNING", "name": "SPPGNOB"},
    {"domain": "316", "status": "RUNNING", "name": "SMON_NR_FDF"},
    {"domain": "316", "status": "RUNNING", "name": "AUTS"},
    {"domain": "316", "status": "RUNNING", "name": "SMFSRH"},
    {"domain": "316", "status": "STOPPED", "name": "PAMAP"},
    {"domain": "316", "status": "STOPPED", "name": "PAMAG"},
    {"domain": "316", "status": "STOPPED", "name": "CMDPM_AD_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "MSTKV_AD_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "CMDPM_BD_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "MSTKV_BD_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "TRPLS_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "TPHMR_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "TPHMR_SMF_2"},
    {"domain": "316", "status": "STOPPED", "name": "TPHMR_SMF_3"},
    {"domain": "316", "status": "STOPPED", "name": "TCHMR_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "TCHMR_SMF_2"},
    {"domain": "316", "status": "STOPPED", "name": "TCHMR_SMF_3"},
    {"domain": "316", "status": "STOPPED", "name": "EVLMR_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "EVLMR_SMF_2"},
    {"domain": "316", "status": "STOPPED", "name": "EVLMR_SMF_3"},
    {"domain": "316", "status": "STOPPED", "name": "OBEMR_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "OBEMR_SMF_2"},
    {"domain": "316", "status": "STOPPED", "name": "OBEMR_SMF_3"},
    {"domain": "316", "status": "STOPPED", "name": "OOLS_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "OOLS_SMF_2"},
    {"domain": "316", "status": "STOPPED", "name": "OOLS_SMF_3"},
    {"domain": "316", "status": "STOPPED", "name": "SMON_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "SMON_SMF_2"},
    {"domain": "316", "status": "STOPPED", "name": "SMON_SMF_3"},
    {"domain": "316", "status": "STOPPED", "name": "TMCC_SMF_1"},
    {"domain": "316", "status": "STOPPED", "name": "TMCC_SMF_2"},
    {"domain": "316", "status": "STOPPED", "name": "TMCC_SMF_3"},
    {"domain": "316", "status": "STOPPED", "name": "EXIF_TMI"},
    {"domain": "316", "status": "STOPPED", "name": "EXIF_EVI"},
    {"domain": "316", "status": "STOPPED", "name": "TCTmodel"},
    {"domain": "316", "status": "STOPPED", "name": "TRPLS"},
    {"domain": "316", "status": "STOPPED", "name": "TCTview"},
    {"domain": "316", "status": "STOPPED", "name": "TRPLC"},
    {"domain": "316", "status": "STOPPED", "name": "TMPI"}
  ];
}

export const fetchPostAction = async (domain: string, process: string, action: string) => {
  const actionData = {
      'action': action
  }

  return fetch(`http://localhost:4040/api/supervisor/${domain}/prime/${process}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(actionData)
    })
    .then((res) => {
        console.log("first then in fetchPostAction. ", res);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then((res) => {
        console.log("second then in fetchPostAction. ", res);
        return true;
    })
    .catch((err) => {
        console.log("catch error fetchPostAction. ", err);
        throw new Error('Network response was not ok');
    });
}