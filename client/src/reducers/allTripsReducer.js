import { FETCH_ALL_TRIPS } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_TRIPS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    default:
      return state;
  }
};
