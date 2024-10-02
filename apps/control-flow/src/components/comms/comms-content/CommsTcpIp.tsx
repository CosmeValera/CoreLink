
import React from 'react';
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import InputActive from '../../../shared/InputActive';

export default function StcTCPIP({configuration, loading}: any) {
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
                <span className={titleClassName} style={style}>TCP-IP Command Connections</span>
            </div>
        );
    };

    return (
        <Panel headerTemplate={template} toggleable>
            <InputActive
                name="Ping Data Channel"
                status={!!configuration['CMD_KMF_STC_MKMF_LINK_STATUS']}
                loading={loading}
            />
            <InputActive
                name="Acoustic Command Channel"
                status={!!configuration['CMD_KMF_STC_PKMF_LINK_STATUS']}
                loading={loading}
            />
            <InputActive
                name="Telemetry Data Channel"
                status={!!configuration['CMD_KMF_STC_SKMF_LINK_STATUS']}
                loading={loading}
            />
        </Panel>
    )
}
