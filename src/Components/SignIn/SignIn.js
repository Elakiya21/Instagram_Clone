import React, { Component } from "react";
import "../LoginPage/LoginPage.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../Firebase";
import axios from "axios";

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };
  }
  Signin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, this.state.username, this.state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("users", user.uid);
        window.location.reload();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  setValues = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.Signin}>
          <input
            type="text"
            name="username"
            placeholder="Phone number,username, or email"
            onChange={this.setValues}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.setValues}
          ></input>
          <input type="submit" value="Log In"></input>
        </form>
      </div>
    );
  }
}

export default SignIn;
