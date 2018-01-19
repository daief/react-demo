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
      <p onClick={this.handleClick}>count: {this.state.count}. click to add.</p>
    )
  }
}