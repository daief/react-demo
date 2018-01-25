import {
  observable, 
  computed, 
  action,
  runInAction,
  useStrict,
  autorun,
  extendObservable
} from 'mobx'

// 使用严格模式只能通过 action 改变值
useStrict(true)

// observable用来绑定数据；
// computed用来绑定计算方法；
// autorun用来注册数据变化时响应的方法，返回的函数用来取消响应。
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

autorun(() => console.log(store.listToString()))

export {
  store
}