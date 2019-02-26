import * as React from 'react'
const {useState} = React

export const Counter: React.SFC = () => {
  // useState returns a pair: the current state value and a function that lets you update it
  const [count, setCount] = useState(0)
  return (
    <div style={{border: '1px solid black', padding: 10}}>
      <h1>N: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}