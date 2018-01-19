import React from 'react'

/**
 * react 是核心，react-dom 是提供与 DOM 相关的功能（见入口文件）
 */
export default class Demo01 extends React.Component {
  render() {
    const names = ['Alice', 'Bob', 'Kate']
    // 将模板存储在 js 数组
    const htmls = [
      <p key={1}>hello world</p>,
      <p key={2}>hello react</p>
    ]
    // jsx，支持 html 和 js 得混写，html 直接写在 js 之中
    // 遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析
    return (
      <div>
        demo01
        {
          // Each child in an array or iterator should have a unique "key" prop.
          names.map(_ => <div key={_}>Hello, {_}!</div>)
        }
        {/* 自动展开数组 */}
        { htmls }
      </div>
    )
  }
}