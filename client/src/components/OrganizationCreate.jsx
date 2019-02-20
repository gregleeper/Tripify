import React, { Component } from "react";
import OrganizationForm from "./OrganizationForm";
import * as actions from "../actions";
import { connect } from "react-redux";

class OrganizationCreate extends Component {
  onSubmit = values => {
    this.props.createOrganization(values);
    window.location = "/organizations";
  };

  render() {
    return (
      <div>
        <OrganizationForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(OrganizationCreate);
