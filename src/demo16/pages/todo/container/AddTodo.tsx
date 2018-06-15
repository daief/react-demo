import * as React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../../../store/actions';

interface AddTodoProps {
  dispatch: Function;
}

const AddTodo = ({ dispatch }: AddTodoProps) => {
  let input: any;

  return (
    <div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input
          style={{
            border: '1px solid #ccc',
          }}
          ref={(node: any) => {
            input = node
          }}
        />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
};

export default connect()(AddTodo);