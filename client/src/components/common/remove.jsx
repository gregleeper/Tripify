import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Remove extends Component {
  render() {
    return (
      <FontAwesomeIcon
        onClick={this.props.onClick}
        style={{ cursor: "pointer", float: "right", color: "Tomato" }}
        icon="trash"
      />
    );
  }
}

export default Remove;
