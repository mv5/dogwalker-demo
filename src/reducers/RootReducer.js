import { combineReducers } from "redux";
import usersData from "./UsersReducer";
import mapSettings from "./MapSettingsReducer"
import dogParks from "./DogParksReducer"

export default combineReducers({
  usersData,
  mapSettings,
  dogParks
});
