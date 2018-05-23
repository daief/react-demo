import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  fakeFetch,
} from './actions';
import App from './components/App';


class Demo10 extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}


export default Demo10
