import React from 'react'
import StcGEN from '../components-gen/stc/StcGEN';
import StmTcpIpGEN from '../components-gen/stm/StmTcpIpGEN';


const DomainGENPage = (props: {domain: string}) => {
  return (
    <div className="card min-h-full surface-50 p-6 flex flex-column gap-3">
      <div className="grid grid-nogutter" >
        <div className="cq-12">
          <StcGEN />
        </div>
        <div className="cq-12">
          <StmTcpIpGEN />
        </div>
      </div>
    </div>
  );
}

export default DomainGENPage;