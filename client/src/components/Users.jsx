import React, { Component } from "react";
import * as actions from "../actions";
import _ from "lodash";
import { connect } from "react-redux";
import Table from "./table";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Users extends Component {
  state = {
    pageSize: 5,
    currentPage: 1,
    selectedDate: null,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" }
  };

  columns = [
    {
      path: "name",
      label: "Name",
      content: user => <Link to={`/users/edit/${user._id}`}>{user.name}</Link>
    },
    { path: "email", label: "Email" },
    {
      key: "",
      label: "Role",
      content: user => {
        if (user.isAdmin && user.isSupervisor && user.isDriver)
          return <div>Admin, Supervisor, Driver</div>;
        else if (user.isAdmin && user.isSupervisor && !user.isDriver)
          return <div>Admin, Supervisor</div>;
        else if (user.isAdmin && !user.isSupervisor && !user.isDriver)
          return <div>Admin</div>;
        else if (user.isAdmin && !user.isSupervisor && user.isDriver)
          return <div>Admin, Driver</div>;
        else if (!user.isAdmin && !user.isSupervisor && user.isDriver)
          return <div>Driver</div>;
        else if (!user.isAdmin && user.isSupervisor && user.isDriver)
          return <div>Supervisor, Driver</div>;
        else if (!user.isAdmin && user.isSupervisor && !user.isDriver)
          return <div>Supervisor</div>;
        else return <div>User</div>;
      }
    }
  ];
  componentDidMount() {
    this.props.fetchUsers();
  }

  handleDelete = user => {};

  handleEdit = user => {};

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedDate: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData() {
    const { users } = this.props;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    let filtered = users;

    if (searchQuery)
      filtered = users.filter(u =>
        u.name
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase() ||
              u.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    // else if (selectedDate)
    //   filtered = trips.filter(t => t.departTime === selectedDate);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const usersPaginated = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: usersPaginated };
  }

  render() {
    const { users } = this.props;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: usersPaginated } = this.getPagedData();

    if (!users) return <div>Loading...</div>;
    return (
      <div className="col">
        <h3 className="mt-2">Users</h3>
        <div className="row">
          <div className="col mt-3">Total Users: {totalCount}</div>
          <div className="col">
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder="Search by name..."
            />
          </div>
          <div className="col mt-3">
            <Link
              to="/users/add"
              className="btn btn-primary btn-md"
              style={{ float: "right" }}
            >
              Add User
            </Link>
          </div>
        </div>

        <br />
        <br />
        <Table
          columns={this.columns}
          data={usersPaginated}
          key={users._id}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={users.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: Object.values(state.users) };
};

export default connect(
  mapStateToProps,
  actions
)(Users);
