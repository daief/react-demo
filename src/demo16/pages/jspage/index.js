/*
 * @Author: daief
 * @Date: 2018-06-15 17:42:12
 * @LastEditors: daief
 * @LastEditTime: 2018-06-15 17:43:53
 * @Description: 原生的 js 组件模块，想要在 typescript 中使用，
 * 编写相应的声明文件，在相同目录下新建 index.d.ts
 */
import React from 'react';

export default class JSPage extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>js page</div>
    );
  }
}