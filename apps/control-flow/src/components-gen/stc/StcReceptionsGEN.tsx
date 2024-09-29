import React, { useEffect, useState } from 'react';
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import InputActive from '../../shared/InputActive';
import { ProgressSpinner } from 'primereact/progressspinner';

interface Reception {
  satellite: string;
  reception: ProcessData
}

interface ProcessData {
  key: string;
  value: string;
  readOnly: boolean;
}

export default function StcReceptions({configuration, loading}: {configuration: Reception[], loading: boolean}) {
    const [consigurationData, setConfiguration] = useState<Reception[]>(configuration)
    const [isLoading, setIsLoading] = useState<boolean>(loading)

    useEffect(() => {
        setConfiguration(configuration)
        setIsLoading(loading)
    }, [configuration, loading])

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
            {!isLoading ?
                consigurationData.map((domain: Reception, i: number) => 
                    <InputActive
                        key={i}
                        name={domain.satellite}
                        status={domain.reception.value.toLowerCase() === 'enabled'}
                        loading={loading}
                    />
                ) :
                <div className="card flex justify-content-center">
                    <ProgressSpinner />
                </div>
            }
        </Panel>
    )
}
