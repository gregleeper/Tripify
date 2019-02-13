import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class TripDriverView extends Component {
  componentDidMount() {
    this.props.fetchDriverTrip(this.props.match.params.id);
  }

  render() {
    const { trip } = this.props;
    if (!trip) return <div>Loading...</div>;
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "2em" }}>
          <div className="row">
            <div className="col">
              <h2 style={{ textAlign: "center" }}>Trip Info</h2>
              <div className="row">
                <div className="col">
                  <dt className="mt-4">Trip Title: </dt>
                  <dd>{trip.title}</dd>
                  <dt className="mt-4">Number of Occupants: </dt>
                  <dd>{trip.occupants}</dd>
                  <dt className="mt-4">Departure Location: </dt>
                  <dd>{trip.departureLocation}</dd>
                  <dt className="mt-4">Primary Vehicle Type Requested: </dt>
                  <dd>{trip.vehicleTypeReq.name}</dd>
                  <dt className="mt-4">Estimate Needed: </dt>
                  <dd>{trip.estimateNeeded ? "Yes" : "No"}</dd>
                  <dt className="mt-4">Number of Drivers Needed: </dt>
                  <dd>{trip.numberOfDrivers}</dd>
                  <dt className="mt-4">Comments: </dt>
                  <dd>{trip.comments}</dd>
                </div>
                <div className="col">
                  <dt className="mt-4">Trip Owner: </dt>
                  <dd>{trip.tripOwner.name}</dd>
                  <dt className="mt-4">
                    Phone Number for {trip.tripOwner.name}
                  </dt>
                  <dd>{trip.phoneNumber}</dd>
                  <dt className="mt-4">Destination: </dt>
                  <dd>{trip.destination}</dd>
                  <dt className="mt-4">Physical Address: </dt>
                  <dd>{trip.physicalAddress}</dd>
                  <dt className="mt-4">Organization: </dt>
                  <dd>{trip.organization}</dd>
                  <dt className="mt-4">Number of Primary Vehicles: </dt>
                  <dd>{trip.numberOfPrimaryVehicles}</dd>
                  <dt className="mt-4">Number of Support Vehicles Needed: </dt>
                  <dd>{trip.supportVehicles}</dd>
                  <dt className="mt-4">Total Vehicles Needed: </dt>
                  <dd>{trip.totalVehicles}</dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    trip: state.driverTrips[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  actions
)(TripDriverView);
