import { combineReducers, createStore } from "redux";
import articlesReducer from "./article/index";
import loginReducer from "./login/index";
import commentsReducer from "./comment/index";
import itemInfoReducer from "./itemInfo/index";

const reducers = combineReducers({
  articlesReducer,
  loginReducer,
  commentsReducer,
  itemInfoReducer,
});

const store = createStore(reducers);

export default store;
