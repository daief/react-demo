/**
 * demo4:
 * TransitionMotion 用于组件装载和卸载时的动画
 */
import React from 'react';
import {TransitionMotion, spring} from 'react-motion'

export default class D4 extends React.Component {
  state = {
    items: [
      { key: 'a', size: 10 },
      { key: 'b', size: 20 },
      { key: 'c', size: 30 },
    ],
  }

  willEnter = () => ({ scale: 0 })

  willLeave = () => ({ scale: spring(0) })

  rmItem = () => {
    const { items } = this.state;
    this.setState({
      items: items.slice(0, -1),
    });
  }

  addItem = () => {
    const sizearr = [10, 20, 30];
    const { items } = this.state;
    this.setState({
      items: [...items, { key: `${Date.now()}`, size: sizearr[Number.parseInt(Math.random() * sizearr.length)]}],
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.rmItem}>rm item</button>
        <button onClick={this.addItem}>add item</button>
        <TransitionMotion
          willEnter={this.willEnter}
          willLeave={this.willLeave}
          styles={this.state.items.map(item => ({
            key: item.key,
            style: { scale: spring(1) },
            data: {...item},
          }))}>
          {interpolatedStyles =>
            // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
            <div>
              {interpolatedStyles.map(config => {
                const {style, data} = config;
                const {size} = data;
                const {scale} = style;
                return <div key={config.key} style={{ width: size * 2, height: size * 2, transform: `scale(${scale})`, border: '1px solid'}} />
              })}
            </div>
          }
        </TransitionMotion>
      </div>
    );
  }
}