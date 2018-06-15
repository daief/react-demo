import { combineReducers } from 'redux';
import {TodoValue, ActionValue} from './modal';

function getDefault(): TodoValue[] {
  return [
    {
      id: -1,
      text: '-1',
      completed: false,
    },
    {
      id: -2,
      text: '-2',
      completed: false,
    }
  ];
}

const todos = (state: TodoValue[] = getDefault(), action: ActionValue) => {
  switch (action.type) {
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

const visibilityFilter = (state: string = 'SHOW_ALL', action: ActionValue) => {
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
