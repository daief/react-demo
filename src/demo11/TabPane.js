import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class TabPane extends React.Component {
  render() {
    const { classPrefix, className, isActive, children } = this.props
    const classes = classnames({
      [className]: className,
      [`${classPrefix}-panel`]: true,
      [`${classPrefix}-active`]: isActive,
    })
    return (
      <div
        className={classes}
        role="tabpanel"
        aria-hidden={!isActive}>
        { children }
      </div>
    )
  }
}

// 类型检查
TabPane.propTypes = {
  tab: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  order: PropTypes.string.isRequired,
  diable: PropTypes.bool,
  isActive: PropTypes.bool,
}