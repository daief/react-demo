import React from 'react';
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import './styles/app.scss';
import D1 from './D1';
import D2 from './D2';
import D3 from './D3';
import D4 from './D4';

const PATHS = [
  '/1', '/2', '/3', '/4'
];

const Nav = withRouter((props) => {
  return (
    <div className="nav">
      {
        PATHS.map(v =>
          <button
            key={v}
            onClick={() => {
              props.history.push(v);
            }}
          >
            {v}
          </button>
        )
      }
    </div>
  );
});

export default (props) => (
  <Router>
    <div className="container">
      <Nav />
      <Switch>
        <Route path="/1"  component={D1} />
        <Route path="/2"  component={D2} />
        <Route path="/3"  component={D3} />
        <Route path="/4"  component={D4} />
      </Switch>
  </div>
  </Router>
);
