import { RECEIVE_DOG_PARKS } from "../constants/ActionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_DOG_PARKS:
      return [
        ...state,
        ...action.dogParks
      ];
    default:
      return state;
  }
};
