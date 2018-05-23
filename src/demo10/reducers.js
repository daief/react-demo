import { combineReducers } from 'redux';
import {
  LOADING,
  SET_DATA,
} from './actions';

// function setLoading(state = false, { type, isLoading }) {
//   switch(type) {
//     case LOADING:
//       return isLoading;
//     default:
//       return state;
//   }
// }

// function setData(state = '', { type, data }) {
//   switch(type) {
//     case SET_DATA:
//       return data;
//     default:
//       return state;
//   }
// }

// const rootReducer = combineReducers({
//   setLoading,
//   setData,
// });

const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? ({ ...todo, completed: !todo.completed })
          : todo
      );
    default:
      return state;
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
});

export default rootReducer;
