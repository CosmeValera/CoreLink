import React from 'react'

import GrafanaEmbed from '../GrafanaEmbed'

const MonicoTimeSeries = (props) => {
  return (
    <GrafanaEmbed
      {...props}
      title="Grafana time series panel"
      theme="light"
      url="http://localhost:8000/d-solo/c40b3d29-06eb-4044-abd5-85a7cdd0720c/main-dashboard?orgId=1&from=1533925395899&to=1691691795899&panelId=4"
    />
  )
}

export default MonicoTimeSeries
