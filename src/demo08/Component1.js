import React from 'react'
import {
  observer
} from 'mobx-react'
import { store } from './store'

export default observer(class Component1 extends React.Component {
  render() {
    return (
      <div>
        Component1:
        <br/>
        <button onClick={() => { store.fakeAsyncPushList() }}>fakeAsyncPushList</button>
        {
          store.list.map((val, idx) => {
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
})
