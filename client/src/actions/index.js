import {
  FETCH_VEHICLES,
  FETCH_VEHICLE,
  EDIT_VEHICLE,
  DELETE_VEHICLE,
  ADD_VEHICLE,
  FETCH_VEHICLE_TYPES,
  FETCH_VEHICLE_TYPE,
  FETCH_VEHICLE_TYPES_4_VEHICLES_PAGE,
  CREATE_VEHICLE_TYPE,
  EDIT_VEHICLE_TYPE,
  DELETE_VEHICLE_TYPE,
  FETCH_CURRENT_USER,
  CREATE_USER,
  EDIT_USER,
  FETCH_USER,
  FETCH_USERS,
  DELETE_USER,
  ARRANGE_TRIP,
  DELETE_TRIP,
  CREATE_TRIP,
  EDIT_TRIP,
  FETCH_TRIP,
  FETCH_ADMIN_TRIP,
  FETCH_ADMIN_TRIPS,
  FETCH_SUP_TRIPS,
  FETCH_SUP_TRIP,
  FETCH_DRIVER_TRIPS,
  FETCH_DRIVER_TRIP,
  APPROVE_TRIP,
  FETCH_USER_TRIPS,
  FETCH_SUPERVISORS,
  FETCH_DRIVERS,
  FETCH_AVAILABLE_DRIVERS,
  FETCH_AVAILABLE_VEHICLES
} from "./types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import auth from "../services/authService";

axios.defaults.headers.common["x-auth-token"] = auth.getJWT();

// Trips Action Creators

export const arrangeTrip = (id, values) => async dispatch => {
  const response = await axios.put(`/api/trips/admin/${id}`, values);
  dispatch({ type: ARRANGE_TRIP, payload: response.data });
};

export const approveTrip = (id, values) => async dispatch => {
  const response = await axios.put(`/api/approvals/${id}`, values);
  dispatch({ type: APPROVE_TRIP, payload: response.data });
};

export const createTrip = values => async (dispatch, getState) => {
  const response = await axios.post("/api/trips", values);
  console.log(response);
  dispatch({ type: CREATE_TRIP, payload: response.data });
};

export const editTrip = (id, values) => {
  return async dispatch => {
    const response = axios.put(`/api/trips/${id}`, values);
    console.log(response.data);
    dispatch({ type: EDIT_TRIP, payload: response.data });
  };
};

export const deleteTrip = id => {
  return async dispatch => {
    await axios.delete(`/api/trips/${id}`);
    dispatch({ type: DELETE_TRIP, payload: id });
  };
};

export const fetchTrip = id => {
  return async dispatch => {
    const response = await axios.get(`/api/trips/${id}`);
    dispatch({ type: FETCH_TRIP, payload: response.data });
  };
};

export const fetchAdminTrip = id => {
  return async dispatch => {
    const response = await axios.get(`/api/trips/admin/${id}`);
    dispatch({ type: FETCH_ADMIN_TRIP, payload: response.data });
  };
};

export const fetchUserTrips = () => {
  return async dispatch => {
    const response = await axios.get("/api/trips/");
    dispatch({ type: FETCH_USER_TRIPS, payload: response.data });
  };
};

export const fetchAdminTrips = () => {
  return async dispatch => {
    const response = await axios.get("/api/trips/admin");
    dispatch({ type: FETCH_ADMIN_TRIPS, payload: response.data });
  };
};

export const fetchSupTrips = () => async dispatch => {
  const response = await axios.get("/api/approvals");
  dispatch({ type: FETCH_SUP_TRIPS, payload: response.data });
};

export const fetchSupTrip = id => {
  return async dispatch => {
    const response = await axios.get(`/api/approvals/${id}`);
    dispatch({ type: FETCH_SUP_TRIP, payload: response.data });
  };
};

export const fetchDriverTrips = () => async dispatch => {
  const response = await axios.get("/api/drivers");
  dispatch({ type: FETCH_DRIVER_TRIPS, payload: response.data });
};

export const fetchDriverTrip = id => {
  return async dispatch => {
    const response = await axios.get(`/api/drivers/${id}`);
    dispatch({ type: FETCH_DRIVER_TRIP, payload: response.data });
  };
};
// Users Action Creators

export const fetchUsers = () => {
  return async dispatch => {
    const response = await axios.get("/api/users");

    dispatch({ type: FETCH_USERS, payload: response.data });
  };
};

export const fetchCurrentUser = () => {
  return dispatch => {
    try {
      if (localStorage.getItem("token")) {
        const jwt = localStorage.getItem("token");

        const user = jwtDecode(jwt);
        dispatch({ type: FETCH_CURRENT_USER, payload: user });
      } else {
        const jwt = document.cookie.valueOf("token");
        console.log(jwt);
        const user = jwtDecode(jwt);
        console.log(user);
        dispatch({ type: FETCH_CURRENT_USER, payload: user });
      }
    } catch (ex) {}
  };
};

export const googleLogin = () => {
  return async dispatch => {
    const response = await axios.get("/api/auth/google");
    console.log(response);
    //dispatch({ type: FETCH_VEHICLES, payload: response.data });
  };
};

export const fetchUser = id => {
  return async dispatch => {
    const response = await axios.get(`/api/users/${id}`);
    console.log(response);
    dispatch({ type: FETCH_USER, payload: response.data });
  };
};

export const createUser = values => {
  return async dispatch => {
    console.log();
    const response = await axios.post("/api/users/", values);
    console.log(response);
    dispatch({ type: CREATE_USER, payload: response.data });
  };
};

export const editUser = (id, values) => {
  return async dispatch => {
    const response = await axios.put(`/api/users/${id}`, values);
    dispatch({ type: EDIT_USER, payload: response.data });
  };
};

export const deleteUser = id => {
  return async dispatch => {
    await axios.delete(`/api/users/${id}`);
    dispatch({ type: DELETE_USER, payload: id });
  };
};

// Supervisors Action Creator

export const fetchSupervisors = () => {
  return async dispatch => {
    const response = await axios.get("/api/users");
    const supervisors = response.data.filter(sup => sup.isSupervisor === true);
    dispatch({ type: FETCH_SUPERVISORS, payload: supervisors });
  };
};

// Drivers Action Creator
export const fetchDrivers = () => {
  return async dispatch => {
    const response = await axios.get("/api/users");
    const drivers = response.data.filter(user => user.isDriver === true);
    dispatch({ type: FETCH_DRIVERS, payload: drivers });
  };
};

export const fetchAvailableDrivers = id => {
  return async dispatch => {
    console.log(id);
    const response = await axios.get(`/api/drivers/available/${id}`);
    dispatch({ type: FETCH_AVAILABLE_DRIVERS, payload: response.data });
  };
};

// Vehicle Action Creators

export const createVehicle = values => {
  return async dispatch => {
    const response = await axios.post("/api/vehicles", values);

    dispatch({ type: ADD_VEHICLE, payload: response.data });
  };
};

export const editVehicle = (id, values) => {
  return async dispatch => {
    const response = await axios.put(`/api/vehicles/${id}`, values);
    dispatch({ type: EDIT_VEHICLE, payload: response.data });
  };
};

export const fetchVehicle = id => {
  return async dispatch => {
    const response = await axios.get(`/api/vehicles/${id}`);
    dispatch({ type: FETCH_VEHICLE, payload: response.data });
  };
};

export const fetchVehicles = () => {
  return async dispatch => {
    const response = await axios.get("/api/vehicles");
    dispatch({ type: FETCH_VEHICLES, payload: response.data });
  };
};

export const fetchAvailableVehicles = id => {
  return async dispatch => {
    const response = await axios.get(`/api/vehicles/available/${id}`);
    dispatch({ type: FETCH_AVAILABLE_VEHICLES, payload: response.data });
  };
};

export const deleteVehicle = id => {
  return async dispatch => {
    await axios.delete(`/api/vehicles/${id}`);
    dispatch({ type: DELETE_VEHICLE, payload: id });
  };
};

// Vehicle Types Action Creators

export const fetchVehicleTypes = () => {
  return async dispatch => {
    const response = await axios.get("/api/vehicletypes");
    dispatch({ type: FETCH_VEHICLE_TYPES, payload: response.data });
  };
};

export const fetchVehicleType = id => {
  return async dispatch => {
    const response = await axios.get(`/api/vehicletypes/${id}`);
    dispatch({ type: FETCH_VEHICLE_TYPE, payload: response.data });
  };
};

export const editVehicleType = (id, values) => {
  return async dispatch => {
    const response = await axios.put(`/api/vehicletypes/${id}`, values);
    dispatch({ type: EDIT_VEHICLE_TYPE, payload: response.data });
  };
};

export const createVehicleType = values => {
  return async dispatch => {
    const response = await axios.post("/api/vehicletypes", values);
    dispatch({ type: CREATE_VEHICLE_TYPE, payload: response.data });
  };
};

export const deleteVehicleType = id => {
  return async dispatch => {
    await axios.delete(`/api/vehicletypes/${id}`);
    dispatch({ type: DELETE_VEHICLE_TYPE, payload: id });
  };
};

export const fetchTypesForVehiclePage = () => {
  return async dispatch => {
    const response = await axios.get("/api/vehicletypes");
    dispatch({
      type: FETCH_VEHICLE_TYPES_4_VEHICLES_PAGE,
      payload: response.data
    });
  };
};
