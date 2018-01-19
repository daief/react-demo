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