import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import StatusTag from '../components/status-tag/StatusTag';

interface Connection {
    name: string;
    nameAPI: string;
    prime1: Server;
    backup1: Server;
    prime2: Server;
    backup2: Server;
}

interface Server {
    name: string;
    status: boolean;
}

interface ClickEnableProps {
    configuration: any[];
    loading: boolean;
}

export default function StmTcpIpTable(props: ClickEnableProps) {
    const displayText = {active: 'CONNECTED', inactive: 'DISCONNECTED'}
    const [loading, setLoading] = useState(props.loading);
    
    const stmTcpIp: Connection[] = [
        {
            name: 'M-KMF',
            nameAPI: '',
            prime1: {
                name: '',
                status: false
            },
            backup1: {
                name: '',
                status: false
            },
            prime2: {
                name: '',
                status: false
            },
            backup2: {
                name: '',
                status: false
            }
        },
        {
            name: 'P-KMF',
            nameAPI: '',
            prime1: {
                name: '',
                status: false
            },
            backup1: {
                name: '',
                status: false
            },
            prime2: {
                name: '',
                status: false
            },
            backup2: {
                name: '',
                status: false
            }
        },
        {
            name: 'GCS-KMF',
            nameAPI: '',
            prime1: {
                name: '',
                status: false
            },
            backup1: {
                name: '',
                status: false
            },
            prime2: {
                name: '',
                status: false
            },
            backup2: {
                name: '',
                status: false
            }
        }
    ]

    const fillStmTcpIp = (connection: Connection, data: Server) => {
        const key: string = Object.keys(data)[0]
        const value: boolean = (data as any)[key]

        if (key.includes('PRIME')) {
            if (key.includes('GCC1')){
                connection.prime1.name = key
                connection.prime1.status = value
            } else if (key.includes('GCC2')) {
                connection.prime2.name = key
                connection.prime2.status = value
            }
        } else if (key.includes('BACKUP')) {
            if (key.includes('GCC1')){
                connection.backup1.name = key
                connection.backup1.status = value
            } else if (key.includes('GCC2')) {
                connection.backup2.name = key
                connection.backup2.status = value
            }
        }
    }

    if (props.configuration) {
        if (props.configuration.length !== 0) {
            props.configuration.forEach(item => {
                if (Object.keys(item)[0].includes('MKMF')) {
                    fillStmTcpIp(stmTcpIp[0], item)
                } else if (Object.keys(item)[0].includes('PKMF')) {
                    fillStmTcpIp(stmTcpIp[1], item)
                } else if (Object.keys(item)[0].includes('SKMF')) {
                    fillStmTcpIp(stmTcpIp[2], item)
                }
            })
        } else {
            return <h3>No Data</h3>  
        }
    }
    
    return (
        <div className="card">
            <DataTable value={stmTcpIp}>
                <Column field="name" header=""></Column>
                <Column field="prime1.status" header="GCC-1 Prime" body={(rowData) => StatusTag(rowData.prime1, displayText)} />
                <Column field="backup1.status" header="GCC-1 Backup" body={(rowData) => StatusTag(rowData.backup1, displayText)} />
                <Column field="prime2.status" header="GCC-2 Prime" body={(rowData) => StatusTag(rowData.prime2, displayText)} />
                <Column field="backup2.status" header="GCC-2 Backup" body={(rowData) => StatusTag(rowData.backup2, displayText)} />
            </DataTable>
        </div>
    );
}
        