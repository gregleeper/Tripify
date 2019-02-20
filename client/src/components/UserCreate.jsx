import React, { Component } from "react";
import UserForm from "./UserForm";
import * as actions from "../actions";
import { connect } from "react-redux";

class UserCreate extends Component {
  onSubmit = values => {
    this.props.createUser(values);
    window.location = "/users";
  };

  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center", marginTop: "2em" }}>Create User</h3>
        <UserForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(UserCreate);
