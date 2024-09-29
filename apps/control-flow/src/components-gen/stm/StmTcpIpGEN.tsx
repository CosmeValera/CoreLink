import React, { useEffect, useState } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { useApp } from '../../provider/MifProvider';
import StmTcpIpTable from '../../shared/StmTcpIpTable';

export default function StmTcpIpGEN(props: { className?: string }) {
    const { getStmValues, patchMifVariable} = useApp();
    const { loading, dataStm, error } = getStmValues();
    const [tcpIPMap, setTcpIPMap] = useState<any[]>([]);

    useEffect(() => {    
        const tcpIPMap: Record<string, string | boolean> = {};

        if (dataStm) {
            dataStm.forEach((item: { key: string, value: string, readonly: boolean }) => {
                if (item.key.includes("CONNECTION_STATUS")) {
                    tcpIPMap[item.key] = item.value.toLowerCase() === "connected";
                }
            });
            const array = Object.entries(tcpIPMap).map(([key, value]) => ({ [key]: value }));
            setTcpIPMap(array);
        }
    }, [dataStm]);

    return (
        <div className={`card ${props.className}`}>
            <Fieldset legend="TCP-IP KMF Connections" toggleable className='m-2' pt={{
                content: { className: 'py-0' },
            }}>
                <div className="grid grid-nogutter">
                    <div className="cq-12 my-3">
                        <StmTcpIpTable configuration={tcpIPMap} loading={loading} />  
                    </div>
                </div>
            </Fieldset>
        </div>
    )
}