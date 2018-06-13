/**
 * demo 1:
 * simple transition
 * spring: (val: number, config?: SpringHelperConfig) => OpaqueConfig
 * spring(10, {stiffness: 120, damping: 17}) means "animate to value 10, with a spring of stiffness 120 and damping 17".
 */
import React from 'react';
import { Motion, spring } from 'react-motion';

export default class D1 extends React.Component {
  state = {
    open: false,
  }

  handleClick = () => {
    this.setState(({ open }) => ({
      open: !open,
    }));
  }

  render() {
    return (
      <div>
        <button
          onClick={this.handleClick}
        >
          Toggle
        </button>

        <Motion
          style={{ x: spring(this.state.open ? document.body.clientWidth - 50 : 0) }}
        >
          {
            // children is a callback which should accept the current value of
            // `style`
            ({x}) => (
              <div style={style1}>
                <div
                  style={{
                    ...style2,
                    transform: `translate3d(${x}px, 0, 0)`,
                  }}
                />
              </div>
            )
          }
        </Motion>
      </div>
    );
  }
}

const style1 = {
  borderRadius: 4,
  backgroundColor: 'rgb(240, 240, 232)',
  position: 'relative',
  margin: '5px 0 10px',
  width: '100%',
  height: 50,
};
const style2 = {
  position: 'absolute',
  width: 50,
  height: 50,
  borderRadius: 4,
  backgroundColor: 'rgb(130, 181, 198)',
};