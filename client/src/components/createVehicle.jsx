import React, { Component } from "react";
import VehicleForm from "./VehicleForm";
import { createVehicle } from "../actions";
import { connect } from "react-redux";

class VehicleCreate extends Component {
  onSubmit = values => {
    this.props.createVehicle(values);
    window.location = "/vehicles";
  };

  render() {
    const { vehicleTypes } = this.props;
    console.log(vehicleTypes);
    return (
      <div>
        <VehicleForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createVehicle }
)(VehicleCreate);
