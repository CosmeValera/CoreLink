import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useFetch } from "../services/useFetch";

import token from '../helpers/token';
import { Toast } from "primereact/toast";

type MifProviderProps = {
    children: ReactNode;
    domain: string;
}
type MifValueProp = {
    key: string,
    value: string,
    readOnly: boolean
}
export enum ServiceType {
    CONFIG,
    FILE
}

export default function MifProvider({children, domain} : MifProviderProps) {
    const { loading, data, error } = useFetch(domain, "prime", ServiceType.CONFIG);

    const [dataMm, setDataMm] = useState<MifValueProp[]>([]);
    const [dataStc, setDataStc] = useState<MifValueProp[]>([]);
    const [dataStm, setDataStm] = useState<MifValueProp[]>([]);
    const [dataNavPrs, setDataNavPrs] = useState<MifValueProp[]>([]);
    
    const toast = useRef<Toast>(null);

    useEffect(()=> {
        const filteredResMm = data.filter((instance: {key: string, value: string, readOnly: boolean}) => instance.key.startsWith("MM"));
        const regexStc = new RegExp("^CMD_.*_STC")
        const filteredResStc = data.filter((instance: {key: string, value: string, readOnly: boolean}) => regexStc.test(instance.key));
        const filteredNavPrs = data.filter((instance: {key: string, value: string, readOnly: boolean}) => instance.key.endsWith("NAVPRS"));
        const filteredResStm = data.filter((instance: {key: string, value: string, readOnly: boolean}) => instance.key.startsWith("STM"));
      
        setDataMm(filteredResMm);
        setDataStc(filteredResStc);
        setDataNavPrs(filteredNavPrs);
        setDataStm(filteredResStm);
    }, [data]);

    const getMMsatStatValues = () => {
        return { loading, dataMm, error };
    }

    const getStcValues = () => {
        return { loading, dataStc, error };
    }

    const getNavPrsValues = () => {
        return { loading, dataNavPrs, error };
    }
    
    const getStmValues = () => {
        return { loading, dataStm, error };
    }

    const patchMifVariable = async (key: string, value: string, dom: string = domain) => {
        console.log("patchMifVariable thrown");
        
        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
        };
        const patchData = {
            key: key,
            value: value
        }
        return fetch(`http://localhost:4040/api/tcSpaconMissionInterface/${dom}`, {method: 'PATCH', headers, body: JSON.stringify(patchData)})
        .then((res) => {
            console.log("first then in patchMifVariable.", res);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
            // return mockData;
        })
        .then((res) => {
            console.log("second then in patchMifVariable.", res);
            return true;
        })
        .catch((err) => {
            console.log("catch error", err)
            return false;
        });
    }

    const fetchCheckIsFile = async (file: string, dom: string = domain ) => {
        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
        };

        const res = await fetch(`http://localhost:4040/api/tcSpaconMissionInterface/files/${dom}/${file}`, {headers})
    
        if (!res.ok) {
            throw new Error(`Network response was not ok. Status: ${res.status}. StatusText: ${res.statusText}`);
        }
        
        return await res.json();
    }
    
    const showToast = (selectedFile: string, isToastSuccesful: boolean) => {
        if (isToastSuccesful) {
            toast.current?.show({severity:'info', summary: 'Info', detail:<p><strong>{selectedFile}</strong> was selected</p>, life: 3000});
        } else {   
            toast.current?.show({severity:'error', summary: 'Error', detail:<p><strong>{selectedFile}</strong> is a folder!</p>, life: 3000});
        }
    }

    return (
        <AppContext.Provider value={
            {
                domain,
                patchMifVariable,
                getMMsatStatValues,
                getStcValues,
                getNavPrsValues,
                getStmValues,
                fetchCheckIsFile,
                showToast
            }
        }>
            <Toast ref={toast} />
            {children}
        </AppContext.Provider>
    )
}

export const AppContext = React.createContext({});

export const useApp = () => {
    return useContext(AppContext);
}