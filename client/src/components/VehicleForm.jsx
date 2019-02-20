import React, { Component } from "react";
import Input from "./common/reduxInput.jsx";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DropdownList from "react-widgets/lib/DropdownList";

class VehicleForm extends Component {
  state = {
    years: [
      2000,
      2001,
      2002,
      2003,
      2004,
      2005,
      2006,
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020,
      2021,
      2022,
      2023
    ]
  };
  componentDidMount() {
    this.props.fetchVehicleTypes();
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

  onSubmit = values => {
    this.props.onSubmit(values);
  };

  render() {
    const { vehicleTypes } = this.props;

    return (
      <div className="container">
        <h1 style={{ textAlign: "center", marginTop: "2em" }}>Vehicle Form</h1>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field type="text" name="name" label="Name" component={Input} />
          <div
            className="field mt-1"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <label>Year</label>
            <div>
              <Field
                name="year"
                component={this.renderDropdownList}
                data={this.state.years}
                valueField="year"
                textField="year"
              />
            </div>
          </div>
          <Field type="text" name="make" label="Make" component={Input} />
          <Field type="text" name="model" label="Model" component={Input} />
          <div
            className="field mt-1"
            style={{ marginLeft: "20%", marginRight: "20%" }}
          >
            <label>Vehicle Type</label>
            <Field
              data={vehicleTypes}
              name="vehicleType"
              valueField="_id"
              textField="name"
              label="Vehicle Type"
              component={this.renderDropdownList}
            />
          </div>
          <Field
            type="number"
            name="maxOccupancy"
            label="Max Occupancy"
            component={Input}
          />
          <div
            style={{
              textAlign: "center",
              marginTop: "1em",
              marginBottom: "2em"
            }}
          >
            <button className="btn btn-primary btn-lg">Submit</button>
            <Link to="/vehicles" className="btn btn-secondary btn-lg ml-1">
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
  if (!values.name) {
    errors.name = "Name cannot be empty.";
  }
  if (!values.make) {
    errors.make = "Make cannot be empty.";
  }
  if (!values.model) {
    errors.model = "Model cannot be empty.";
  }

  return errors;
}

const mapStateToProps = state => {
  return { vehicleTypes: Object.values(state.vehicleTypes) };
};

const formWrapped = reduxForm({
  validate,
  form: "createVehicleForm"
})(VehicleForm);

export default connect(
  mapStateToProps,
  actions
)(formWrapped);
