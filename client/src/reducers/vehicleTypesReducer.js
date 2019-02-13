import {
  FETCH_VEHICLE_TYPES,
  FETCH_VEHICLE_TYPE,
  EDIT_VEHICLE_TYPE,
  CREATE_VEHICLE_TYPE,
  DELETE_VEHICLE_TYPE
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_VEHICLE_TYPES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_VEHICLE_TYPE:
      return { ...state, [action.payload._id]: "_id" };
    case EDIT_VEHICLE_TYPE:
      return { ...state, [action.payload._id]: "_id" };
    case CREATE_VEHICLE_TYPE:
      return { ...state, [action.payload._id]: "_id" };
    case DELETE_VEHICLE_TYPE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
