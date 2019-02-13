import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import UserForm from "./UserForm";
import _ from "lodash";

class UserEdit extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }
  onSubmit = values => {
    this.props.editUser(this.props.match.params.id, values);
    window.location = "/users";
  };
  render() {
    const { user } = this.props;
    if (!user) return <div>Loading...</div>;
    return (
      <div>
        <h3 style={{ textAlign: "center", marginTop: "2em" }}>
          Edit User: {user.name}
        </h3>
        <UserForm
          initialValues={_.pick(
            user,
            "name",
            "email",
            "isAdmin",
            "isSupervisor",
            "isDriver"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  actions
)(UserEdit);
