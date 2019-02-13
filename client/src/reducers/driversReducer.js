import _ from "lodash";
import { FETCH_DRIVERS, FETCH_AVAILABLE_DRIVERS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_DRIVERS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_AVAILABLE_DRIVERS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    default:
      return state;
  }
};
