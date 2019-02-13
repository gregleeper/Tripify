import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import Table from "./table";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";

class VehicleTypes extends Component {
  state = {
    pageSize: 5,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" }
  };

  columns = [
    {
      path: "name",
      label: "Name",
      content: vehicleType => (
        <Link to={`/vehicletypes/edit/${vehicleType._id}`}>
          {vehicleType.name}
        </Link>
      )
    },
    {
      key: "delete",
      content: vehicleType => (
        <button
          onClick={() => this.handleDelete(vehicleType)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];
  componentDidMount() {
    this.props.fetchVehicleTypes();
  }

  handleDelete = vehicleType => {
    this.props.deleteVehicleType(vehicleType._id);
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedType: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { vehicleTypes } = this.props;
    const { pageSize, currentPage, sortColumn } = this.state;
    const totalCount = vehicleTypes.length;

    const sorted = _.orderBy(
      vehicleTypes,
      [sortColumn.path],
      [sortColumn.order]
    );

    const vehicleTypesPaginated = paginate(sorted, currentPage, pageSize);
    return (
      <div className="col">
        <h3 className="mt-2">Vehicle Types</h3>
        <div className="row" key={vehicleTypesPaginated}>
          <div className="col mt-3">Showing {totalCount} vehicle types</div>

          <div className="col mt-3">
            <Link
              to="/vehicletypes/add"
              className="btn btn-primary btn-md mb-2"
              style={{ float: "right" }}
            >
              Add Type
            </Link>
          </div>
        </div>
        <Table
          columns={this.columns}
          data={vehicleTypesPaginated}
          onSort={this.handleSort}
          sortColumn={sortColumn}
          key={vehicleTypesPaginated._id}
        />
        <Pagination
          itemsCount={vehicleTypes.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { vehicleTypes: Object.values(state.vehicleTypes) };
};

export default connect(
  mapStateToProps,
  actions
)(VehicleTypes);
