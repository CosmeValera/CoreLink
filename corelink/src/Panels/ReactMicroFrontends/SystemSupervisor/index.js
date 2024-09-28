/* eslint-disable react/prop-types */
import React, { Suspense } from 'react'

import Loading from '../../Loading'

const MicrofrontendSystemSupervisorComponent = React.lazy(() =>
  import('sccf_system_supervisor_microfrontend/SystemSupervisorMain')
)

const ReactSupervisorMicroFrontend = (props) => {
  const validSatellites = ["316", "3A5", "3A6", "3A7", "GEN", "261", "262", "263", "264"];
  const satellites = props.satellites.length === 1 ? props.satellites : validSatellites;

  return (
    <Suspense fallback={<Loading />}>
      <MicrofrontendSystemSupervisorComponent satellites={satellites}/>
    </Suspense>
  )
}

export default ReactSupervisorMicroFrontend