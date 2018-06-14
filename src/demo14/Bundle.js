/*
 * @Author: daief
 * @Date: 2018-06-13 17:32:55
 * @LastEditors: daief
 * @LastEditTime: 2018-06-14 11:30:10
 * @Description:
 */
import React from 'react';

export default class Bundle extends React.Component {
  state = {
    mod: null
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  // load 方法，用于更新 mod 状态
  load(props) {
    // 初始化
    this.setState({
      mod: null
    });
    /*
      调用传入的 load 方法，并传入一个回调函数
      这个回调函数接收 在 load 方法内部异步获取到的组件，并将其更新为 mod
    */
    props.load(mod => {
      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    /*
      将存在状态中的 mod 组件作为参数传递给当前包装组件的'子'
    */
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

// 默认加载组件，可以直接返回 null
const Loading = () => <div>Loading...</div>;

/*
  包装方法，第一次调用后会返回一个组件（函数式组件）
  由于要将其作为路由下的组件，所以需要将 props 传入
*/
export const lazyLoad = (loadComponent) => (props) => (
  <Bundle load={loadComponent}>
    { Comp => (Comp ? <Comp {...props} /> : <Loading />) }
  </Bundle>
);
