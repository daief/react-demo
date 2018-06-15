import React from 'react'
import Singleton, { preventScroll, recoverScroll } from './Singleton'
import { TransitionMotion, spring } from 'react-motion'

export default class Alert extends React.Component {
  state = {
    show: false,
  }

  componentDidUpdate(_, preState) {
    const { show } = this.state;
    if (preState.show !== show && show) {
      preventScroll()
    } else {
      recoverScroll()
    }
  }

  componentWillUnmount() {
    recoverScroll()
  }

  willEnter = () => ({ opacity: 0 })

  willLeave = () => ({ opacity: spring(0) })

  render() {
    const {show} = this.state;

    return (
      <TransitionMotion
        styles={ show ? [{ key: 'alert', style: { opacity: spring(1) }}] : []}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {
          (interpolatedStyles) => (
            interpolatedStyles[0] ? (
              // Alert begin
              <div className="Alert" style={{ opacity: interpolatedStyles[0].style.opacity }}>
                <div className="mask"/>
                <div className="container">
                  Alert
                  <button onClick={() => {
                    alert
                      .hide()
                      .catch(() => {
                        this.setState({ show: false });
                      });
                  }}>close</button>
                </div>
              </div>
              // Alert end
            ) : null
          )
        }
      </TransitionMotion>
    );
  }
}

export const alert = new Singleton(Alert)
