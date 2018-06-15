import React from 'react'
import Singleton, { preventScroll, recoverScroll } from './Singleton'

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

  render() {
    return this.state.show ? (
      <div className="Alert">
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
    ) : null;
  }
}

export const alert = new Singleton(Alert)
