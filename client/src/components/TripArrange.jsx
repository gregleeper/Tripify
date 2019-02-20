import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { reduxForm, Field, FieldArray } from "redux-form";
import * as actions from "../actions";
import DropdownList from "react-widgets/lib/DropdownList";
import SelectList from "react-widgets/lib/SelectList";
import "react-widgets/dist/css/react-widgets.css";
import Remove from "./common/remove";
import { Link } from "react-router-dom";
import Input from "./common/reduxInput";
import Moment from "react-moment";

class TripArrange extends Component {
  componentDidMount() {
    this.props.fetchAvailableVehicles(this.props.trip._id);
    this.props.fetchAvailableDrivers(this.props.trip._id);
  }

  renderDropdownList = ({ input, data, valueField, textField }) => {
    return (
      <DropdownList
        {...input}
        data={data}
        valueField={valueField}
        textField={textField}
        onChange={input.onChange}
      />
    );
  };

  renderSelectList = ({ input, data, valueField, textField }) => {
    return (
      <SelectList
        {...input}
        valueField={valueField}
        textField={textField}
        onBlur={() => input.onBlur()}
        data={data}
      />
    );
  };

  renderDrivers = ({ fields, meta: { error } }) => {
    return (
      <ul style={{ listStyle: "none" }}>
        <li style={{ listStyle: "none" }}>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => fields.push({})}
          >
            Add Driver
          </button>
        </li>
        {fields.map((driver, index) => (
          <li key={index}>
            <h6 style={{ marginTop: "0.8em", marginBottom: "0.8em" }}>
              Driver #{index + 1}{" "}
              <Remove onClick={() => fields.remove(index)} />
            </h6>
            <Field
              name={`${driver}`}
              component={this.renderDropdownList}
              data={this.props.drivers}
              defaultValue=""
              valueField="_id"
              textField="name"
              style={{ marginLeft: "20%", marginRight: "20%" }}
            />
          </li>
        ))}
        {error && <li className="error">{error}</li>}
      </ul>
    );
  };

  renderVehicles = ({ fields, meta: { error } }) => {
    const { vehicles } = this.props;
    return (
      <ul style={{ float: "none", listStyle: "none" }}>
        <li style={{ float: "none", listStyle: "none" }}>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => fields.push({})}
          >
            Add Vehicle
          </button>
        </li>
        {fields.map((vehicle, index) => (
          <li key={index}>
            <h6 style={{ marginTop: "0.8em", marginBottom: "0.8em" }}>
              Vehicle #{index + 1}{" "}
              <Remove onClick={() => fields.remove(index)} />
            </h6>
            <Field
              name={`${vehicle}`}
              component={this.renderDropdownList}
              data={vehicles}
              valueField="_id"
              textField="name"
            />
          </li>
        ))}
        {error && <li className="error">{error}</li>}
      </ul>
    );
  };

  onSubmit = values => {
    this.props.onSubmit(values);
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
                  <dt className="mt-4">Number of Primary Vehicles: </dt>
                  <dd>{trip.numberOfPrimaryVehicles}</dd>
                  <dt className="mt-4">Number of Support Vehicles Needed: </dt>
                  <dd>{trip.supportVehicles}</dd>
                  <dt className="mt-4">Total Vehicles Needed: </dt>
                  <dd>{trip.totalVehicles}</dd>
                </div>
              </div>
            </div>
            <div className="col">
              <h2 style={{ textAlign: "center" }}>Arrange Trip</h2>
              <form
                className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                style={{ marginTop: "2em" }}
              >
                <FieldArray name="vehicles" component={this.renderVehicles} />
                <FieldArray name="drivers" component={this.renderDrivers} />
                <Field
                  initialValues={_.pick(trip, "distance")}
                  type="number"
                  name="distance"
                  label="Total Rount Trip Distance"
                  component={Input}
                />
                <Field
                  type="number"
                  name="cost"
                  label="Total Estimated Cost"
                  component={Input}
                />
                <Field
                  type="checkbox"
                  name="isArranged"
                  component={Input}
                  label="Arranged"
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
    errors.vehicles = { _error: "At least one vehicle must be selected." };
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    vehicles: Object.values(state.vehicles),
    drivers: Object.values(state.drivers),
    trip: ownProps.initialValues
  };
};

const formWrapped = reduxForm({
  validate,
  form: "TripArrange"
})(TripArrange);

export default connect(
  mapStateToProps,
  actions
)(formWrapped);
