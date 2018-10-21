import { combineReducers } from "redux";
import usersData from "./UsersReducer";
import mapSettings from "./MapSettingsReducer"
import dogParks from "./DogParksReducer"
import snackbar from "./SnackbarReducer"

export default combineReducers({
  usersData,
  mapSettings,
  dogParks,
  snackbar
});
