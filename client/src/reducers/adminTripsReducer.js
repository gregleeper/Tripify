import {
  FETCH_ADMIN_TRIP,
  FETCH_ADMIN_TRIPS,
  ARRANGE_TRIP
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADMIN_TRIPS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_ADMIN_TRIP:
      return { ...state, [action.payload._id]: action.payload };
    case ARRANGE_TRIP:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
