import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Table from "./table";
import { reduxForm, Field, FieldArray } from "redux-form";
import Input from "../components/common/reduxInput";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import * as actions from "react-moment";

class TripComplete extends Component {
  state = {
    pageSize: 5,
    currentPage: 1,
    selectedDate: null,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" }
  };

  columns = [
    {
      path: "name",
      label: "Vehicle Name"
    },
    {
      path: "preTripMiles",
      label: "Pre-Trip Miles"
    },
    {
      path: "postTripMiles",
      label: "Post-Trip Miles"
    },
    {
      path: "totalMiles",
      label: "Total Trip Miles"
    }
  ];

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  renderVehicleFields = ({ vehicles }) => {
    if (this.props.initialValues.miles.length === 0) {
      return (
        <div>
          {vehicles.map((vehicle, index) => (
            <div key={index}>
              <Field
                name={`${vehicle._id}.preTripMiles`}
                type="number"
                component={Input}
                label={`${vehicle.name} Pre-Trip Miles`}
              />
              <Field
                name={`${vehicle._id}.postTripMiles`}
                type="number"
                component={Input}
                label={`${vehicle.name} Post-Trip Miles`}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <Table
            columns={this.columns}
            data={this.props.initialValues.miles}
            sortColumn={this.state.sortColumn}
            onSort={this.handleSort}
            key={this.props.initialValues.miles._id}
          />
          <div>
            {vehicles.map((vehicle, index) => (
              <div key={index}>
                <Field
                  name={`${vehicle._id}.preTripMiles`}
                  type="number"
                  component={Input}
                  label={`${vehicle.name} Pre-Trip Miles`}
                />
                <Field
                  name={`${vehicle._id}.postTripMiles`}
                  type="number"
                  component={Input}
                  label={`${vehicle.name} Post-Trip Miles`}
                />
              </div>
            ))}
          </div>
        </React.Fragment>
      );
    }
  };

  onSubmit = values => {
    this.props.onSubmit(values);
  };

  render() {
    const { trip } = this.props;

    if (!trip) return <div>Loading...</div>;
    console.log(trip);
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
                  <dt className="mt-4">Depart Date/Time: </dt>
                  <dd>
                    <Moment locale="en" format="ddd MMM-DD-YYYY h:mm A">
                      {trip.departTime}
                    </Moment>
                  </dd>

                  <dt className="mt-4">Return Date/Time: </dt>
                  <dd>
                    <Moment locale="en" format="ddd MMM-DD-YYYY h:mm A">
                      {trip.returnTime}
                    </Moment>
                  </dd>
                  <dt className="mt-4">Destination: </dt>
                  <dd>{trip.destination}</dd>
                  <dt className="mt-4">Physical Address: </dt>
                  <dd>{trip.physicalAddress}</dd>
                  <dt className="mt-4">Organization: </dt>
                  <dd>{trip.organization.name}</dd>
                  {trip.vehicles.map((v, index) => (
                    <React.Fragment key={index}>
                      <dt className="mt-4">Vehicle {index + 1}:</dt>
                      <dd>{v.name}</dd>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="col">
              <h2 style={{ textAlign: "center" }}>Trip Complete</h2>
              <form
                className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                style={{ marginTop: "2em" }}
              >
                <FieldArray
                  name="miles"
                  vehicles={this.props.trip.vehicles}
                  component={this.renderVehicleFields}
                />
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "1em",
                    marginBottom: "2em"
                  }}
                >
                  <button className="btn btn-primary btn-lg">Submit</button>
                  <Link
                    to="/trips/admin"
                    className="btn btn-secondary btn-lg ml-1"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.vehicles || !values.vehicles.length) {
    errors.vehicles = { _error: "ads;lfj" };
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    trip: ownProps.initialValues
  };
};

const formWrapped = reduxForm({
  validate,
  form: "TripComplete"
})(TripComplete);

export default connect(
  mapStateToProps,
  actions
)(formWrapped);
