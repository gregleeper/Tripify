import React, { Component } from "react";

class GoogleAuth extends Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id:
            "902090335286-kkmoi4ecv17t0c6m5hceie763g6ekt0v.apps.googleusercontent.com"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onSignIn = () => {
    let id_token = this.auth.currentUser.get().getAuthResponse().id_token;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5005/tokensignin");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
      console.log("Signed in as: " + xhr.responseText);
    };
    xhr.send("idtoken = " + id_token);
  };

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>unknown</div>;
    } else if (this.state.isSignedIn) {
      this.onSignIn();
      let profile = this.auth.currentUser.get().getBasicProfile();
      console.log("ID: " + profile.getId());
      console.log("Full Name: " + profile.getName());
      console.log("Given Name: " + profile.getGivenName());
      console.log("Family Name: " + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());
      console.log(this.auth.currentUser.get().getAuthResponse().id_token);

      return <div>is signed in</div>;
    } else return <div>not signed in</div>;
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
