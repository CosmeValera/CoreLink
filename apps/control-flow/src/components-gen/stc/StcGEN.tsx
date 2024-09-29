import React, { useEffect, useState } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { useApp } from '../../provider/MifProvider';
import { fetchGetAllDomains } from '../../services/fetchDomains';
import StcReceptionsGEN from './StcReceptionsGEN';
import SwitchEnable from '../../shared/SwitchEnable';

interface Reception {
    satellite: string;
    reception: ProcessData;
}
  
interface ProcessData {
    key: string;
    value: string;
    readOnly: boolean;
}
  
export default function StcGEN(props: { className?: string }) {
    const { getStcValues, patchMifVariable} = useApp();
    const { loading, dataStc, error } = getStcValues();
    const [stcMap, setStcMap] = useState<Record<string, string | boolean>>({});
    const [dataDomains, setDataDomains] = useState<Reception[]>([])
    const [isLoadingDomains, setIsLoadingDomains] = useState<boolean>(true)

    const domains = ['3A5', '3A6', '3A7', '316', '261', '262', '263', '264'];
    
    useEffect(() => {    
        const stcMap: Record<string, string | boolean> = {};
        makeFetchDomainsCall()
    
        if (dataStc) {
            dataStc.forEach((item: { key:string, value:string, readonly: boolean }) => {
                if (item.key.includes("RECEIVE")) {
                    stcMap[item.key] = item.value.toLowerCase() === "enabled";
                }
            });  
            setStcMap(stcMap);
        }
    }, [dataStc]);

    const makeFetchDomainsCall = () => {
        setIsLoadingDomains(true)
        fetchGetAllDomains(domains)
            .then(response => {
                const receptions: Reception[] = []
                response.map((singleRes, i) => {
                    receptions.push({
                        satellite: domains[i],
                        reception: singleRes.filter(res => res.key.includes('RECEIVE'))[0]
                    })
                })
                setIsLoadingDomains(false)
                setDataDomains(receptions)
            }).catch(error => {
                console.log(error)
            })
    }

    const handleStcProcessingSwitchChange = async (key: string, value: boolean) => {
        const state = value ? 'ENABLED' : 'DISABLED'

        await Promise.all([
            domains.forEach(domain => {
                patchMifVariable('CMD_MINT_RECEIVE_STC', state, domain)
            })
        ]);
        // Update stmMap and set other switches to false
        dataDomains.forEach(domain => domain.reception.value = state)

        setDataDomains(dataDomains)
        setStcMap(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className={`card ${props.className}`}>
            <Fieldset legend="STC Configuration" toggleable className='m-2' pt={{
                content: { className: 'py-0' },
            }}>
                <div className="grid grid-nogutter">
                    <div className="cq-12">
                        <SwitchEnable
                            configuration="STC Reception"
                            configurationApi="CMD_MINT_RECEIVE_STC"
                            checked={!!stcMap["CMD_MINT_RECEIVE_STC"]}
                            loading={loading}
                            error={error}
                            callbackPatch={patchMifVariable}
                            onToggle={handleStcProcessingSwitchChange}
                        />
                    </div>
                    <div className='cq-12 my-3'>
                        <StcReceptionsGEN configuration={dataDomains} loading={isLoadingDomains} />
                    </div>
                </div>
            </Fieldset>
        </div>
    )
};