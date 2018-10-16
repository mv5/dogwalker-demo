import { CHANGE_MAP_SETTINGS } from "../constants/ActionTypes";
import { defaultMapSettings } from "../constants/MapSettings";

export default (state = defaultMapSettings, action) => {
  switch (action.type) {
    case CHANGE_MAP_SETTINGS:
      return {
        ...state,
        ...action.mapSettings
      }
    default:
      return state;
  }
};
