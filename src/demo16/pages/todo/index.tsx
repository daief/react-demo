import * as React from 'react';
import VisibleTodoList from './container/VisibleTodoList';
import Footer from './Footer';
import AddTodo from './container/AddTodo';

// 'any' describes the shape of props.
// State is never set so we use the '{}' type.
export default class Todo extends React.Component<any, {}> {
  constructor(props:any) {
    super(props);

    console.log(props.location)
  }

  render() {
    return (
      <div>
        <AddTodo />
        <Footer />
        <VisibleTodoList />
      </div>
    );
  }
}