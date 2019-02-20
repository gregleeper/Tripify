import React, { Component } from "react";
import * as actions from "../actions";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import Button from "react-bootstrap/Button";
// import Overlay from "react-bootstrap/Overlay";
// import Popover from "react-bootstrap/Popover";
import { connect } from "react-redux";

class Header extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    this.props.fetchAdminTrips();
    this.props.fetchSupTrips();
  }

  handleClick = target => {
    console.log("clicke handler clicked");
    this.setState(s => ({ target, show: !s.show }));
  };

  renderAuth() {
    if (!this.props.auth) {
      return (
        <Nav.Link href="/login" className="navbar-right nav-item nav-link">
          Log In
        </Nav.Link>
      );
    } else {
      return (
        <NavDropdown
          title={this.props.auth && this.props.auth.name}
          id="collapsible-nav-dropdown"
        >
          <NavDropdown.Item href="/">Account</NavDropdown.Item>
          <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

  renderMyTrips() {
    if (this.props.auth) {
      return (
        <Nav.Link href="/trips" className="nav-item nav-link">
          My Trips
        </Nav.Link>
      );
    }
  }

  renderAllTrips() {
    return (
      <Nav.Link href="/trips/all" className="nav-item nav-link">
        All Trips
      </Nav.Link>
    );
  }

  renderAdmin() {
    if (this.props.auth && this.props.auth.isAdmin) {
      return (
        <NavDropdown title="Manage" id="collapsible-nav-dropdown">
          <NavDropdown.Item href="/trips/admin">Manage Trips</NavDropdown.Item>
          <NavDropdown.Item href="/vehicles">Vehicles</NavDropdown.Item>
          <NavDropdown.Item href="/vehicletypes">
            Vehicle Types
          </NavDropdown.Item>
          <NavDropdown.Item href="/organizations">
            Organizations
          </NavDropdown.Item>
          <NavDropdown.Item href="/users">Users</NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

  renderSup() {
    if (this.props.auth && this.props.auth.isSupervisor) {
      return (
        <Nav.Link className="nav-item nav-link ml-2" href="/trips/supervisor">
          Review Trips
        </Nav.Link>
      );
    }
  }

  renderDriver() {
    if (this.props.auth && this.props.auth.isDriver) {
      return (
        <Nav.Link className="nav-item nav-link ml-2" href="/trips/driver">
          Driving For
        </Nav.Link>
      );
    }
  }

  // renderNotificationCounter() {
  //   const { adminTrips, supervisorTrips } = this.props;
  //   if (
  //     this.props.auth &&
  //     (this.props.auth.isAdmin || this.props.auth.isSupervisor)
  //   ) {
  //     const adminFiltered = adminTrips
  //       ? adminTrips.filter(t => t.isApproved && !t.isArranged)
  //       : null;
  //     const adminCount = adminFiltered ? adminFiltered.length : 0;
  //     const supFiltered = supervisorTrips
  //       ? supervisorTrips.filter(t => !t.isApproved && !t.isDenied)
  //       : null;
  //     const supCount = supFiltered ? supFiltered.length : 0;
  //     const totalCount = adminCount + supCount;
  //     if (totalCount === 0) return;
  //     return (
  //       <ButtonToolbar>
  //         <Button onClick={this.handleClick}>
  //           Notifications
  //           <span className="badge badge-pill badge-danger m-2">
  //             {totalCount}
  //           </span>
  //         </Button>
  //         <Overlay
  //           show={this.state.show}
  //           target={this.state.target}
  //           placement="bottom"
  //           container={this}
  //           containerPadding={20}
  //         >
  //           <Popover id="popover-contained" title="Popover bottom">
  //             You have {adminCount} trips that need to be arranged. You have{" "}
  //             {supCount} trips that need to be reviewed.
  //           </Popover>
  //         </Overlay>
  //       </ButtonToolbar>
  //     );
  //   }
  // }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">TripFlow</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {this.renderMyTrips()}
            {this.renderAllTrips()}
            {this.renderAdmin()}
            {this.renderSup()}
            {this.renderDriver()}
          </Nav>

          <Nav>{this.renderAuth()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    adminTrips: Object.values(state.adminTrips),
    supTrips: Object.values(state.supervisorTrips),
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(Header);
