import { combineReducers, createStore } from "redux";
import cartReducer from "./cart/index";
import loginReducer from "./login/index";
import commentsReducer from "./comment/index";
import itemInfoReducer from "./itemInfo/index";

const reducers = combineReducers({
 cartReducer,
  loginReducer,
  commentsReducer,
  itemInfoReducer,
});

const store = createStore(reducers);

export default store;
