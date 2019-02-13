import React, { Component } from "react";
import TripForm from "./TripForm";
import * as actions from "../actions";
import { connect } from "react-redux";

class TripCreate extends Component {
  onSubmit = values => {
    this.props.createTrip(values);
    window.location = "/trips";
  };

  render() {
    return (
      <div>
        <TripForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(TripCreate);
