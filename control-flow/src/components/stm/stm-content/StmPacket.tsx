import React from "react";
import { InputText } from "primereact/inputtext";

export default function StmPacket(props: {configuration: string, date: string, className?: string}) {
    return (
        <div className={`flex align-items-center ${props.className}`}>
            <p className='w-15rem'>{props.configuration}</p>
            <div className="flex justify-content-start flex-grow-1">
                <InputText disabled value={props.date}/>
            </div>
        </div>
    )
}