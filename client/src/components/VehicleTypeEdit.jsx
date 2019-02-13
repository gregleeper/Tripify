import React, { Component } from "react";
import VehicleTypeForm from "./VehicleTypeForm";
import _ from "lodash";
import * as actions from "../actions";
import { connect } from "react-redux";

class VehicleTypeEdit extends Component {
  componentDidMount() {
    this.props.fetchVehicleType(this.props.match.params.id);
  }

  onSubmit = values => {
    this.props.editVehicleType(this.props.match.params.id, values);
    window.location = "/vehicletypes";
  };

  render() {
    const { vehicleType } = this.props;
    if (!vehicleType) return <div>Loading...</div>;
    return (
      <div>
        <VehicleTypeForm
          initialValues={_.pick(vehicleType, "name")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { vehicleType: state.vehicleTypes[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  actions
)(VehicleTypeEdit);
