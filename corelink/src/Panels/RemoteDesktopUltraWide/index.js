import React from 'react'
import PropTypes from 'prop-types'

import GuacamoleRemoteDesktop from '../GuacamoleRemoteDesktop'

// NOTE used to calculate the width of the iframe using a rule of three
const WIDTH = 5760
const HEIGHT = 1080

// NOTE used to account for horizontal scrollbar
const SCROLLBAR_WIDTH = 16

const RemoteDesktopUltraWide = (props) => {
  const { height: panelHeight } = props

  // REVIEW scrollbar sometimes not displayed when no pointing device connected
  const height = panelHeight - SCROLLBAR_WIDTH
  const width = (height * WIDTH) / HEIGHT

  return (
    <GuacamoleRemoteDesktop
      id="MwBjAHBvc3RncmVzcWw"
      width={width}
      height={height}
    />
  )
}

RemoteDesktopUltraWide.propTypes = {
  height: PropTypes.number.isRequired,
}

export default RemoteDesktopUltraWide
