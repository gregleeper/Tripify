import {
  FETCH_SUP_TRIP,
  FETCH_SUP_TRIPS,
  APPROVE_TRIP
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUP_TRIPS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_SUP_TRIP:
      return { ...state, [action.payload._id]: action.payload };
    case APPROVE_TRIP:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
