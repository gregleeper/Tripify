import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import TripApprove from "./TripApprove";
import _ from "lodash";

class TripApproveEdit extends Component {
  componentDidMount() {
    this.props.fetchSupTrip(this.props.match.params.id);
  }

  onSubmit = values => {
    console.log(values);
    //this.props.approveTrip(this.props.match.params.id, values);
  };

  render() {
    const { trip } = this.props;
    //if (!trip) return <div>Loading...</div>;
    console.log(trip);
    return (
      <div>
        <TripApprove initialValuesToPassThru={trip} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { trip: state.trips[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  actions
)(TripApproveEdit);
