import React, { Component } from "react";
import "./InfoSection.css";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

export class InfoSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
    };
  }

  componentDidMount = () => {
    axios
      .get(
        "https://instagram-clone-24-7.herokuapp.com/users/" +
          localStorage.getItem("users")
      )
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((err) => {});
  };
  render() {
    return (
      <div className="InfoSection_info">
        <Avatar
          className="InfoSection_Avatar"
          style={{ height: "55px", width: "55px" }}
          src={this.state.user.profileImage}
        ></Avatar>
        <div className="InfoSection_Username_describtion">
          <div className="InfoSection_Username">{this.state.user.userName}</div>
          <div className="InfoSection_Describtion">
            {this.state.user.userName}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoSection;
