import React, { useRef, useState } from "react";

import { useFetch } from "../../../services/useFetch";
import { ServiceType, useApp } from "../../../provider/MifProvider";

import { Dialog } from "primereact/dialog";
import { ListBox } from 'primereact/listbox';
import { Button } from "primereact/button";

export default function NavPrsForceDialog(props: {visible: boolean, setIsModalVisible: (visible: boolean) => void, onFileSelect: (file: string) => void}) {
    const { loading, data: files, error }: {loading: boolean, data: {children: string[]}, error: boolean } = useFetch("316", "prime", ServiceType.FILE);
    const [selectedFile, setSelectedFile] = useState<string>('');
    const { fetchCheckIsFile, showToast } = useApp();

    const handleSelect = async () => {
        try {
            await fetchCheckIsFile(selectedFile);
            
            props.onFileSelect(selectedFile);
            showToast(selectedFile, true)
            props.setIsModalVisible(false);
        } catch (err) {
            showToast(selectedFile, false)
        }
    };

    const filteredChildren = () => {
        if (!files || !files.children) {
            return [];
        }

        return files.children.filter((child) => child.includes('.') && child !== '.' && child !== '..')
    }

    return (
        <Dialog header="Select navprs gnav file" visible={props.visible} onHide={() => props.setIsModalVisible(false)}
            style={{ width: '50vw', height: '90vh'}} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
            <ListBox value={selectedFile} style={{ height: 'calc(82vh - 49px - 40px)', overflowY: 'auto' }} onChange={(e) => {setSelectedFile(e.value)}} options={filteredChildren()} className="w-full" />
            <div className="flex justify-content-end gap-2 mt-4">
                <Button label="Select" rounded disabled={!selectedFile} onClick={handleSelect}/>
                <Button label="Cancel" rounded onClick={() => {props.setIsModalVisible(false)}}/>
            </div>
        </Dialog>
    );
}