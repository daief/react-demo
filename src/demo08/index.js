import './style.less'
import React, {
  Component
} from 'react'
import {
  store
} from './store'
import { Provider } from 'mobx-react'
import Component1 from './Component1'
import Component2 from './Component2'


export default class demo08 extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Component1 />
          <Component2 />
        </div>
      </Provider>
    )
  }
}