import React from 'react'
import PropTypes from 'prop-types'

import IframeWidget from '../IframeWidget'

const GuacamoleRemoteDesktop = (props) => {
  const { id, ...rest } = props

  return (
    <IframeWidget
      title="Guacamole remote desktop"
      {...rest}
      src={`https://164.90.165.175:8443/#/client/${id}?username=guacadmin&password=guacadmin`}
    />
  )
}

GuacamoleRemoteDesktop.propTypes = {
  id: PropTypes.string.isRequired,
}

export default GuacamoleRemoteDesktop
