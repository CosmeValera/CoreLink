import React from 'react'

import GrafanaEmbed from '../GrafanaEmbed'

const MonicoTabular = (props) => {
  // const views = useViews()

  return (
    <GrafanaEmbed
      {...props}
      title="Grafana tabular panel"
      theme="light"
      url="http://localhost:8000/d-solo/c40b3d29-06eb-4044-abd5-85a7cdd0720c/main-dashboard?orgId=1&from=1533890661826&to=1691657061826&panelId=3"
    />
  )
}

export default MonicoTabular
