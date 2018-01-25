import React, {
  Component
} from 'react'
import { observer } from 'mobx-react'
import {
  store
} from './store'

// 组件想要相应mobx的变化，用于将ReactJS组件转换为响应式组件。
// 它将组件中的render函数包在mobx.autorun中以确保组件渲染期间使用的任何数据变化时强制重新渲染。
// 它通过单独的mobx-react包提供。
export default observer(class Component2 extends Component {

  render() {
    return (
      <div>
        Component2:
        <br/>
        <button onClick={() => { store.pushList() }}>pushList</button>
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