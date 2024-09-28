import React from 'react'
import PropTypes from 'prop-types'

const IframeWidget = (props) => {
  const { title, ...rest } = props

  return (
    <iframe
      title={title}
      style={{
        border: 'none',
        verticalAlign: 'middle',
      }}
      {...rest}
    ></iframe>
  )
}

IframeWidget.defaultProps = {
  width: '100%',
  height: '100%',
}

IframeWidget.propTypes = {
  // NOTE all these props (except title, which causes eslint errors) are passed
  // as rest props
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default IframeWidget
