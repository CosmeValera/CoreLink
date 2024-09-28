import React, { useEffect, useState } from 'react';
import SwitchEnable from '../../shared/SwitchEnable';
import { Fieldset } from 'primereact/fieldset';
import { useApp } from '../../provider/MifProvider';

export default function MMsatStat(props: { className?: string }) {
    const { getMMsatStatValues, patchMifVariable} = useApp();
    const { loading, dataMm, error } = getMMsatStatValues();
    const [MMsatStatMap, setMMsatStatMap] = useState<Record<string, string | boolean>>({});

    useEffect(() => {    
        const MMsatStatMap: Record<string, string | boolean> = {};
        if (dataMm) {
            dataMm.forEach((item: { key:string, value:string, readonly: boolean }) => {
                MMsatStatMap[item.key] = item.value.toLowerCase() === "enabled";    
            });
            setMMsatStatMap(MMsatStatMap);
        }
    }, [dataMm]);
    
    const handleSwitchChange = (key: string, value: boolean) => {
        setMMsatStatMap(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className={`card ${props.className}`}>
            <Fieldset legend="MMsatStat Configuration" toggleable className='m-2' pt={{
                content: { className: 'py-0' },
            }}>
                <div className="grid grid-nogutter">
                    <div className="cq-6 cq-xs-12 cq-sm-8">
                        <SwitchEnable
                            configuration="MMsatStat"
                            configurationApi="MMSATSTAT_PROCESSING"
                            checked={!!MMsatStatMap["MMSATSTAT_PROCESSING"]} 
                            loading={loading}
                            error={error}
                            callbackPatch={patchMifVariable}
                            onToggle={handleSwitchChange}
                        />
                        {/* <SwitchEnable
                            configuration="MMsatStat"
                            checked={false}
                        /> */}
                    </div>
                </div>
            </Fieldset>
        </div>
    )
}
