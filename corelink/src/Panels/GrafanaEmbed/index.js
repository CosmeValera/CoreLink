import React from 'react'
import IframeWidget from '../IframeWidget'
import PropTypes from 'prop-types'
import { addQueryParam } from './url-utils'

export default function GrafanaEmbed(props) {
  const { title, url, theme, satellites } = props
  let iframeUrl = addQueryParam({
    url,
    name: 'var-satellite',
    value: satellites,
  })

  if (theme) {
    iframeUrl = addQueryParam({ url: iframeUrl, name: 'theme', value: theme })
  }
  return <IframeWidget title={title} src={iframeUrl} />
}

GrafanaEmbed.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
  satellites: PropTypes.arrayOf(PropTypes.string).isRequired,
}
