import thunkMiddleware from 'redux-thunk';
import { Store, createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

export const store: Store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
  ),
);
