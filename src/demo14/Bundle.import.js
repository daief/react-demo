/*
 * @Author: daief
 * @Date: 2018-06-14 14:23:43
 * @LastEditors: daief
 * @LastEditTime: 2018-06-14 14:23:43
 * @Description:
 */
import React from 'react'

export default class Bundle extends React.Component {
  state = {
    mode: null,
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load = async (props) => {
    this.setState({
      mod: null
    });
    /*
      使用 props.load() 返回的是一个 promise
      */
    const mod = await props.load();

    this.setState({
      mod: mod.default ? mod.default : mod
    });
  }

  render() {
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