import React, { Component } from "react";
import "../LoginPage/LoginPage.css";
import { auth, storage } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import cors from "cors";

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      name: null,
      username: null,
      password: null,
    };
  }
  Singup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const payload = {
          userId: user.uid,
          userName: this.state.username,
          name: this.state.name,
          profileImage: "",
        };
        axios
          .post("https://instagram-clone-24-7.herokuapp.com/users", payload)
          .then((res) => {
            localStorage.setItem("users", user.uid);
            window.location.reload();
          })
          .catch((err) => {});
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
      <div className="signupPage_main">
        <form onSubmit={this.Singup}>
          <input
            type="text"
            name="email"
            placeholder="Mobile Number or Email"
            onChange={this.setValues}
          ></input>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={this.setValues}
          ></input>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.setValues}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.setValues}
          ></input>
          <input type="submit" value="Sign Up"></input>
        </form>
      </div>
    );
  }
}

export default SignUp;
