/**
 * demo2:
 * StaggeredMotion 用于编写一串有相互关联关系的实体的动画。
 */
import React from 'react';
import { StaggeredMotion, spring, presets } from 'react-motion';
import range from 'lodash/range';

export default class D2 extends React.Component {
  state = {
    x: 0,
    y: 0,
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
  }

  handleMouseMove = ({ pageX: x, pageY: y }) => {
    this.setState({ x, y });
  }

  handleTouchMove = ({ touches }) => {
    this.handleMouseMove(touches[0]);
  }

  getStyles = (prevStyles) => {
    // `prevStyles` is the interpolated value of the last tick
    const endValue = prevStyles.map((_, i) => {
      return i === 0
        ? this.state
        : {
          x: spring(prevStyles[i - 1].x, presets.gentle),
          y: spring(prevStyles[i - 1].y, presets.gentle),
        };
    });
    return endValue;
  }

  render() {
    return (
      <StaggeredMotion
        defaultStyles={range(10).map(() => ({ x: 0, y: 0 }))}
        styles={this.getStyles}
      >
        {
          balls => (
            <div className="demo2">
              {
                balls.map(({x, y}, i) => (
                  <div
                    key={i}
                    className={`demo2-ball`}
                    style={{
                      backgroundImage: `url(https://img.fgowiki.com/fgo/head/${205 - i}.jpg)`,
                      transform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
                      zIndex: balls.length - i,
                    }}
                  />
                ))
              }
            </div>
          )
        }
      </StaggeredMotion>
    );
  }
}
