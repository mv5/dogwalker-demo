import { UPDATE_SNACKBAR, CLOSE_SNACKBAR } from "../constants/ActionTypes";
const defaultState = {
    open: false,
    message: ""
}  

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_SNACKBAR:
      return {
        ...state,
        ...action.snackbar
      };
    case CLOSE_SNACKBAR:
      return defaultState
    default:
      return state;
  }
};
