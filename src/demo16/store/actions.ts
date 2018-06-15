let nextTodoId: number = 0;

export function addTodo(text: string) {
  nextTodoId += 1;
  return {
    type: 'ADD_TODO',
    id: nextTodoId,
    text,
  };
};

export function setVisibilityFilter(filter: string) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
}

export function toggleTodo(id: number) {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
}
