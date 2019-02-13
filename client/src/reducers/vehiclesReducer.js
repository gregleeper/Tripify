import {
  EDIT_VEHICLE,
  FETCH_VEHICLE,
  FETCH_VEHICLES,
  DELETE_VEHICLE,
  ADD_VEHICLE,
  FETCH_AVAILABLE_VEHICLES
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case EDIT_VEHICLE:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_VEHICLE:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_VEHICLES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_AVAILABLE_VEHICLES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case DELETE_VEHICLE:
      return _.omit(state, action.payload);
    case ADD_VEHICLE:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
