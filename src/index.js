import './index.css'

import React from 'react'
import {render} from 'react-dom'

import App from './App'

// ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。
render(
  <App />,
  document.querySelector('#app')
)
