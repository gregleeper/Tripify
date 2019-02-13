import React, { Component } from "react";
import Input from "./common/reduxInput.jsx";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class VehicleTypeForm extends Component {
  state = {};

  onSubmit = values => {
    console.log("onSubmit call in form");
    this.props.onSubmit(values);
  };

  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Vehicle Type Form</h1>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field type="text" name="name" label="Name" component={Input} />
          <div
            style={{
              textAlign: "center",
              marginTop: "1em",
              marginBottom: "2em"
            }}
          >
            <button className="btn btn-primary btn-lg">Submit</button>
            <Link to="/vehicletypes" className="btn btn-secondary btn-lg ml-1">
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
  return errors;
}

const formWrapped = reduxForm({
  validate,
  form: "VehicleTypeForm"
})(VehicleTypeForm);

export default connect(
  null,
  actions
)(formWrapped);
