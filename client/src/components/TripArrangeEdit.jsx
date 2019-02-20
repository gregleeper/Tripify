import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import TripArrange from "./TripArrange";

class TripArrangeEdit extends Component {
  componentDidMount() {
    this.props.fetchAdminTrip(this.props.match.params.id);
  }

  onSubmit = values => {
    this.props.arrangeTrip(this.props.match.params.id, values);
    window.location = "/trips/admin";
  };
  render() {
    const { trip } = this.props;
    if (!trip) return <div>Loading...</div>;
    //console.log(trip);
    return (
      <div>
        <TripArrange initialValues={trip} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    trip: state.adminTrips[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  actions
)(TripArrangeEdit);
