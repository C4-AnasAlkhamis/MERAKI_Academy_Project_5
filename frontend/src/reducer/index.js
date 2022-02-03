import { combineReducers, createStore } from "redux";
import articlesReducer from "./article/index";
import loginReducer from "./login/index";
import commentsReducer from "./comment/index";

const reducers = combineReducers({
  articlesReducer,
  loginReducer,
  commentsReducer,
});

const store = createStore(reducers);

export default store;
