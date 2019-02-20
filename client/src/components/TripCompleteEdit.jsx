import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import TripComplete from "./TripComplete";
import _ from "lodash";

class TripCompleteEdit extends Component {
  componentDidMount() {
    this.props.fetchAdminTrip(this.props.match.params.id);
  }

  onSubmit = values => {
    const { vehicles } = this.props.trip;
    const vehicleIdArray = vehicles.map(v => {
      return v._id;
    });
    let trip = {
      miles: []
    };
    for (let i = 0; i < vehicleIdArray.length; i++) {
      const entries = Object.entries(values);
      for (const [key, value] of entries) {
        if (key === vehicleIdArray[i]) {
          value.totalMiles = value.postTripMiles - value.preTripMiles;
          value._id = key;
          for (let i = 0; i < vehicles.length; i++) {
            if (vehicles[i]._id === key) {
              value.name = vehicles[i].name;
            }
          }

          trip.miles.push(value);
        }
      }
    }
    this.props.completeTrip(this.props.match.params.id, trip);
    window.location = "/trips/admin";
  };

  render() {
    const { trip } = this.props;
    //if (!trip) return <div>Loading...</div>;
    return (
      <div>
        <TripComplete initialValues={trip} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { trip: state.adminTrips[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  actions
)(TripCompleteEdit);
