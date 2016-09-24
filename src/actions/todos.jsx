import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';

export const addTodo = createAction(types.ADD_TODO, text => {
  return new Promise((resolve, reject) => setTimeout(() => resolve(text), 0));
});
export const deleteTodo     = createAction(types.DELETE_TODO);
export const editTodo       = createAction(types.EDIT_TODO,     (id, text) => { return { id, text } });
export const completeTodo   = createAction(types.COMPLETE_TODO);
export const completeAll    = createAction(types.COMPLETE_ALL);
export const clearCompleted = createAction(types.CLEAR_COMPLETED);

