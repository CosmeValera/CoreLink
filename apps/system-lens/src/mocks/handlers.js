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
    {"domain": "316", "status": "RUNNING", "name": "DSUBTM"},
    {"domain": "316", "status": "RUNNING", "name": "DSUBTC"},
    {"domain": "316", "status": "RUNNING", "name": "DSUBEV"},
    {"domain": "316", "status": "RUNNING", "name": "SONTM"},
    {"domain": "316", "status": "RUNNING", "name": "SONTC"},
    {"domain": "316", "status": "RUNNING", "name": "SONEV"},
    {"domain": "316", "status": "RUNNING", "name": "ENGTM"},
    {"domain": "316", "status": "RUNNING", "name": "ENGTC"},
    {"domain": "316", "status": "RUNNING", "name": "ENGEV"},
    {"domain": "316", "status": "RUNNING", "name": "DIVECTRL"},
    {"domain": "316", "status": "RUNNING", "name": "NAVTM"},
    {"domain": "316", "status": "RUNNING", "name": "NAVTC"},
    {"domain": "316", "status": "RUNNING", "name": "NAVEV"},
    {"domain": "316", "status": "RUNNING", "name": "CREWTM"},
    {"domain": "316", "status": "RUNNING", "name": "CREWTC"},
    {"domain": "316", "status": "RUNNING", "name": "CREWEV"},
    {"domain": "316", "status": "RUNNING", "name": "MSTRM"},
    {"domain": "316", "status": "RUNNING", "name": "SUPPLY"},
    {"domain": "316", "status": "RUNNING", "name": "ORDCTRL"},
    {"domain": "316", "status": "RUNNING", "name": "COMMUP"},
    {"domain": "316", "status": "RUNNING", "name": "COMMNET"},
    {"domain": "316", "status": "RUNNING", "name": "COORD"},
    {"domain": "316", "status": "RUNNING", "name": "DETVER"},
    {"domain": "316", "status": "RUNNING", "name": "LAUNCH"},
    {"domain": "316", "status": "RUNNING", "name": "DEPCHK"},
    {"domain": "316", "status": "RUNNING", "name": "STASYS"},
    {"domain": "316", "status": "RUNNING", "name": "TPF"},
    {"domain": "316", "status": "RUNNING", "name": "TRGTCTRL"},
    {"domain": "316", "status": "RUNNING", "name": "TRGTDET"},
    {"domain": "316", "status": "RUNNING", "name": "PACKLINK"},
    {"domain": "316", "status": "RUNNING", "name": "HULLSTACK"},
    {"domain": "316", "status": "RUNNING", "name": "SONOSTACK"},
    {"domain": "316", "status": "RUNNING", "name": "ENGINELINK"},
    {"domain": "316", "status": "RUNNING", "name": "SUPSTACK"},
    {"domain": "316", "status": "RUNNING", "name": "DPS"},
    {"domain": "316", "status": "RUNNING", "name": "NAVSYS_UPLK_1"},
    {"domain": "316", "status": "RUNNING", "name": "NAVSYS_STACK_1"},
    {"domain": "316", "status": "RUNNING", "name": "COMMS_LINK"},
    {"domain": "316", "status": "RUNNING", "name": "SONAR_STACK"},
    {"domain": "316", "status": "RUNNING", "name": "SHIELD_STACK"},
    {"domain": "316", "status": "RUNNING", "name": "REACTOR_STACK"},
    {"domain": "316", "status": "RUNNING", "name": "ALERTMON"},
    {"domain": "316", "status": "RUNNING", "name": "SEAWATCH"},
    {"domain": "316", "status": "RUNNING", "name": "FLEETMON"},
    {"domain": "316", "status": "RUNNING", "name": "TORPMON"},
    {"domain": "316", "status": "RUNNING", "name": "OPS_TRACK"},
    {"domain": "316", "status": "RUNNING", "name": "OPS_AUTO"},
    {"domain": "316", "status": "RUNNING", "name": "ORDSYS_LIVE"},
    {"domain": "316", "status": "RUNNING", "name": "ORDSYS_AUTO"},
    {"domain": "316", "status": "RUNNING", "name": "SENSNRTR"},
    {"domain": "316", "status": "RUNNING", "name": "SENSOROB"},
    {"domain": "316", "status": "RUNNING", "name": "SPPGNRT"},
    {"domain": "316", "status": "RUNNING", "name": "SPPGNOB"},
    {"domain": "316", "status": "RUNNING", "name": "SONAR_NRFDF"},
    {"domain": "316", "status": "RUNNING", "name": "AUTSC"},
    {"domain": "316", "status": "RUNNING", "name": "SONARCTRL"},
    {"domain": "316", "status": "STOPPED", "name": "DEPTHMAP"},
    {"domain": "316", "status": "STOPPED", "name": "SEAMAP"},
    {"domain": "316", "status": "STOPPED", "name": "CMD_AD_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "STACK_AD_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "CMD_BD_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "STACK_BD_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "OPS_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "TORPMR_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "TORPMR_SON_2"},
    {"domain": "316", "status": "STOPPED", "name": "TORPMR_SON_3"},
    {"domain": "316", "status": "STOPPED", "name": "CHASRM_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "CHASRM_SON_2"},
    {"domain": "316", "status": "STOPPED", "name": "CHASRM_SON_3"},
    {"domain": "316", "status": "STOPPED", "name": "ENGMR_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "ENGMR_SON_2"},
    {"domain": "316", "status": "STOPPED", "name": "ENGMR_SON_3"},
    {"domain": "316", "status": "STOPPED", "name": "CREW_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "CREW_SON_2"},
    {"domain": "316", "status": "STOPPED", "name": "CREW_SON_3"},
    {"domain": "316", "status": "STOPPED", "name": "MON_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "MON_SON_2"},
    {"domain": "316", "status": "STOPPED", "name": "MON_SON_3"},
    {"domain": "316", "status": "STOPPED", "name": "DEPLOY_SON_1"},
    {"domain": "316", "status": "STOPPED", "name": "DEPLOY_SON_2"},
    {"domain": "316", "status": "STOPPED", "name": "DEPLOY_SON_3"},
    {"domain": "316", "status": "STOPPED", "name": "EXIF_TM"},
    {"domain": "316", "status": "STOPPED", "name": "EXIF_EV"},
    {"domain": "316", "status": "STOPPED", "name": "TACTIC"},
    {"domain": "316", "status": "STOPPED", "name": "TACTCTRL"},
    {"domain": "316", "status": "STOPPED", "name": "TACTVIEW"},
    {"domain": "316", "status": "STOPPED", "name": "TP_FLOOR"}
])