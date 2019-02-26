import * as React from 'react'
import {useReducer} from 'react'

interface State {
  count: number
}

interface Action {
  type: string
  payload?: number
}

function init(count: number) {
  return { count }
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

export const CounterReducer: React.SFC<{
  initialCount: number
}> = ({initialCount}) => {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <div style={{border: '1px solid black', padding: 10}}>
      Count: {state.count}
      <br/>
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <br/>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <br/>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </div>
  );
}