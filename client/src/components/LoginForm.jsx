import React from "react";
import Joi from "joi-browser";
import { login } from "../services/authService";
import Form from "./common/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.email, data.password);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div style={{ marginLeft: "30%", marginRight: "30%" }}>
        <h1 style={{ textAlign: "center", margin: "5%" }}>Login</h1>
        <form onSubmit={this.handleSubmit} className="ui form">
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        <Button
          href="http://localhost:5005/api/auth/google"
          style={{ marginTop: "2%" }}
        >
          <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "1rem" }} />
          Sign In With Google
        </Button>
      </div>
    );
  }
}

export default LoginForm;
