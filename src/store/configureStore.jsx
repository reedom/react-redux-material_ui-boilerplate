import {compose, applyMiddleware, createStore, combineReducers} from "redux";
import todos from "../reducers/todos";
import {routerReducer} from "react-router-redux";
import thunkMiddlware from "redux-thunk"

export default function configureStore(initialState) {

  const reducer = combineReducers({
    todos,
    routing: routerReducer
  });

  const isDevEnv = process.env.NODE_ENV === 'development';

  const store = createStore(
	reducer,
	initialState,
	(isDevEnv && window.devToolsExtension) ?
	compose(applyMiddleware(thunkMiddlware), window.devToolsExtension()) :
	applyMiddleware(thunkMiddlware)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
