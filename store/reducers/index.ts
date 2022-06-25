import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import countReducer from "./countsReducer";

export default combineReducers({
  cart: cartReducer,
  count: countReducer,
});
