import React, { Component } from "react";
import "./StatusBar.css";
import Avatar from "@material-ui/core/Avatar";
import uploadimage from "../../images/upload4.png";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../Firebase";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export class StatusBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusList: [],
      progressBar: "",
      displayImage: false,
      path: "",
    };
  }
  displayModel = (path) => {
    this.setState({ displayImage: !this.state.displayImage });
    this.setState({ path: path });
  };
  componentDidMount = () => {
    this.getData();
  };
  getData = () => {
    axios
      .get("https://instagram-clone-24-7.herokuapp.com/status")
      .then((res) => {
        this.setState({ statusList: res.data });
      })
      .catch((err) => {});
  };
  upload2 = (event) => {
    let image = event.target.files[0];
    let imageName = image.name;
    if (image == null || image == undefined) return;
    const storageRef = ref(storage, "images/story/" + imageName);

    const uploadTask = uploadBytesResumable(storageRef, image);

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
            statusId: Math.floor(Math.random() * 1000000),
            userId: localStorage.getItem("users"),
            path: downloadURL,
            timeStamp: new Date().getTime(),
          };

          axios
            .post("https://instagram-clone-24-7.herokuapp.com/status", payload)
            .then((res) => {
              this.getData();
              this.setState({ progressBar: 0 });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    );
  };

  render() {
    return (
      <div className="statusbar_container">
        <div className="test">
          <div className="fileupload">
            <label htmlFor="file=upload1">
              <img src={uploadimage} className="statusbar_upload"></img>
            </label>
            <input
              onChange={this.upload2}
              id="file=upload1"
              type="file"
            ></input>
          </div>
          <div className="progressBar1">
            <ProgressBar
              animated
              variant="success"
              now={this.state.progressBar}
              label={`${this.state.progressBar}% completed`}
            />
          </div>
        </div>
        {this.state.statusList.map((item, index) => (
          <div className="status">
            <Avatar
              className="statusbar_Avatar"
              style={{ height: "55px", width: "55px" }}
              src={item.path}
              onClick={() => this.displayModel(item.path)}
            ></Avatar>
            <div className="statusbar_text">{item.userName}</div>
          </div>
        ))}
        {this.state.displayImage && (
          <div>
            <Modal show={this.state.displayImage}>
              <Modal.Body>
                <Image src={this.state.path} fluid />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.displayModel}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default StatusBar;
