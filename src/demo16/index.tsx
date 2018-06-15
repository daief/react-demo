import * as React from "react";
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import JSPage from './pages/jspage';
import Todo from './pages/todo';
import {Provider} from 'react-redux';
import {store} from './store';

export default class Demo16 extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/todo" component={Todo} />
            <Route path="/jspage" component={JSPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
