import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { lazyLoad } from './Bundle';
import { lazyLoad as lazyLoad2 } from './Bundle.import';
// import Page1 from 'bundle-loader?lazy&name=page1!./pages/Page1';
// import Page2 from 'bundle-loader?lazy&name=page2!./pages/Page2';
// import Page1 from './pages/Page1';
// import Page2 from './pages/Page2';
const Page1 = lazyLoad2(() => import('./pages/Page1'));
const Page2 = lazyLoad2(() => import('./pages/Page2'));

// export default () => (
//   <Router>
//     <Switch>
//       <Route path="/1" component={lazyLoad(Page1)} />
//       <Route path="/2" component={lazyLoad(Page2)} />
//     </Switch>
//   </Router>
// );

export default () => (
  <Router>
    <Switch>
      <Route path="/1" component={Page1} />
      <Route path="/2" component={Page2} />
    </Switch>
  </Router>
);
