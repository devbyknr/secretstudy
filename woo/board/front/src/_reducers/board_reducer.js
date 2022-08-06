import {
  BOARD_LIST,
  REGISTER_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case BOARD_LIST:
      return { ...state, listLoadSuccess: action.payload };
    case REGISTER_BOARD:
      return { ...state, registSuccess: action.payload };
    case UPDATE_BOARD:
      return { ...state, updateSuccess: action.payload };
    case DELETE_BOARD:
      return { ...state, deleteSuccess: action.payload };
    default:
      return state;
  }
}
