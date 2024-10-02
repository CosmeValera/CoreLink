import React, { useRef } from 'react';

import SubSysStat from '../components/subsysstat/SubSysStat';
import NavPositioning from '../components/navpositioning/NavPositioning';
import Comms from '../components/comms/Comms';
import Ops from '../components/ops/Ops';
import GeneratePacket from '../components/generate-packet/GeneratePacket';
import { useResizeObserver } from '../helpers/useResizeObserver';

const DomainPage = (props: {satellite: string}) => {
  const divRef = useRef<HTMLInputElement>(null);
  const navPrsHeight = useResizeObserver(divRef);
  
  return (
    <div className="card min-h-full surface-50 p-6 flex flex-column gap-3">
      <div className="grid grid-nogutter">
        <div className="cq-12 cq-xl-6 h-full" ref={divRef}>
          <SubSysStat />
          <Comms/>
        </div>
        <NavPositioning className='cq-12 cq-xl-6' height={navPrsHeight}/>
      </div>
      <Ops />
      <GeneratePacket />
    </div>
  );
}

export default DomainPage;