import { INC, DEC, RESET } from "../types";

const initialState = {
  count: 0,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case INC:
      return {
        ...state,
        count: state.count + 1,
      };
    case DEC:
      return {
        ...state,
        count: state.count - 1,
      };
    case RESET:
      return {
        ...state,
        count: 0,
      };

    default:
      return state;
  }
}
