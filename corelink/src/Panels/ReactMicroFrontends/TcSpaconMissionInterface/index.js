/* eslint-disable react/prop-types */
import React, { Suspense } from 'react'

import Loading from '../../Loading'

const MicrofrontendMifRemoteComponent = React.lazy(() =>
  import('tc_spacon_mission_interface_microfrontend/TcSpaconMissionInterfaceMain'),
)

const ReactTcSpaconMissionInterface = (props) => {
  const satellite = props.satellites.length === 1 ? props.satellites[0] : null;

  return (
    <Suspense fallback={<Loading />}>
      <MicrofrontendMifRemoteComponent satellite={satellite} />
    </Suspense>
  )
}

export default ReactTcSpaconMissionInterface

