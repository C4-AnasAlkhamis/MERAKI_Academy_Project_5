import { combineReducers, createStore } from "redux";
import itemsReducer from "./item/index";
import loginReducer from "./login/index";
import cartReducer from "./cart/index";
import itemInfoReducer from "./itemInfo/index";

const reducers = combineReducers({
  itemsReducer,
  loginReducer,
  cartReducer,
  itemInfoReducer,
});

const store = createStore(reducers);

export default store;
