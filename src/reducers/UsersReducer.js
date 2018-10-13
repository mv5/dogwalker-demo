import {
  REQUEST_USERS,
  UPDATE_USER,
  RECEIVE_USERS,
  RECEIVE_USER,
  USERS_FAILURE
} from "../constants/ActionTypes"


export default (
  state = {
    users: {},
    isFetching: false,
    error: null
  },
  action
) => {
  switch (action.type) {
    case REQUEST_USERS:
    case UPDATE_USER:
      return {
        ...state,
        isFetching: true
      }

    case RECEIVE_USERS:
      return {
        ...state,
        users: action.users,
        isFetching: false
      }

    case RECEIVE_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [action.id]: action.user
        },
        isFetching: false
      }

    case USERS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false
      }

    default:
      return state
  }
}