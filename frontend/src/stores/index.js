import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { combineReducers } from "redux";
import users from "../stores/reducers/users";

const rootReducer = combineReducers({
  users,
});
export default createStore(rootReducer, applyMiddleware(thunk));
