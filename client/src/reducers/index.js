import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import supervisorsReducer from "./supervisorsReducer";
import tripsReducer from "./tripsReducer";
import usersReducer from "./usersReducer";
import vehichlesReducer from "./vehiclesReducer";
import vehicleTypesReducer from "./vehicleTypesReducer";
import vTypesForVehPage from "./vTypesForVehPage";
import driversReducer from "./driversReducer";
import driverTripsReducer from "./driverTripsReducer";
import supervisorTripsReducer from "./supervisorTripsReducer";
import adminTripsReducer from "./adminTripsReducer";
import organizationsReducer from "./organizationsReducer";
import allTripsReducer from "./allTripsReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  trips: tripsReducer,
  allTrips: allTripsReducer,
  driverTrips: driverTripsReducer,
  supervisorTrips: supervisorTripsReducer,
  adminTrips: adminTripsReducer,
  users: usersReducer,
  supervisors: supervisorsReducer,
  drivers: driversReducer,
  vehicles: vehichlesReducer,
  vehicleTypes: vehicleTypesReducer,
  vTypes: vTypesForVehPage,
  organizations: organizationsReducer
});
