import React, { useEffect, useState } from 'react';
import { Fieldset } from 'primereact/fieldset';
import SwitchEnable from '../../shared/SwitchEnable';
import StmPacket from './stm-content/StmPacket';
import StmTcpIp from './stm-content/StmTcpIp';
import { useApp } from '../../provider/MifProvider';

export default function Stm(props: { className?: string }) {
    const { getStmValues, patchMifVariable} = useApp();
    const { loading, dataStm, error } = getStmValues();
    const [stmMap, setStmMap] = useState<Record<string, string | boolean>>({});
    const [tcpIPMap, setTcpIPMap] = useState<any[]>([]);
    const [isStmProcessingChecked, setIsStmProcessingChecked] = useState<boolean>(!!stmMap['STM_PROCESSING']);
    
    useEffect(() => {    
        const stmMap: Record<string, string | boolean> = {};
        const tcpIPMap: Record<string, string | boolean> = {};

        if (dataStm) {
            dataStm.forEach((item: { key:string, value:string, readonly: boolean }) => {
                if (item.key.includes("LAST_PACKET_TIME")) {
                    stmMap[item.key] = item.value;
                } else if (item.key.includes("CONNECTION_STATUS")) {
                    tcpIPMap[item.key] = item.value.toLowerCase() === "connected";
                } else {
                    stmMap[item.key] = item.value.toLowerCase() === "enabled";
                }
                setStmMap(stmMap);
            });
            const array = Object.entries(tcpIPMap).map(([key, value]) => ({ [key]: value }));
            setTcpIPMap(array);
            setIsStmProcessingChecked(!!stmMap["STM_PROCESSING"]);
        }
    }, [dataStm]);

    const handleStmProcessingSwitchChange = async (key: string, value: boolean) => {
        setIsStmProcessingChecked(value);

        if (value === false) {
            await Promise.all([
                patchMifVariable('STM_MKMF_PROCESSING', 'false'),
                patchMifVariable('STM_PKMF_PROCESSING', 'false'),
                patchMifVariable('STM_SKMF_PROCESSING', 'false'),
            ]);
    
            // Update stmMap and set other switches to false
            setStmMap(prev => ({
                ...prev,
                'STM_MKMF_PROCESSING': false,
                'STM_PKMF_PROCESSING': false,
                'STM_SKMF_PROCESSING': false,
                [key]: value,
            }));
        } else {
            setStmMap(prev => ({ ...prev, [key]: value }));
        }
    };
    
    const handleOtherSwitchChange = (key: string, value: boolean) => {
        setStmMap(prev => ({ ...prev, [key]: value }));
    };
    
    return (
        <div className={`card ${props.className}`}>
            <Fieldset legend="STM Configuration" toggleable className='m-2' pt={{
                content: { className: 'py-0' },
            }}>
                <div className="grid grid-nogutter">
                    <div className="cq-12 cq-xl-6 grid grid-nogutter">
                        <div className="cq-12 flex align-items-end">
                            <SwitchEnable 
                                configuration='STM Transmission'
                                configurationApi="STM_PROCESSING"
                                checked={!!stmMap["STM_PROCESSING"]} 
                                loading={loading}
                                error={error}
                                callbackPatch={patchMifVariable}
                                onToggle={handleStmProcessingSwitchChange}/>
                        </div>
                        <div className="cq-6">
                            <SwitchEnable 
                                configuration='STM Forwarding M-KMF' 
                                configurationApi="STM_MKMF_PROCESSING"
                                checked={!!stmMap["STM_MKMF_PROCESSING"]} 
                                loading={loading}
                                disabled={!isStmProcessingChecked}
                                error={error}
                                callbackPatch={patchMifVariable}
                                onToggle={handleOtherSwitchChange}/>
                            <SwitchEnable 
                                configuration='STM Forwarding P-KMF' 
                                configurationApi="STM_PKMF_PROCESSING"
                                checked={!!stmMap["STM_PKMF_PROCESSING"]} 
                                loading={loading}
                                disabled={!isStmProcessingChecked}
                                error={error}
                                callbackPatch={patchMifVariable}
                                onToggle={handleOtherSwitchChange}/>
                            <SwitchEnable 
                                configuration='STM Forwarding GCS-KMF' 
                                configurationApi="STM_SKMF_PROCESSING"
                                checked={!!stmMap["STM_SKMF_PROCESSING"]} 
                                loading={loading}
                                disabled={!isStmProcessingChecked}
                                error={error}
                                callbackPatch={patchMifVariable}
                                onToggle={handleOtherSwitchChange}/>
                        </div>
                        <div className="cq-6">
                            <StmPacket
                                configuration='Last STM M-KMF packet'
                                date={`${stmMap["STM_MKMF_LAST_PACKET_TIME"] ?? 'No date available'}`}
                                className='mr-3'/>
                            <StmPacket
                                configuration='Last STM P-KMF packet'
                                date={`${stmMap["STM_PKMF_LAST_PACKET_TIME"] ?? 'No date available'}`}
                                className='mr-3'/>
                            <StmPacket
                                configuration='Last STM GCS-KMF packet'
                                date={`${stmMap["STM_SKMF_LAST_PACKET_TIME"] ?? 'No date available'}`}
                                className='mr-3'/>
                        </div>
                    </div>

                    <div className="cq-12 cq-xl-6">
                        <StmTcpIp
                            configuration={tcpIPMap}
                            loading={loading}
                        />
                    </div>
                </div>
            </Fieldset>
        </div>
    )
}
