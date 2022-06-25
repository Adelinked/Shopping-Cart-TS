import {
  INC_ITEM,
  DEC_ITEM,
  REMOVE_ITEM,
  FETCH_ITEMS,
  LOADING_CART,
  CLEAR_CART,
} from "../types";

const initialState = {
  loading: false,
  cart: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_CART:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ITEMS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    case INC_ITEM:
      return {
        ...state,
        cart: state.cart.map((i) => {
          if (i.id === action.payload) {
            return { ...i, amount: i.amount + 1 };
          } else {
            return { ...i };
          }
        }),
      };
    case DEC_ITEM:
      return {
        ...state,
        cart: state.cart
          .map((i) => {
            if (i.id === action.payload) {
              return { ...i, amount: i.amount === 0 ? 0 : i.amount - 1 };
            } else return { ...i };
          })
          .filter((i) => i.amount !== 0),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}
