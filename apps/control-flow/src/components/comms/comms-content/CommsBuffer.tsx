import React, { useEffect, useState } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from "primereact/button";
import { useFormik } from 'formik';
import { ConfirmDialog } from "primereact/confirmdialog";
import { Tooltip } from "primereact/tooltip";
import { Message } from 'primereact/message';

type BufferProps = {
    configuration: string;
    configurationApi?: string;
    actualBuffer: string | boolean;
    loading?: boolean;
    disabled?: boolean;
    error?: boolean;
    callbackPatch?: (key: string, value: string) => Promise<boolean>;
    onFlush?: (key: string, value: boolean) => void;
}

interface BufferOption {
    number: string;
    name: string;
}

export default function StcBuffer(props: BufferProps) {
    const [actualBuffer, setActualBuffer] = useState(props.actualBuffer);
    const [buffer, setBuffer] = useState<any>(false);
    const [loading, setLoading] = useState(props.loading);
    const [error, setError] = useState(props.error);
    const [disableButton, setDisableButton] = useState<boolean>(true)
    const [visible, setVisible] = useState(false);

    const stcBufferOptions: BufferOption[] = [
        { number: '6', name: 'Sonar Ping Buffer' },
        { number: '10', name: 'Acoustic Command Buffer' },
        { number: '9', name: 'Telemetry Buffer' },
        { number: '0', name: 'All buffers' },
    ];

    useEffect(() => {
        setActualBuffer(props.actualBuffer);
        setLoading(props.loading);
        setError(props.error);
    }, [props]);

    const handleSwitch = async(data: any) => {
        setLoading(true);

        const response = await props.callbackPatch!(props.configurationApi!, data.buffer.number);

        if(response) {
            setActualBuffer(buffer.number)
        }

        setLoading(!response);
        setError(!response);
        setDisableButton(true)
    }

    function findBufferNameByNumber(actualBuffer: any) {
        const buffer = stcBufferOptions.find(buffer => buffer.number === actualBuffer);
        const selectedBuffer = buffer ? buffer.name : '...'

        return selectedBuffer;
    }

    const formik = useFormik({
        initialValues: {
            buffer: ''
        }, validate: (data: any) => {
            if (!data.buffer || data.buffer.number === actualBuffer) {
                setDisableButton(true)
            } else {
                setDisableButton(false)
            } 
        },
        onSubmit: (data) => {
            handleSwitch(data)        
        }
    });

    const handleSelectedBuffer = (e: DropdownChangeEvent) => {
        e.preventDefault();
        setBuffer(e.value)
        if (!e.value || e.value.number === actualBuffer) {
            setDisableButton(true)
        }     
    }

    return (
        <>
            <div className="flex align-items-center">
                <p className='w-13rem'>{props.configuration}</p>          
                <form onSubmit={formik.handleSubmit} className="flex justify-content-start flex-grow-1 gap-3">
                    <ConfirmDialog
                        visible={visible}
                        onHide={() => setVisible(false)}
                        message={`Are you sure you want to flush ${props.configuration} state?`}
                        header="Confirmation"
                        icon="pi pi-exclamation-triangle"
                        accept={formik.submitForm}
                        rejectClassName="border-primary"
                        style={{ width: '30vw' }}
                        breakpoints={{ '1200px': '40vw', '768px': '60vw' }}
                    />
                    <Dropdown
                        inputId="buffer"
                        name="buffer"
                        value={formik.values.buffer}
                        className={'max-w-8rem'}
                        onChange={(e: DropdownChangeEvent) => {
                            formik.setFieldValue('buffer', e.value)
                            handleSelectedBuffer(e)  
                        }}
                        options={stcBufferOptions}
                        optionLabel="name"
                        placeholder={findBufferNameByNumber(actualBuffer)}
                    />          
                    <Button
                        className="pointer-events-auto"
                        type="button"
                        label="Flush"
                        onClick={() => setVisible(true)}
                        rounded disabled={disableButton}
                        tooltip={disableButton ? 'Current Buffer': ''}
                        tooltipOptions={{ showOnDisabled: true }}
                    />
                    {error &&
                    <>
                        <Tooltip target=".tooltip-msg" content="MIF API error" className="fadeinright animation-ease-out animation-duration-200"/>
                        <Message severity="error" className="tooltip-msg fadeinright animation-ease-out animation-duration-200 border-circle" />
                    </>}
                </form>      
            </div>
        </>
    )
}
function setChecked(checked: any) {
    throw new Error("Function not implemented.");
}

function booleanToString(arg0: boolean): string {
    throw new Error("Function not implemented.");
}

