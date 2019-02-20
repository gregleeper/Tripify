import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import Table from "./table";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";

class Organizations extends Component {
  state = {
    pageSize: 5,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" }
  };

  columns = [
    {
      path: "name",
      label: "Name",
      content: organization => (
        <Link to={`/organizations/edit/${organization._id}`}>
          {organization.name}
        </Link>
      )
    },
    {
      key: "delete",
      content: organization => (
        <button
          onClick={() => this.handleDelete(organization)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];
  componentDidMount() {
    this.props.fetchOrganizations();
  }

  handleDelete = organization => {
    this.props.deleteOrganization(organization._id);
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
    const { organizations } = this.props;
    const { pageSize, currentPage, sortColumn } = this.state;
    const totalCount = organizations.length;

    const sorted = _.orderBy(
      organizations,
      [sortColumn.path],
      [sortColumn.order]
    );

    const organizationsPaginated = paginate(sorted, currentPage, pageSize);
    return (
      <div className="col">
        <h3 className="mt-2">Organizations</h3>
        <div className="row" key={organizationsPaginated}>
          <div className="col mt-3">Showing {totalCount} organizations</div>

          <div className="col mt-3">
            <Link
              to="/organizations/add"
              className="btn btn-primary btn-md mb-2"
              style={{ float: "right" }}
            >
              Add Organization
            </Link>
          </div>
        </div>
        <Table
          columns={this.columns}
          data={organizationsPaginated}
          onSort={this.handleSort}
          sortColumn={sortColumn}
          key={organizationsPaginated._id}
        />
        <Pagination
          itemsCount={organizations.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { organizations: Object.values(state.organizations) };
};

export default connect(
  mapStateToProps,
  actions
)(Organizations);
