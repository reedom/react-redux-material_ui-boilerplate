import {createStore, combineReducers} from "redux";
import todos from "../reducers/todos";
import {routerReducer} from "react-router-redux";

export default function configureStore(initialState) {

  const reducer = combineReducers({
    todos,
    routing: routerReducer
  });

  const store = createStore(
    reducer,
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : undefined
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
