import { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    document.cookie = "token" + "=; Max-Age=-99999999;";
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
