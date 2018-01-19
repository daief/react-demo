import React from 'react'
import PropTypes from 'prop-types'

export default class Demo03 extends React.Component {
  render() {
    return (
      <div>name: { this.props.name }</div>
    )
  }
}

Demo03.propTypes = {
  name: PropTypes.string.isRequired
}