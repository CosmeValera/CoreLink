import React, {useRef} from 'react'; 
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function GeneratePacket() {
	const toast = useRef<Toast>(null);
    return (
        <div className="card flex justify-content-center">
			<Toast ref={toast} />
            <Button label="Generate Packet" rounded onClick={()=>{
                toast.current?.show({ severity: 'success', summary: 'Succesful packet', detail: <p>Packet generated succesfully!</p>, life: 3000 });
            }}/>
        </div>
    )
}