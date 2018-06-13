### HTML 模板
`react`是核心，`react-dom`是提供与 DOM 相关的功能。

ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

```javascript
import React from 'react'
import {render} from 'react-dom'

render(
  <div>hello react</div>,
  document.querySelector('#app')
)
```
### JSX 语法

jsx，支持 html 和 js 得混写，html 直接写在 js 之中，遇到 HTML 标签（以`<`开头），就用 HTML 规则解析；遇到代码块（以`{`开头），就用 JavaScript 规则解析

```javascript

import React from 'react'

export default class Demo01 extends React.Component {
  render() {
    const names = ['Alice', 'Bob', 'Kate']
    // 将模板存储在 js 数组
    const htmls = [
      <p key={1}>hello world</p>,
      <p key={2}>hello react</p>
    ]
    return (
      <div>
        demo01
        {
          // Each child in an array or iterator should have a unique "key" prop.
          names.map(_ => <div key={_}>Hello, {_}!</div>)
        }
        {/* 自动展开数组 */}
        { htmls }
      </div>
    )
  }
}
```

### 组件
React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。

上述中的 Demo01 就是一个组件。

**注意，组件类的第一个字母必须大写（应该是针对函数的写法，上述类的写法不会报错），否则会报错。另外，组件类只能包含一个顶层标签，否则也会报错。**

**添加组件属性，有一个地方需要注意，就是 class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。**

### this.props.children

this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点。

```javascript
// demo02/index.js
import React from 'react'

export default class Demo02 extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.children.map((child, i) => (
            <li key={i}>{ child }</li>
          ))
        }
      </ul>
    )
  }
}

// index.js
import './index.css'

import React from 'react'
import {render} from 'react-dom'

import App from './demo02'

render(
  <App>
    <span>1</span>
    <span>2</span>
  </App>,
  document.querySelector('#app')
)
```

> this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。

> React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。更多的 React.Children 的方法，请参考[官方文档](https://facebook.github.io/react/docs/top-level-api.html#react.children)。

### PropTypes
组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

> 注意： 从 React v15.5 开始 ，React.PropTypes 助手函数已被弃用，我们建议使用 [prop-types 库](https://www.npmjs.com/package/prop-types) 来定义contextTypes。

```javascript
import React from 'react'
import PropTypes from 'prop-types'

export default class Demo03 extends React.Component {
  render() {
    return (
      <div>name: { this.props.name }</div>
    )
  }
}

Demo03.propTypes = {
  name: PropTypes.string.isRequired
}
```
### 获取真实的 DOM 节点
> 组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。

React 支持给任何组件添加特殊属性。ref 属性接受回调函数，并且当组件 装载(mounted) 或者 卸载(unmounted) 之后，回调函数会立即执行。

React 组件在加载时将 DOM 元素传入 ref 的回调函数，在卸载时则会传入 null。在componentDidMount 或 componentDidUpdate 这些生命周期回调之前执行 ref 回调。

可能希望从父组件访问子节点的 DOM 节点，建议在子节点上暴露一个特殊的属性。子节点将会获得一个函数属性，并将其作为 ref 属性附加到 DOM 节点。这允许父代通过中间件将 ref 回调给子代的 DOM 节点。

```javascript
import React from 'react'

class Child extends React.Component {
  render() {
    return (
      <div>
        Child
        <input type="text" ref={this.props.inputRef}
          style={{border: '1px solid #000'}}/>
      </div>
    )
  }
}

class Parent extends React.Component {
  render(){
    return (
      <div>
        Parent
        <Child inputRef={this.props.inputRef} />
      </div>
    )
  }
}

export default class Grandparent extends React.Component {
  render(){
    return (
      <div onClick={() => { console.log(this.inputDOM.value) }} >
        Grandparent
        <Parent inputRef={el => this.inputDOM = el} />
      </div>
    )
  }
}
```

### this.state

组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI。[更多细节](http://www.css88.com/react/docs/state-and-lifecycle.html)

```javascript
import React from 'react'

export default class Demo05 extends React.Component {
  state = {
    count: 1
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      {/* 点击增加计数 */}
      <p onClick={this.handleClick}>count: {this.state.count}. click to add.</p>
    )
  }
}
```

### 表单

使用 state 与表单控件绑定。
```javascript
import React from 'react'

export default class Demo06 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }

    // 这个绑定是必要的，使`this`在回调中起作用
    this.handleChange = this.handleChange.bind(this)
  }

  // 在 change 事件中设置 state
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <p>value: {this.state.value}</p>
      </div>
    )
  }
}
```

### 生命周期
每个组件都有几个 “生命周期方法” ，您可以重写这些方法，以在过程中的特定时间运行代码。 前缀为`will`的方法在一些事情发生之前被调用，而前缀为`did`的方法在一些事情发生后被调用。[详细文档](http://www.css88.com/react/docs/react-component.html#constructor)

#### Mounting（装载）
当组件实例被创建并将其插入 DOM 时，这些方法将被调用：
- constructor()
- componentWillMount()
- render()
- componentDidMount()

#### Updating(更新)
改变 props 或 state 可以触发更新事件。 在重新渲染组件时，这些方法将被调用：
- componentWillReceiveProps(object nextProps)
- shouldComponentUpdate(object nextProps, object nextState)
- componentWillUpdate(object nextProps, object nextState)
- render()
- componentDidUpdate(object preProps, object preState)

#### Unmounting(卸载)
当一个组件从 DOM 中删除时，这个方法将被调用：
- componentWillUnmount()

### Ajax
> 组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI。

```javascript
import React from 'react'

export default class Demo07 extends React.Component {
  render() {
    return (
      <div>
        <h3>most stars</h3>
        {/* 网络请求传入子组件 */}
        <Display
          promise={fetch('https://api.github.com/search/repositories?q=javascript&sort=stars')}
        ></Display>
      </div>
    )
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null,
      error: null
    }
  }

  // 一般在该周期函数中进行网络请求实例化
  componentDidMount() {
    // 此处接受父组件传递的对象，也可直接在此发起请求
    this.props.promise.then(res => res.json())
      .then(value => this.setState({loading: false, data: value}))
      .catch(error => this.setState({loading: false, error: error}))
  }

  render() {
    return this.state.loading ? <span>Loading...</span> :
      this.state.error ? <span>{ this.state.error }</span> : (
        <div>
          {
            this.state.data.items.map((item, i) => {
              let {name, language, html_url} = item
              return (
                <section key={i} style={{border: '1px solid #ccc'}}>
                  <h3><a href={html_url}>{name}</a></h3>
                  <h4>{language}</h4>
                </section>
              )
            })
          }
        </div>
      )
  }
}
```

### Mobx
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
  extendObservable,
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

### react-router

[官方文档](https://reacttraining.com/react-router/web/api)

Demo09 -- use react-router-dom

BrowserRouter 与 HashRouter：
- BrowserRouter：需要后端配合，url 中不会出现 #
- HashRouter：后端无需进行配置，url 中使用 # 进行路由

excat属性：
- 精确匹配的时候再渲染，`<Route exact path="/" component={Home}/>`

基本使用：
```javascript
import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// home component
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

export default class Demo09 extends React.Component {
  render() {
    return (
      <div>
        Demo09
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>

            {/* exact 精确匹配 */}
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
          </div>
        </Router>
      </div>
    )
  }
}
```
Switch 组件：
- 包含一组 Route，只渲染第一个匹配的路由，如上述例子不加`exact`，Home 组件一直会被渲染

match 对象：
- 包含路由信息

withRouter 方法：
- 将组件包含并返回，组件内可以访问 match, location, history 对象
  > You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will re-render its component every time the route changes with the same props as <Route> render props: { match, location, history }.

### redux

#### redux & react-redux

#### 要点

应用中所有`state`都以一个对象树的形式存在一个单一的`store`中。**唯一改变`state`的方式是触发`action`**，一个描述发生什么的对象。为了描述`action`如何改变`state`树，需要编写`reducers`。

#### Action
本质是 JS 普通对象，约定，**`action`内必须使用一个字符串类型的`type`字段来表示将要执行的动作**。
```javascript
{
  type: 'TOGGLE_TODO',
  // params
  index: 5
}
```

##### Action 创建函数
生成 action 的方法。

```js
// Action 创建函数
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text,
  }
}

// 发起 dispatch
store.dispatch(addTodo(text))
```

> `store` 里能直接通过 `store.dispatch() `调用 `dispatch()` 方法，但是多数情况下你会使用 `react-redux` 提供的 `connect()` 帮助器来调用。`bindActionCreators()` 可以自动把多个 `action` 创建函数 绑定到 `dispatch()` 方法上。

##### 异步 action

使用`redux-thunk`中间件，通过使用指定的 `middleware`，`action` 创建函数除了返回 `action` 对象外还可以返回函数。这时，这个` action` 创建函数就成为了 `thunk`。

当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行。**这个函数并不需要保持纯净，它还可以带有副作用，包括执行异步 API 请求**。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。

#### Reducer
reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

```js
(previousState, action) => newState
```

> 保持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作：
> 1. 修改传入参数；
> 2. 执行有副作用的操作，如 API 请求和路由跳转；
> 3. 调用非纯函数，如 Date.now() 或 Math.random()。

**只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。**

##### 拆分 Reducer

**注意每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。**

```js
const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      // return new todo list
      return newTodoArr;
    default:
      return state;
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  // ...
}

// combineReducers 帮助合并 reducers
const rootReducer = combineReducers({
  todos,
  visibilityFilter,
});

// combineReducers 的合成等价如下
// const rootReducer = (state = {}, action) => {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }

```

你也可以给它们设置不同的 key，或者调用不同的函数。下面两种合成 reducer 方法完全等价：
```js
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})

function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}
```

#### Store

action 来描述“发生了什么”，和使用 reducers 来根据 action 更新 state 的用法。

`Store` 就是把它们联系到一起的对象。Store 有以下职责：
- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数注销监听器。

**再次强调一下 Redux 应用只有一个单一的 store。**

`createStore()` 的第二个参数是可选的, 用于设置 state 初始状态。
```js
const store = createStore(todoApp, window.STATE_FROM_SERVER);
```

#### 在 React 中使用

##### Store 注入（姑且这么说）
所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。但这太麻烦了，因为必须要用 store 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。

建议的方式是使用指定的 React Redux 组件 <Provider> 来让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。
```js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App';


class Index extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default Index

```

##### 展示组件 & 容器组件
创建容器组件把这些展示组件和 Redux 关联起来。建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。（这样你就不必为了性能而手动实现 React 性能优化建议 中的 shouldComponentUpdate 方法。）

使用 connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中。

```js
// Link.js ------------- 展示组件
import React from 'react';

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  );
};

export default Link;


// FilterLink.js ------------- 容器组件
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../../actions';
import Link from '../Link';

// 指定如何把当前 Redux store state 映射到展示组件的 props 中
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};

// 定义 mapDispatchToProps() 方法接收 dispatch() 方法
// 并返回期望注入到展示组件的 props 中的回调方法
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    },
  };
};

// 使用 connect
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

// 如此一来 Link 组件的 props 中就能获取 active & onClick
export default FilterLink;
```

### 动画——[react-motion](https://github.com/chenglou/react-motion) （Demo13）

- `spring: (val: number, config?: SpringHelperConfig)`
  Specifies the how to animate to the destination value, e.g. spring(10, {stiffness: 120, damping: 17}) means "animate to value 10, with a spring of stiffness 120 and damping 17".
- `Motion`适合编写单个组件的动画
- `StaggeredMotion`实现一个联动动画
- `TransitionMotion`适用于组件装载和卸载时的动画