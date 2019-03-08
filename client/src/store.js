import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initalState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initalState,
  compose(applyMiddleware(...middleware)),
  window._REDUX_DEVTOOLS_EXTENSION_ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
