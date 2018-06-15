import { connect } from 'react-redux';
import { toggleTodo } from '../../../store/actions';
import TodoList from '../TodoList';
import { TodoValue } from '../../../store/modal';

const getVisibleTodos = (todos: TodoValue[], filter: string) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_ALL':
    default:
      return todos;
  }
};

const mapStateToProps = (state: any) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onTodoClick: (id: number) => {
      dispatch(toggleTodo(id))
    },
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

export default VisibleTodoList;
