import {
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATIONS,
  EDIT_ORGANIZATION,
  CREATE_ORGANIZATION,
  DELETE_ORGANIZATION
} from "../actions/types";

import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORGANIZATIONS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_ORGANIZATION:
      return { ...state, [action.payload._id]: "_id" };
    case EDIT_ORGANIZATION:
      return { ...state, [action.payload._id]: "_id" };
    case CREATE_ORGANIZATION:
      return { ...state, [action.payload._id]: "_id" };
    case DELETE_ORGANIZATION:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
