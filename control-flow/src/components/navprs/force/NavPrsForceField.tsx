import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import NavPrsForceDialog from "./NavPrsForceDialog";

export default function NavPrsForceField(props: { configuration: string, enable: boolean }) {
    const [textFieldvalue, setTextFieldValue] = useState<string>('');    
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const handleFileReceived = (file: string) => {
        setTextFieldValue(file);
    };

    return (
        <div className="flex align-items-center mt-5 gap-3">
            {isModalVisible && <NavPrsForceDialog visible={isModalVisible} setIsModalVisible={setIsModalVisible} onFileSelect={handleFileReceived}/>}

            <div className="flex justify-content-center flex-grow-1">
                <span className="p-float-label w-full">
                    <InputText id={props.configuration} value={textFieldvalue} className="w-full" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextFieldValue(e.target.value)} keyfilter={/^$/} />
                    <label htmlFor={props.configuration}>{props.configuration}</label>
                </span>
            </div>

            <div className="flex justify-content-center">
                <Button icon="pi pi-plus" label="Browse" rounded disabled={props.enable} onClick={() => setIsModalVisible(true)}/>
            </div>  

            <div className="flex justify-content-center">
                <Button label="Clear" rounded disabled={props.enable} onClick={()=> {setTextFieldValue('')}}/>
            </div>
        </div>
    );
}

