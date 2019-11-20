import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducers } from './modules';

const rootReducers = combineReducers(reducers);
let store;
store = createStore(
  rootReducers,
  applyMiddleware(thunk, logger)
);
export default store;