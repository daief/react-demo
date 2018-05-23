import React from 'react';
import Footer from './Footer';
import VisibleTodoList from './containers/VisibleTodoList';
import AddTodo from './containers/AddTodo';

class App extends React.Component {
  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    )
  }
}

export default App
