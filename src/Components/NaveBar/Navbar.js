import React, { Component } from "react";
import "./Navbar.css";
import { Grid } from "@material-ui/core";
import insta_logo from "../../images/logoinsta.png";
import home from "../../images/home.svg";
import message from "../../images/message.svg";
import find from "../../images/find.svg";
import react from "../../images/love.svg";
import Avatar from "@material-ui/core/Avatar";
import { auth, storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      progressBar: "",
      progressVisible: false,
      options: false,
    };
  }
  componentDidMount = () => {
    this.getProfilePic();
  };
  getProfilePic = () => {
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
  upload1 = (event) => {
    let image = event.target.files[0];
    let imageName = image.name;
    if (image == null || image == undefined) return;
    const storageRef = ref(storage, "images/profilePic/" + imageName);

    const uploadTask = uploadBytesResumable(storageRef, image);
    this.setState({ progressVisible: true });
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ progressBar: progress });
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const payload = {
            userId: localStorage.getItem("users"),
            profileImage: downloadURL,
          };

          axios
            .put("https://instagram-clone-24-7.herokuapp.com/users", payload)
            .then((res) => {
              this.getProfilePic();
              this.setState({ progressBar: 0 });
              this.setState({ progressVisible: false });
            })
            .catch((err) => {});
        });
      }
    );
  };
  logout = () => {
    localStorage.removeItem("users");
    window.location.reload();
  };
  render() {
    return (
      <div className="navbar_barContent">
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <img src={insta_logo} className="navbar_logo"></img>
          </Grid>
          <Grid item xs={3}>
            <input
              type="text"
              placeholder="Search"
              className="navbar_search"
            ></input>
          </Grid>
          <Grid item xs={3} className="navbacr_icons">
            <img src={home}></img>
            <img src={message}></img>
            <img src={find}></img>
            <img src={react}></img>
            <div className="fileupload">
              <label htmlFor="file=upload">
                <Avatar
                  className="Avatar"
                  src={this.state.user.profileImage}
                  onClick={this.showTypes}
                ></Avatar>
              </label>
              <input
                onChange={this.upload1}
                id="file=upload"
                type="file"
              ></input>
            </div>
            {this.state.progressVisible && (
              <div className="Navbar_progress">
                {Math.floor(this.state.progressBar)}%
              </div>
            )}
          </Grid>
          <Grid item xs={1}>
            <div className="logOut" onClick={this.logout}>
              Log Out
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Navbar;
