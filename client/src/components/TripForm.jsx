import React, { Component } from "react";
import Input from "./common/reduxInput.jsx";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import DropdownList from "react-widgets/lib/DropdownList";
import SelectList from "react-widgets/lib/SelectList";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import "react-widgets/dist/css/react-widgets.css";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

Moment.locale("en");
momentLocalizer();

class TripForm extends Component {
  state = {
    date: new Date()
  };

  componentDidMount() {
    this.props.fetchVehicleTypes();
    this.props.fetchOrganizations();
    this.props.fetchSupervisors();
  }

  renderDropdownList = ({ input, data, valueField, textField, label }) => {
    return (
      <div
        className="field mt-1"
        style={{ marginLeft: "20%", marginRight: "20%" }}
      >
        <label>{label}</label>
        <DropdownList
          {...input}
          data={data}
          valueField={valueField}
          textField={textField}
          onChange={input.onChange}
        />
      </div>
    );
  };

  renderSelectList = ({ input, data }) => {
    return <SelectList {...input} onBlur={() => input.onBlur()} data={data} />;
  };

  renderDateTimePicker = ({
    input: { onChange, value },
    showTime,
    defaultValue,
    label
  }) => {
    return (
      <div
        className="field mt-1"
        style={{ marginLeft: "20%", marginRight: "20%" }}
      >
        <label>{label}</label>
        <DateTimePicker
          onChange={onChange}
          defaultValue={defaultValue}
          timeFormat="hh:mm A"
          format="MMM DD YYYY, h:mm A"
          time={showTime}
          step={5}
        />
      </div>
    );
  };

  onSubmit = values => {
    this.props.onSubmit(values);
  };

  render() {
    const { vehicleTypes, supervisors, organizations } = this.props;
    console.log(this.props.initialValues);
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Trip Form</h1>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            type="text"
            name="title"
            label="Trip Title: include the destination"
            component={Input}
          />
          <Field
            type="text"
            name="destination"
            label="Destination"
            component={Input}
          />
          <Field
            type="text"
            name="physicalAddress"
            label="Physical Address"
            component={Input}
          />
          <Field
            type="number"
            name="occupants"
            label="Number of  Occupants"
            component={Input}
          />

          <Field
            name="departTime"
            showTime={true}
            defaultValue={
              this.props.initialValues
                ? new Date(this.props.initialValues.departTime)
                : new Date()
            }
            label="Depart Date/Time"
            component={this.renderDateTimePicker}
          />

          <Field
            name="returnTime"
            showTime={true}
            defaultValue={
              this.props.initialValues
                ? new Date(this.props.initialValues.returnTime)
                : new Date()
            }
            label="Return Date/Time"
            component={this.renderDateTimePicker}
          />

          <Field
            type="text"
            name="departureLocation"
            label="Departure Location"
            component={Input}
          />
          <Field //need to * implement organization types so can be select component
            name="organization"
            component={this.renderDropdownList}
            data={organizations}
            label="Choose Organization"
            valueField="_id"
            textField="name"
          />
          <Field
            type="text"
            name="phoneNumber"
            label="Phone Number"
            component={Input}
          />

          <Field
            name="supervisor"
            component={this.renderDropdownList}
            data={supervisors}
            label="Choose Supervisor"
            valueField="email"
            textField="name"
          />

          <Field
            name="vehicleTypeReq"
            component={this.renderDropdownList}
            data={vehicleTypes}
            valueField="_id"
            textField="name"
            label="Primary Vehicle Type Needed"
          />

          <Field
            name="numberOfPrimaryVehicles"
            component={this.renderDropdownList}
            data={[0, 1, 2, 3, 4]}
            valueField="number"
            textField="number"
            label="Number of Primary Vehicles Needed"
          />

          <Field
            name="supportVehicles"
            component={this.renderDropdownList}
            data={[0, 1, 2, 3, 4]}
            valueField="number"
            textField="number"
            label="Number of Support Vehicles Needed"
          />

          <Field
            type="checkbox"
            name="estimateNeeded"
            component={Input}
            label="Estimate Needed?"
          />

          <Field
            name="numberOfDrivers"
            component={this.renderDropdownList}
            data={[0, 1, 2, 3, 4]}
            valueField="number"
            textField="number"
            label="Number of Drivers Needed"
          />

          <Field
            name="totalVehicles"
            component={this.renderDropdownList}
            data={[0, 1, 2, 3, 4]}
            defaultValue
            valueField="number"
            textField="number"
            label="Total Number of Vehicles Needed"
          />

          <div
            className="field mt-1"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <label>Comments</label>
            <div>
              <Field name="comments" component="textarea" />
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "1em",
              marginBottom: "2em"
            }}
          >
            <button className="btn btn-primary btn-lg">Submit</button>
            <Link to="/trips" className="btn btn-secondary btn-lg ml-1">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.name = "Title cannot be empty.";
  }

  return errors;
}

const mapStateToProps = (state, ownProps) => {
  return {
    vehicleTypes: Object.values(state.vehicleTypes),
    organizations: Object.values(state.organizations),
    vehicles: Object.values(state.vehicles),
    supervisors: state.supervisors,
    trip: ownProps.initialValues,
    drivers: state.drivers
  };
};

const formWrapped = reduxForm({
  validate,
  form: "TripForm"
})(TripForm);

export default connect(
  mapStateToProps,
  actions
)(formWrapped);
