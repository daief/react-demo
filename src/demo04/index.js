import React from 'react'
/**
 * 从父组件访问子节点的 DOM 节点，建议在子节点上暴露一个特殊的属性。
 * 子节点将会获得一个函数属性，并将其作为 ref 属性附加到 DOM 节点。
 * 这允许父代通过中间件将 ref 回调给子代的 DOM 节点。
 */
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