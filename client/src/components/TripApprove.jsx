import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class TripApprove extends Component {
  componentDidMount() {
    this.props.fetchSupTrip(this.props.match.params.id);
  }

  handleApprove = () => {
    const values = { isApproved: true, isDenied: false };
    console.log(values);
    this.props.approveTrip(this.props.match.params.id, values);
    window.location = "/trips/supervisor";
  };

  handleDeny = () => {
    const values = { isApproved: false, isDenied: true };
    this.props.approveTrip(this.props.match.params.id, values);
    window.location = "/trips/supervisor";
  };

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
                  <dt className="mt-4">Estimated Cost: </dt>
                  <dd>${trip.cost}</dd>
                </div>
              </div>
            </div>
            <div className="col" style={{ textAlign: "center" }}>
              <h2>Approve Trip</h2>
              <button
                className="btn btn-success btn-lg mt-5"
                onClick={this.handleApprove}
              >
                Approve
              </button>
              <button
                className="btn btn-danger btn-lg ml-2 mt-5"
                onClick={this.handleDeny}
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    trip: state.supervisorTrips[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  actions
)(TripApprove);
