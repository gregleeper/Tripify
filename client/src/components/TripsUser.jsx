import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import SearchBox from "./common/searchBox";
import { Link } from "react-router-dom";
import Table from "./table";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import Moment from "react-moment";

class TripsUser extends Component {
  state = {
    pageSize: 5,
    currentPage: 1,
    selectedDate: null,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" }
  };
  columns = [
    {
      path: "title",
      label: "Trip Title",
      content: trip => <Link to={`/trips/edit/${trip._id}`}>{trip.title}</Link>
    },
    { path: "destination", label: "Destination" },
    {
      path: "departTime",

      label: "Departing At",
      content: trip => (
        <Moment locale="en" format="ddd MMM-DD-YYYY h:mm A">
          {trip.departTime}
        </Moment>
      )
    },
    { path: "tripOwner.name", label: "Created By" },
    { path: "supervisor.name", label: "Supervisor" },
    {
      path: "isApproved",
      label: "Approval Status",
      content: trip => {
        if (trip.isApproved) return <div>Approved</div>;
        else if (!trip.isApproved && !trip.isDenied) {
          return <div>Needs Review</div>;
        } else return <div>Denied</div>;
      }
    },

    {
      path: "isArranged",
      label: "Arranged",
      content: trip => <div>{trip.isArranged ? "Yes" : "No"}</div>
    }
  ];

  componentDidMount() {
    this.props.fetchUserTrips();
  }

  handleDelete = trip => {
    this.props.deleteTrip(trip._id);
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedDate: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleVehicleTypeSelect = type => {
    this.setState({ selectedType: type, currentPage: 1 });
  };

  getPagedData() {
    const { trips } = this.props;
    const {
      pageSize,
      currentPage,
      selectedDate,
      sortColumn,
      searchQuery
    } = this.state;
    let filtered = trips;

    if (searchQuery)
      filtered = trips.filter(t =>
        t.title
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase() ||
              t.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    else if (selectedDate)
      filtered = trips.filter(t => t.departTime === selectedDate);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const tripsPaginated = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: tripsPaginated };
  }

  render() {
    const { trips } = this.props;
    if (!trips) {
      return <div>Loading...</div>;
    }
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: tripsPaginated } = this.getPagedData();
    return (
      <div className="col">
        <h3 className="mt-2">My Trips</h3>
        <div className="row">
          <div className="col mt-3">Showing {totalCount} trips</div>

          <div className="col">
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder="Search by title..."
            />
          </div>
          <div className="col mt-3">
            <Link
              to="/trips/add"
              className="btn btn-primary btn-md"
              style={{ float: "right" }}
            >
              Add Trip
            </Link>
          </div>
        </div>
        <Table
          columns={this.columns}
          data={tripsPaginated}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          key={trips._id}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { trips: Object.values(state.trips) };
};

export default connect(
  mapStateToProps,
  actions
)(TripsUser);
