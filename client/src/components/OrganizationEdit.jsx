import React, { Component } from "react";
import OrganizationForm from "./OrganizationForm";
import _ from "lodash";
import * as actions from "../actions";
import { connect } from "react-redux";

class OrganizationEdit extends Component {
  componentDidMount() {
    this.props.fetchOrganization(this.props.match.params.id);
  }

  onSubmit = values => {
    this.props.editOrganization(this.props.match.params.id, values);
    window.location = "/organizations";
  };

  render() {
    const { organization } = this.props;
    if (!organization) return <div>Loading...</div>;
    return (
      <div>
        <OrganizationForm
          initialValues={_.pick(organization, "name")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { organization: state.organizations[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  actions
)(OrganizationEdit);
