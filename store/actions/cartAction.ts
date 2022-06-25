import { INC_ITEM, DEC_ITEM, REMOVE_ITEM, FETCH_ITEMS } from "../types";

export const setCart = (p, id) => (dispatch) => {
  dispatch({ type: p, payload: id });
};

export const loadingCart = () => (dispatch) => {
  dispatch({ type: "LOADING_CART", payload: [] });
};

export const fetchItems = () => async (dispatch) => {
  dispatch(loadingCart());
  const url = "./api/items";
  const response = await fetch(url);
  const cart = await response.json();

  dispatch({ type: "FETCH_ITEMS", payload: cart });
  return null;
};
