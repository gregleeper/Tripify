import { FETCH_VEHICLE_TYPES_4_VEHICLES_PAGE } from "../actions/types";

export default (state = [{ _id: "", name: "Show All" }], action) => {
  switch (action.type) {
    case FETCH_VEHICLE_TYPES_4_VEHICLES_PAGE:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
