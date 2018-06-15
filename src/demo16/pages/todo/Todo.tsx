import * as React from 'react';

interface ToDoProps {
  onClick: any;
  completed: boolean;
  text: string;
}

const Todo = ({ onClick, completed, text }: ToDoProps) => (
  <li
    onClick={onClick}
    style={{
      transition: 'all .3s',
      textDecoration: completed ? 'line-through' : 'none',
      color: completed ? '#aaa' : '#000',
      height: 30,
      lineHeight: '30px',
    }}
  >
    { text }
  </li>
);

export default Todo;
