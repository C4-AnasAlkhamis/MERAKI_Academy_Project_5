import { combineReducers, createStore } from "redux";
import itemsReducer from "./item/index";
import loginReducer from "./login/index";
import commentsReducer from "./comment/index";
import itemInfoReducer from "./itemInfo/index";

const reducers = combineReducers({
  itemsReducer,
  loginReducer,
  commentsReducer,
  itemInfoReducer,
});

const store = createStore(reducers);

export default store;
