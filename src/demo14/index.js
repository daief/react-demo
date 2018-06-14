import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { lazyLoad } from './Bundle';
import Page1 from 'bundle-loader?lazy&name=page1!./pages/Page1';
import Page2 from 'bundle-loader?lazy&name=page2!./pages/Page2';

export default () => (
  <Router>
    <Switch>
      <Route path="/1" component={lazyLoad(Page1)} />
      <Route path="/2" component={lazyLoad(Page2)} />
    </Switch>
  </Router>
);
