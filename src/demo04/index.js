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