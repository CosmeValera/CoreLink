import React, { useRef } from 'react';

import MMsatStat from '../components/mmsatstat/MMsatStat';
import NavPrs from '../components/navprs/NavPrs';
import Stc from '../components/stc/Stc';
import Stm from '../components/stm/Stm';
import GeneratePacket from '../components/generate-packet/GeneratePacket';
import { useResizeObserver } from '../helpers/useResizeObserver';

const DomainPage = (props: {satellite: string}) => {
  const divRef = useRef<HTMLInputElement>(null);
  const navPrsHeight = useResizeObserver(divRef);
  
  return (
    <div className="card min-h-full surface-50 p-6 flex flex-column gap-3">
      <div className="grid grid-nogutter">
        <div className="cq-12 cq-xl-6 h-full" ref={divRef}>
          <MMsatStat />
          <Stc/>
        </div>
        <NavPrs className='cq-12 cq-xl-6' height={navPrsHeight}/>
      </div>
      <Stm />
      <GeneratePacket />
    </div>
  );
}

export default DomainPage;