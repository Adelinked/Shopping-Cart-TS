import { INC, DEC, RESET } from "../types";

export const setCount = (p) => (dispatch) => {
  dispatch({ type: p });
};
