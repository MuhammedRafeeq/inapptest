import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import auth from "./reducers/auth";
import { composeWithDevTools } from "redux-devtools-extension";
import { mySaga } from "./sagas";

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
  combineReducers({
    auth,
  }),
  composeWithDevTools(
    applyMiddleware(sagaMiddleWare)
    // other store enhancers if any
  )
);

sagaMiddleWare.run(mySaga);

export default store;
