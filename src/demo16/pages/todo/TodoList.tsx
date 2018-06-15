import * as React from 'react';
import Todo from './Todo';
import { TodoValue } from '../../store/modal';

interface TodoListProps {
  todos: TodoValue[];
  onTodoClick: any;
}

const TodoList = ({ todos, onTodoClick }: TodoListProps) => (
  <ul>
    {
      todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      ))
    }
  </ul>
);

export default TodoList;
