import _ from "lodash";
import {
  FETCH_USERS,
  EDIT_USER,
  FETCH_USER,
  DELETE_USER,
  CREATE_USER
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case EDIT_USER:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_USER:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_USERS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case DELETE_USER:
      return _.omit(state, action.payload);
    case CREATE_USER:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
