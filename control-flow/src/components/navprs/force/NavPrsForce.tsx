import React from 'react'; 
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import NavPrsForceField from './NavPrsForceField';

export default function NavPrsForce({enable}: {enable: boolean}) {
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
                <span className={titleClassName} style={style}>Force</span>
            </div>
        );
    };

    return (
        <Panel headerTemplate={template} toggleable>
            <NavPrsForceField configuration="OS" enable={enable} />
            <NavPrsForceField configuration="GNAV" enable={enable} />
            <NavPrsForceField configuration="GNAV9" enable={enable} />
        </Panel>
    )
}
        