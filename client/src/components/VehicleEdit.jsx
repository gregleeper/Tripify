import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import VehicleForm from "./VehicleForm";
import _ from "lodash";

class VehicleEdit extends Component {
  componentDidMount() {
    this.props.fetchVehicle(this.props.match.params.id);
  }

  onSubmit = values => {
    this.props.editVehicle(this.props.match.params.id, values);
    window.location = "/vehicles";
  };
  render() {
    const { vehicle } = this.props;
    if (!vehicle) return <div>Loading...</div>;
    return (
      <div>
        <h3>Edit Vehicle</h3>
        <VehicleForm
          initialValues={_.pick(
            vehicle,
            "name",
            "year",
            "make",
            "model",
            "vehicleTypeId",
            "maxOccupancy"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { vehicle: state.vehicles[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  actions
)(VehicleEdit);
