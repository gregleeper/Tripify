import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import Table from "./table";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Vehicles extends Component {
  state = {
    pageSize: 5,
    currentPage: 1,
    selectedType: null,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" }
  };

  columns = [
    {
      path: "name",
      label: "Name",
      content: vehicle => (
        <Link to={`/vehicles/edit/${vehicle._id}`}>{vehicle.name}</Link>
      )
    },
    { path: "year", label: "Year" },
    { path: "make", label: "Make" },
    { path: "model", label: "Model" },
    { path: "vehicleType.name", label: "Type" },
    {
      key: "delete",
      content: vehicle => (
        <button
          onClick={() => this.handleDelete(vehicle)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];
  componentDidMount() {
    this.props.fetchTypesForVehiclePage();
    this.props.fetchVehicles();
  }

  addAllTypes = () => {
    const allTypes = [
      { _id: "", name: "All Types" },
      { ...this.props.vehicleTypes }
    ];
    this.setState({ types: allTypes });
  };

  handleDelete = vehicle => {
    this.props.deleteVehicle(vehicle._id);
  };

  handleEdit = vehicle => {};

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedType: null, currentPage: 1 });
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
    const { vehicles } = this.props;
    const {
      pageSize,
      currentPage,
      selectedType,
      sortColumn,
      searchQuery
    } = this.state;
    let filtered = vehicles;

    if (searchQuery)
      filtered = vehicles.filter(v =>
        v.model
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase() ||
              v.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    else if (selectedType && selectedType._id)
      filtered = vehicles.filter(v => v.vehicleType._id === selectedType._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const vehiclesPaginated = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: vehiclesPaginated };
  }

  render() {
    const { vehicles } = this.props;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: vehiclesPaginated } = this.getPagedData();
    return (
      <div className="col">
        <h3 className="mt-2">Vehicles</h3>
        <div className="row">
          <div className="col mt-3">Showing {totalCount} vehicles</div>

          <div className="col">
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder="Search By Model..."
            />
          </div>
          <div className="col mt-3">
            <Link
              to="/vehicles/add"
              className="btn btn-primary btn-md"
              style={{ float: "right" }}
            >
              Add Vehicle
            </Link>
          </div>
        </div>

        <Table
          columns={this.columns}
          sortColumn={sortColumn}
          data={vehiclesPaginated}
          onSort={this.handleSort}
          key={vehicles._id}
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
  return {
    vehicles: Object.values(state.vehicles),
    vehicleTypes: state.vTypes
  };
};

export default connect(
  mapStateToProps,
  actions
)(Vehicles);
