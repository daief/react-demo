import './style.scss'
import React, {
  Component
} from 'react'
import {
  store
} from './store'
import Component1 from './Component1'
import Component2 from './Component2'


export default class demo08 extends Component {
  render() {
    return (
      <div className="app">
        <Component1 />
        <Component2 />
      </div>
    )
  }
}