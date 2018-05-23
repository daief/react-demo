
export const LOADING = 'LOADING';
// 普通 action 创建函数
export function setLoading(isLoading) {
  return {
    type: 'LOADING',
    isLoading,
  };
}

export const SET_DATA = 'SET_DATA';
export function receiveData(data) {
  return {
    type: 'SET_DATE',
    data: data,
  };
}

// thunk action 创建函数
// 虽然内部操作不同，你可以像其它 action 创建函数 一样使用它：
// store.dispatch(fakeFetch())
export function fakeFetch() {

  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。

  return (dispatch) => {
    // 首次 dispatch：更新应用的 state 来通知
    // API 请求发起了。

    dispatch(setLoading(true));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('success');
      }, 1300);
    }).then(res => {
      dispatch(setLoading(false));
      dispatch(receiveData(res));
    });
    // 不要使用 catch，因为会捕获
    // 在 dispatch 和渲染中出现的任何错误，
    // 导致 'Unexpected batch number' 错误。
    // https://github.com/facebook/react/issues/6895
  };
}

// -------------------- todo list
let nextTodoId = 0;
export function addTodo(text) {
  nextTodoId += 1;
  return {
    type: 'ADD_TODO',
    id: nextTodoId,
    text,
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
}

export function toggleTodo(id) {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
}