import React from 'react'

import GrafanaEmbed from '../GrafanaEmbed'

const MonicoDashboard = (props) => {
  return (
    <GrafanaEmbed
      {...props}
      title="Grafana dashboard"
      theme="light"
      url="http://localhost:8000/d/c40b3d29-06eb-4044-abd5-85a7cdd0720c/main-dashboard?orgId=1&from=now-5y&to=now&kiosk=true"
    />
  )
}

export default MonicoDashboard
