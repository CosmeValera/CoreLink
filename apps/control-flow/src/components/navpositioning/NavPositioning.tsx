import React, { useEffect, useState } from 'react';
import { Fieldset } from 'primereact/fieldset';
import SwitchEnable from '../../shared/SwitchEnable';
import NavPositioningForce from './force/NavPoisitioningForce';
import { useApp } from '../../provider/MifProvider';

export default function NavPositioning(props: { className?: string, height?: number }) {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const { getNavPrsValues, patchMifVariable} = useApp();
    const { loading, dataNavPrs, error } = getNavPrsValues();
    const [isNavPrsEnabled, setIsNavPrsEnabled] = useState<boolean>(false);

    useEffect(() => {    
        if (dataNavPrs && dataNavPrs[0]) {
            setIsNavPrsEnabled(dataNavPrs[0].value.toLowerCase() === "enabled");
        }
    }, [dataNavPrs]);

    const handleSwitchChange = (key: string, value: boolean) => {
        setIsNavPrsEnabled(!isNavPrsEnabled);
    };

    return (
        <div className={`card gap-2 ${props.className}`}>
            <Fieldset
                legend="NAV/Positioning Configuration"
                toggleable
                onCollapse={() => setIsCollapsed(true)}
                onExpand={() => setIsCollapsed(false)}
                style={{minHeight: props.height && !isCollapsed ? `${props.height}px` : 'auto'}}
                className='flex flex-column m-2'
                pt={{
                    content: { className: 'py-0' },
                }}>
                <div className="grid grid-nogutter">
                    <div className="cq-6">
                        <SwitchEnable
                            configuration='NAV Data'
                            configurationApi='CMD_MINT_RELEASE_NAVPRS'
                            checked={isNavPrsEnabled}
                            loading={loading}
                            error={error}
                            callbackPatch={patchMifVariable}
                            onToggle={handleSwitchChange}
                        />
                    </div>
                </div>
                <NavPositioningForce enable={isNavPrsEnabled}/>
            </Fieldset>
        </div>
    )
}
