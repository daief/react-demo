/*
 * @Author: daief
 * @Date: 2018-06-19 10:14:03
 * @LastEditors: daief
 * @LastEditTime: 2018-06-19 13:52:39
 * @Description: The goal of this project is to provide a set of simple samples,
 * providing and step by step guide to start working with React and Typescript.
 * from: https://github.com/Lemoncode/react-typescript-samples
 */
import * as React from 'react';
import { HashRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import HelloReact from './samples/HelloReact';
import Components from './samples/Components';
import DispalyData from './samples/DispalyData';
import Form from './samples/Form';

export default class ReactSamples extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    const { match } = this.props;
    return (
      <Router>
        <Switch>
          <Route exact path={`${match.url}/`} component={HelloReact} />
          <Route path={`${match.url}/hello-react`} component={HelloReact} />
          <Route path={`${match.url}/components`} component={Components} />
          <Route path={`${match.url}/dispaly-data`} component={DispalyData} />
          <Route path={`${match.url}/form`} component={Form} />
        </Switch>
      </Router>
    );
  }
}