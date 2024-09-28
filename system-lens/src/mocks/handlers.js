import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('http://localhost:4040/api/supervisor/316', (resolver) => {
        return HttpResponse.json(responseSatellite316())
    }),
    http.get('http://localhost:4040/api/supervisor/316/prime/CPDEV', (resolver) => {
        return HttpResponse.json(responseSatellite316AndProcessCPDEV())
    }),

    http.post('http://localhost:4040/api/supervisor/:domain/prime/:process', async(resolver) => {
        const res = resolver;
        const authorization = res.request.headers.get('Authorization');
        const authToken = 'c30ce96f0fce27580bd3bd3501bc58867b023249b22bc7772f3a92ed7fa8f143';

        if (!authorization) {
            return HttpResponse.json({ error: 'Authorization header not present. Access denied.' });
        } else if (authorization !== authToken) {
            return HttpResponse.json({ error: 'Incorrect token. Access denied.' });
        }

        const requestBody = await res.request.json();
        return HttpResponse.json(
            {
                content: requestBody,
            },
        );
    })
]

const responseSatellite316AndProcessCPDEV = () => ({
    "status": "RUNNING",
    "name": "CPDEV",
    "id": 5,
    "connections": [
        {"name": "4/PRIME/EVENTS", "connected": false},
        {"name": "4/PRIME/ParcEvReceiver", "connected": true}
    ]
});

const responseSatellite316 = () => ([
    {"status": "RUNNING", "name": "CPDTM"},
    {"status": "RUNNING", "name": "CPDTC"},
    {"status": "RUNNING", "name": "CPDEV"},
    {"status": "RUNNING", "name": "PAFDTM"},
    {"status": "RUNNING", "name": "PAFDTC"},
    {"status": "RUNNING", "name": "PAFDEV"},
    {"status": "RUNNING", "name": "PARTTM"},
    {"status": "RUNNING", "name": "PARTTC"},
    {"status": "RUNNING", "name": "PARTEV"},
    {"status": "RUNNING", "name": "PAMAS"},
    {"status": "RUNNING", "name": "PAFTTM"},
    {"status": "RUNNING", "name": "PAFTTC"},
    {"status": "RUNNING", "name": "PAFTEV"},
    {"status": "RUNNING", "name": "PAIJTM"},
    {"status": "RUNNING", "name": "PAIJTC"},
    {"status": "RUNNING", "name": "PAIJEV"},
    {"status": "RUNNING", "name": "MISC"},
    {"status": "RUNNING", "name": "EVAC"},
    {"status": "RUNNING", "name": "ACTION"},
    {"status": "RUNNING", "name": "EVSC"},
    {"status": "RUNNING", "name": "TCO"},
    {"status": "RUNNING", "name": "NMSG"},
    {"status": "RUNNING", "name": "MULTI"},
    {"status": "RUNNING", "name": "VERIF"},
    {"status": "RUNNING", "name": "RELEAS"},
    {"status": "RUNNING", "name": "OBQM"},
    {"status": "RUNNING", "name": "TPF"},
    {"status": "RUNNING", "name": "PIFRT"},
    {"status": "RUNNING", "name": "PIFOB"},
    {"status": "RUNNING", "name": "TPKT"},
    {"status": "RUNNING", "name": "TCSM"},
    {"status": "RUNNING", "name": "TMSM"},
    {"status": "RUNNING", "name": "NAVPRS_UPLK_1"},
    {"status": "RUNNING", "name": "NAVPRS_STACK_1"},
    {"status": "RUNNING", "name": "KMFTC_LINK"},
    {"status": "RUNNING", "name": "MKMF_STACK"},
    {"status": "RUNNING", "name": "PKMF_STACK"},
    {"status": "RUNNING", "name": "SKMF_STACK"},
    {"status": "RUNNING", "name": "STM_SUBSCRIBER"},
    {"status": "RUNNING", "name": "NAVSAT"},
    {"status": "RUNNING", "name": "LBANDPAR"},
    {"status": "RUNNING", "name": "MMSATSTATRD"},
    {"status": "RUNNING", "name": "MMSATSTATHD"},
    {"status": "RUNNING", "name": "TCHML"},
    {"status": "RUNNING", "name": "EVLML"},
    {"status": "RUNNING", "name": "OBEML"},
    {"status": "RUNNING", "name": "TPHML"},
    {"status": "RUNNING", "name": "SMON_SHARED_LIVE"},
    {"status": "RUNNING", "name": "SMON_SHARED_AUTO"},
    {"status": "RUNNING", "name": "OOLS_SHARED_LIVE"},
    {"status": "RUNNING", "name": "BEHVNRT"},
    {"status": "RUNNING", "name": "BEHVNOB"},
    {"status": "RUNNING", "name": "SPPGNRT"},
    {"status": "RUNNING", "name": "SPPGNOB"},
    {"status": "RUNNING", "name": "SMON_NR_FDF"},
    {"status": "RUNNING", "name": "AUTS"},
    {"status": "RUNNING", "name": "SMFSRH"},
    {"status": "STOPPED", "name": "PAMAP"},
    {"status": "STOPPED", "name": "PAMAG"},
    {"status": "STOPPED", "name": "CMDPM_AD_SMF_1"},
    {"status": "STOPPED", "name": "MSTKV_AD_SMF_1"},
    {"status": "STOPPED", "name": "CMDPM_BD_SMF_1"},
    {"status": "STOPPED", "name": "MSTKV_BD_SMF_1"},
    {"status": "STOPPED", "name": "TRPLS_SMF_1"},
    {"status": "STOPPED", "name": "TPHMR_SMF_1"},
    {"status": "STOPPED", "name": "TPHMR_SMF_2"},
    {"status": "STOPPED", "name": "TPHMR_SMF_3"},
    {"status": "STOPPED", "name": "TCHMR_SMF_1"},
    {"status": "STOPPED", "name": "TCHMR_SMF_2"},
    {"status": "STOPPED", "name": "TCHMR_SMF_3"},
    {"status": "STOPPED", "name": "EVLMR_SMF_1"},
    {"status": "STOPPED", "name": "EVLMR_SMF_2"},
    {"status": "STOPPED", "name": "EVLMR_SMF_3"},
    {"status": "STOPPED", "name": "OBEMR_SMF_1"},
    {"status": "STOPPED", "name": "OBEMR_SMF_2"},
    {"status": "STOPPED", "name": "OBEMR_SMF_3"},
    {"status": "STOPPED", "name": "OOLS_SMF_1"},
    {"status": "STOPPED", "name": "OOLS_SMF_2"},
    {"status": "STOPPED", "name": "OOLS_SMF_3"},
    {"status": "STOPPED", "name": "SMON_SMF_1"},
    {"status": "STOPPED", "name": "SMON_SMF_2"},
    {"status": "STOPPED", "name": "SMON_SMF_3"},
    {"status": "STOPPED", "name": "TMCC_SMF_1"},
    {"status": "STOPPED", "name": "TMCC_SMF_2"},
    {"status": "STOPPED", "name": "TMCC_SMF_3"},
    {"status": "STOPPED", "name": "EXIF_TMI"},
    {"status": "STOPPED", "name": "EXIF_EVI"},
    {"status": "STOPPED", "name": "TCTmodel"},
    {"status": "STOPPED", "name": "TRPLS"},
    {"status": "STOPPED", "name": "TCTview"},
    {"status": "STOPPED", "name": "TRPLC"},
    {"status": "STOPPED", "name": "TMPI"}
])