#### React & Mobx demo
[中文文档](http://cn.mobx.js.org/)

基本使用：
- observable： 用来绑定需要观察变动的数据
- computed：计算属性，与 Vue 的类似
- autorun：用来注册数据变化时的响应操作，该方法返回一个函数，调用后取消响应的注册
- action：严格模式下唯一更改状态的方法
- useStrict：开启严格模式


```javascript
// store.js
import {
  // 使用注解的话直接用这个
  observable, 
  // 不使用@注解的时候用该方法
  extendObservable
  computed, 
  autorun,
  action,
  useStrict
} from 'mobx'

useStrict(true)

class Store {
  constructor() {
    extendObservable(this, {
      list: [1, 2],
      // computed
      listToString: () => {
        return this.list.join('#')
      }
    })
  }

  // action在执行时是可以接受参数的，而且action在执行后还会返回fn参数的返回值
  pushList = action((arg = 1) => {
    this.list.push((Math.random() * 10))
  })

  // fakeAsyncPushList 直接用 action 包裹没有用，内含异步操作
  // 在异步操作执行的时候进行包裹
  fakeAsyncPushList = () => {
    setTimeout(action(() => {
      this.list.push((Math.random() * 10 - 10))
    }), 1000)
  }
}

const store = new Store()

autorun(() => {
  console.log(store.listToString())
})

export {
  store
}
```

然后要把组件注册成观察者（observer）：
```javascript
// Component.js
import React, {
  Component
} from 'react'
// observer 方法由 mobx-react 提供
import { observer } from 'mobx-react'
import {
  store
} from './store'

// 组件想要相应mobx的变化，用于将ReactJS组件转换为响应式组件。
// 它将组件中的render函数包在mobx.autorun中以确保组件渲染期间使用的任何数据变化时强制重新渲染。
// 它通过单独的mobx-react包提供。
// 以下是不使用注解的方式
export default observer(class Component2 extends Component {
  render() {
    return (
      <div>
        <button onClick={() => { store.pushList() }}>同步改变</button>
        <button onClick={() => { store.fakeAsyncPushList() }}>异步改变</button>
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
```