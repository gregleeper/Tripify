import { FETCH_DRIVER_TRIP, FETCH_DRIVER_TRIPS } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_DRIVER_TRIPS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_DRIVER_TRIP:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
