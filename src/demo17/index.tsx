/*
 * @Author: daief
 * @Date: 2018-07-19 16:21:34
 * @LastEditors: daief
 * @LastEditTime: 2018-07-19 16:22:26
 * @Description: 统计视频观看时长
 */
import * as React from "react";
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import Page from './Page';

export default class Demo16 extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Page} />
        </Switch>
      </Router>
    );
  }
}
