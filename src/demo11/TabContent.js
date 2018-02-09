import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class TabContent extends React.Component {
  getTabPanes = () => {
    const { classPrefix, activeIndex, panels } = this.props

    return React.Children.map(panels, (child) => {
      if (!child) { return }

      const order = parseInt(child.props.order, 10);
      const isActive = activeIndex === order

      return React.cloneElement(child, {
        classPrefix,
        isActive,
        children: child.props.children,
        key: `tabpane-${order}`,
      })
    })
  }

  render() {
    const { classPrefix } = this.props

    const classes = classnames({
      [`${classPrefix}-content`]: true,
    });

    return (
      <div className={classes}>
        { this.getTabPanes() }
      </div>
    )
  }
}

// 类型检查
TabContent.propTypes = {
  classPrefix: PropTypes.string,
  panels: PropTypes.node,
  activeIndex: PropTypes.number
}
