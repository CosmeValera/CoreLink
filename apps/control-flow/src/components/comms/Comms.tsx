import React, { useEffect, useState } from 'react';
import { Fieldset } from 'primereact/fieldset';
import SwitchEnable from '../../shared/SwitchEnable';
import CommsBuffer from './comms-content/CommsBuffer';
import CommsTcpIp from './comms-content/CommsTcpIp';
import { useApp } from '../../provider/MifProvider';

export default function Stc(props: { className?: string }) {
    const { getStcValues, patchMifVariable} = useApp();
    const { loading, dataStc, error } = getStcValues();
    const [stcMap, setStcMap] = useState<Record<string, string | boolean>>({});
    const [tcpIPMap, setTcpIPMap] = useState<Record<string, string | boolean>>({});
    
    useEffect(() => {  
        const stcMap: Record<string, string | boolean> = {};
        const tcpIPMap: Record<string, string | boolean> = {};
        if (dataStc) {
            dataStc.forEach((item: { key:string, value:string, readonly: boolean }) => {
                if (item.key.endsWith("STATUS")) {
                    tcpIPMap[item.key] = item.value === '1' ? true : false;
                } else if (item.key.endsWith("BUFFER")) {
                    stcMap[item.key] = item.value;
                } else {
                    stcMap[item.key] = item.value.toLowerCase() === "enabled";
                }
            });  
            setStcMap(stcMap);
            setTcpIPMap(tcpIPMap);
        }
    }, [dataStc]);

    const handleSwitchChange = (key: string, value: boolean) => {
        setStcMap(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className={`card ${props.className}`}>
            <Fieldset legend="Comms Configuration" toggleable className='m-2' pt={{
                content: { className: 'py-0' },
            }}>
                <div className="grid grid-nogutter">
                    <div className="cq-6">
                        <SwitchEnable
                            configuration="Radio Reception"
                            configurationApi="CMD_MINT_RECEIVE_STC"
                            checked={!!stcMap["CMD_MINT_RECEIVE_STC"]}
                            loading={loading}
                            error={error}
                            callbackPatch={patchMifVariable}
                            onToggle={handleSwitchChange}
                        />
                        <SwitchEnable
                            configuration="Sonar Uplink (Ping)"
                            configurationApi="CMD_MINT_RELEASE_MKMF_STC"
                            checked={!!stcMap["CMD_MINT_RELEASE_MKMF_STC"]}
                            loading={loading}
                            error={error}
                            callbackPatch={patchMifVariable}
                            onToggle={handleSwitchChange}
                        />
                        <SwitchEnable
                            configuration="Acoustic Uplink (Control)"
                            configurationApi="CMD_MINT_RELEASE_PKMF_STC"
                            checked={!!stcMap["CMD_MINT_RELEASE_PKMF_STC"]}
                            loading={loading}
                            error={error}
                            callbackPatch={patchMifVariable}
                            onToggle={handleSwitchChange}
                        />
                        <SwitchEnable
                            configuration="Satellite Uplink (Telemetry)"
                            configurationApi="CMD_MINT_RELEASE_SKMF_STC"
                            checked={!!stcMap["CMD_MINT_RELEASE_SKMF_STC"]}
                            loading={loading}
                            error={error}
                            callbackPatch={patchMifVariable}
                            onToggle={handleSwitchChange}
                        />
                        <CommsBuffer
                            configuration="Comms Buffer"
                            configurationApi="CMD_KMF_STC_FLUSH_BUFFER"
                            actualBuffer={stcMap["CMD_KMF_STC_FLUSH_BUFFER"]}
                            loading={loading}
                            error={error}
                            callbackPatch={patchMifVariable}
                            onFlush={handleSwitchChange}
                        />
                    </div>
                    <div className="cq-6">
                        <CommsTcpIp configuration={tcpIPMap} loading={loading}/>
                    </div>
                </div>

            </Fieldset>
        </div>
    )
};