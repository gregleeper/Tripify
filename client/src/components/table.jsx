import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
//import { Table } from "reactstrap";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table table-striped">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
