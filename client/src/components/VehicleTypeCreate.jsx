import React, { Component } from "react";
import VehicleTypeForm from "./VehicleTypeForm";
import * as actions from "../actions";
import { connect } from "react-redux";

class VehicleTypeCreate extends Component {
  onSubmit = values => {
    this.props.createVehicleType(values);
    window.location = "/vehicletypes";
  };

  render() {
    return (
      <div>
        <VehicleTypeForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(VehicleTypeCreate);
