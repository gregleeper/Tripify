import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import TripForm from "./TripForm";
import _ from "lodash";

class TripEdit extends Component {
  componentDidMount() {
    this.props.fetchTrip(this.props.match.params.id);
  }

  onSubmit = values => {
    this.props.editTrip(this.props.match.params.id, values);
    window.location = "/trips";
  };
  render() {
    const { trip } = this.props;
    if (!trip) return <div>Loading...</div>;
    return (
      <div>
        <h3>Edit Trip</h3>
        <TripForm
          initialValues={_.pick(
            trip,
            "title",
            "destination",
            "physicalAddress",
            "occupants",
            "departTime",
            "returnTime",
            "departureLocation",
            "organization",
            "phoneNumber",
            "supervisor",
            "vehicleTypeReq",
            "numberOfPrimaryVehicles",
            "supportVehicles",
            "estimateNeeded",
            "numberOfDrivers",
            "totalVehicles",
            "comments"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { trip: state.trips[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  actions
)(TripEdit);
