import React, { useEffect, useState } from 'react'; 
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import StmTcpIpTable from '../../../shared/StmTcpIpTable';

interface ClickEnableProps {
    configuration: any[];
    loading: boolean;
}

export default function StmTcpIp(props: ClickEnableProps) {
    const [update, setUpdate] = useState<ClickEnableProps>(props)
    
    useEffect(() => {
        setUpdate(props)
    }, [props])
 
    const template = (options: PanelHeaderTemplateOptions) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className} justify-content-start px-1 py-1`;
        const titleClassName = `${options.titleClassName} ml-1`;
        const style = { fontSize: '1rem' };

        return (
            <div className={className}>
                <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                    <span className={toggleIcon}></span>
                    <Ripple />
                </button>
                <span className={titleClassName} style={style}>TCP-IP KMF Connections</span>
            </div>
        );
    };

    return (
        <Panel headerTemplate={template} toggleable>
            <StmTcpIpTable configuration={update.configuration} loading={props.loading} />
        </Panel>
    )
}
        