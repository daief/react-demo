import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'

// 可通过 inject、observer，在组件内通过 props 拿到 store
export default inject('store')(observer(class Component1 extends React.Component {
  render() {
    return (
      <div>
        Component1:
        <br/>
        <button onClick={() => { this.props.store.fakeAsyncPushList() }}>fakeAsyncPushList</button>
        {
          this.props.store.list.map((val, idx) => {
            return (
              <p key={idx}>
                value: {val}
              </p>
            )
          })
        }
      </div>
    )
  }
}))
