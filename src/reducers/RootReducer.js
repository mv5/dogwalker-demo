import { combineReducers } from "redux";
import usersData from "./UsersReducer";
import mapSettings from "./ChangeMapSettingsReducer"

export default combineReducers({
  usersData,
  mapSettings
});
