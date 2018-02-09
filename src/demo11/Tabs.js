import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TabNav from './TabNav';
import TabContent from './TabContent';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);

    const currProps = this.props

    this.handleTabClick = this.handleTabClick.bind(this)

    let activeIndex;
    if ('activeIndex' in currProps) {
      activeIndex = currProps.activeIndex;
    } else if ('defaultActiveIndex' in currProps) {
      activeIndex = currProps.defaultActiveIndex
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeIndex' in nextProps) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
    }
  }

  handleTabClick(activeIndex) {
    const prevIndex = this.state.activeIndex;

    if (this.state.activeIndex !== activeIndex &&
        'defaultActiveIndex' in this.props) {
      this.setState({
        activeIndex,
        prevIndex,
      });

      this.props.onChange({ activeIndex, prevIndex });
    }
  }

  renderTabNav() {
    const { classPrefix, children } = this.props;

    return (
      <TabNav
        key="tabBar"
        classPrefix={classPrefix}
        onTabClick={this.handleTabClick}
        panels={children}
        activeIndex={this.state.activeIndex}
      />
    );
  }

  renderTabContent() {
    const { classPrefix, children } = this.props;

    return (
      <TabContent
        key="tabcontent"
        classPrefix={classPrefix}
        activeIndex={this.state.activeIndex}
        panels={children}
      />
    );
  }

  render() {
    const { className } = this.props;
    const cx = classnames(className, 'ui-tabs');

    return (
      <div className={cx}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    );
  }
}

Tabs.propTypes = {

}

Tabs.defaultProps = {
  classPrefix: 'tabs',
  onChange: () => {}
}