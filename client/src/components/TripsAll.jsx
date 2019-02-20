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
import * as moment from "moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";
import momentLocalizer from "react-widgets-moment";

// 198500

// Moment.locale("en");
momentLocalizer();

class TripsAll extends Component {
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
      label: "Trip Title"
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
    { path: "tripOwner.name", label: "Created By" }
  ];

  componentDidMount() {
    this.props.fetchAllTrips();
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedDate: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSelectedDate = date => {
    this.setState({ selectedDate: date, currentPage: 1 });
  };

  handleEmptyDate = () => {
    this.setState({ selectedDate: null, currentPage: 1 });
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
    else if (selectedDate) {
      filtered = trips.filter(t =>
        moment(t.departTime).isSame(selectedDate, "day")
      );
    }

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
            <DateTimePicker
              time={false}
              format="MMM DD, YYYY"
              value={this.state.selectedDate}
              onChange={this.handleSelectedDate}
              placeholder="Filter By Date..."
              onKeyPress={e => {
                if (e.key === "Enter") {
                  if (e.target.value === "") this.handleEmptyDate();
                }
              }}
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
  return { trips: Object.values(state.allTrips) };
};

export default connect(
  mapStateToProps,
  actions
)(TripsAll);
