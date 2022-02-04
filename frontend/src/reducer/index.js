import { combineReducers, createStore } from "redux";
import cartReducer from "./cart/index";
import itemsReducer from "./item/index";
import loginReducer from "./login/index";
import cartReducer from "./cart/index";
import itemInfoReducer from "./itemInfo/index";
import wishlistReducer from "./wishlist/index";

const reducers = combineReducers({
 cartReducer,
  itemsReducer,
  loginReducer,
  cartReducer,
  itemInfoReducer,
  wishlistReducer
});

const store = createStore(reducers);

export default store;
