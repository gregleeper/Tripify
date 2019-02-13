import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Header from "./components/Header";
import Logout from "./components/logout";
import UserCreate from "./components/UserCreate";
//import AppNavbar from "./components/AppNavbar";
import TripsUser from "./components/TripsUser";
import TripEdit from "./components/TripEdit";
import TripsAdmin from "./components/TripsAdmin";
import TripsSupervisor from "./components/TripsSupervisor";
import TripsDriver from "./components/TripsDriver";
import TripCreate from "./components/TripCreate";
import TripArrangeEdit from "./components/TripArrangeEdit";
import TripApprove from "./components/TripApprove";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Vehicles from "./components/Vehicles";
import VehicleEdit from "./components/VehicleEdit";
import VehicleTypes from "./components/VehicleTypes";
import { connect } from "react-redux";
import * as actions from "./actions";
import createVehicle from "./components/createVehicle";
import VehicleTypeCreate from "./components/VehicleTypeCreate";
import VehicleTypeEdit from "./components/VehicleTypeEdit";
import TripDriverView from "./components/TripDriverView";
import UserEdit from "./components/UserEdit";

const Dashboard = () => <h2>Dashboard</h2>;
const Admin = () => <h2>Admin</h2>;

library.add(faTrash, faGoogle);
class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/trips" exact component={TripsUser} />
            <Route path="/trips/admin" exact component={TripsAdmin} />
            <Route
              path="/trips/admin/arrange/:id"
              component={TripArrangeEdit}
            />
            <Route path="/trips/supervisor" exact component={TripsSupervisor} />
            <Route
              path="/trips/supervisor/approve/:id"
              component={TripApprove}
            />
            <Route path="/trips/driver" exact component={TripsDriver} />
            <Route path="/trips/driver/view/:id" component={TripDriverView} />
            <Route path="/trips/add" component={TripCreate} />
            <Route path="/trips/edit/:id" component={TripEdit} />
            <Route path="/vehicles" exact component={Vehicles} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/add" component={UserCreate} />
            <Route path="/users/edit/:id" component={UserEdit} />
            <Route path="/vehicletypes" exact component={VehicleTypes} />
            <Route path="/vehicletypes/add" component={VehicleTypeCreate} />
            <Route path="/vehicletypes/edit/:id" component={VehicleTypeEdit} />
            <Route path="/vehicles/add" component={createVehicle} />
            <Route path="/vehicles/edit/:id" component={VehicleEdit} />
            <Route path="/admin" exact component={Admin} />
            <Route
              path="/"
              exact
              render={() =>
                this.props.auth ? <Redirect to="/dashboard" /> : <LoginForm />
              }
            />
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth: auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(App);
