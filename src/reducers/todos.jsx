import {ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED} from '../constants/ActionTypes';
import { List, Map } from 'immutable';

const initialState = List.of(
  Map({
	text: 'Use Redux',
	completed: false,
	id: 0
  })
);

let lastId = 0;

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.push(Map({
        id: ++lastId,
        completed: false,
        text: action.payload
      }))

    case DELETE_TODO:
      return state.filter(todo =>
        todo.get('id') !== action.payload
      );

    case EDIT_TODO:
      return state.map(todo =>
        todo.get('id') === action.payload.id ? todo.set('text', action.payload.text) : todo
      );

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.get('id') === action.payload ? todo.set('completed', !todo.get('completed')) : todo
	  );

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.get('completed'));
      return state.map(todo => todo.set('completed', !areAllMarked));

    case CLEAR_COMPLETED:
      return state.filter(todo => !todo.get('completed'));

    default:
      return state;
  }
}
