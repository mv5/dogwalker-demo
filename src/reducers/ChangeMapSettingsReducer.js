import { CHANGE_MAP_SETTINGS } from "../constants/ActionTypes";
import { mapSettings } from "../constants/MapSettings";

export default (state = mapSettings, action) => {
  switch (action.type) {
    case CHANGE_MAP_SETTINGS:
      return action.mapSettings;
    default:
      return state;
  }
};
