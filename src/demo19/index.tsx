/**
 * simple demo for React Hooks
 * ref:
 *  - https://github.com/dt-fe/weekly/blob/master/79.%E7%B2%BE%E8%AF%BB%E3%80%8AReact%20Hooks%E3%80%8B.md
 *
 */

import * as React from 'react'
import { Counter } from './Counter';
import { CounterReducer } from './CounterReducer';

export default class Demo19 extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>demo 19</h1>
        <Counter />
        <CounterReducer initialCount={1}  />
      </div>
    )
  }
}