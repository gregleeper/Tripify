import {
  EDIT_TRIP,
  FETCH_TRIP,
  FETCH_USER_TRIPS,
  DELETE_TRIP,
  CREATE_TRIP
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case EDIT_TRIP:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_TRIP:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_USER_TRIPS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case DELETE_TRIP:
      return _.omit(state, action.payload);
    case CREATE_TRIP:
      return { ...action.payload };
    default:
      return state;
  }
};
