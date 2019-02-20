import React, { Component } from "react";
import Input from "./common/reduxInput.jsx";
import Joi from "joi-browser";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserForm extends Component {
  schema = {
    email: Joi.string()
      .email()
      .label("Email")
  };

  onSubmit = values => {
    console.log("submitted");
    this.props.onSubmit(values);
  };

  render() {
    return (
      <div className="container">
        <form
          className="ui form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field type="text" name="name" label="Name" component={Input} />
          <Field type="email" name="email" label="Email" component={Input} />
          <Field
            type="password"
            name="password"
            label="Password"
            component={Input}
          />
          <Field
            type="checkbox"
            name="isAdmin"
            label="Admin"
            component={Input}
          />
          <Field
            type="checkbox"
            name="isSupervisor"
            label="Supervisor"
            component={Input}
          />
          <Field
            type="checkbox"
            name="isDriver"
            label="Driver"
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
            <Link to="/users" className="btn btn-secondary btn-lg ml-1">
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
  if (!values.email) {
    errors.email = "Email cannot be empty.";
  }
  if (!values.password) {
    errors.password = "Password cannot be empty.";
  }

  return errors;
}

const formWrapped = reduxForm({
  validate,
  form: "createUserForm"
})(UserForm);

export default connect(
  null,
  actions
)(formWrapped);
