import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from './session'
import questionReducer from './question'
import tagReducer from "./tag";
import userTagReducer from "./userTag"



const rootReducer = combineReducers({
  session: sessionReducer,
  question: questionReducer,
  tag: tagReducer,
  userTag: userTagReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore; // Goes to src/index.js
