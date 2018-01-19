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