import React, { Component } from "react";
import Post from "../Post/Post";
import uploadimage from "../../images/upload3.png";
import "./MainPage.css";
import { auth, storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

export class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postArray: [],
      progressBar: "",
    };
  }
  componentDidMount = () => {
    this.getPost();
  };

  getPost = () => {
    axios
      .get("https://instagram-clone-24-7.herokuapp.com/posts")
      .then((res) => {
        this.setState({ postArray: res.data });
      })
      .catch((err) => {});
  };

  upload = (event) => {
    let image = event.target.files[0];
    let imageName = image.name;
    if (image == null || image == undefined) return;
    const storageRef = ref(storage, "images/" + imageName);

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
            postId: Math.floor(Math.random() * 1000000),
            userId: localStorage.getItem("users"),
            postPath: downloadURL,
            timeStamp: new Date().getTime(),
            likeCount: 0,
          };
          axios
            .post("https://instagram-clone-24-7.herokuapp.com/posts", payload)
            .then((res) => {
              this.getPost();
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
      <div>
        <div className="mainpage_upload">
          <div className="mainpage_line mainpage_line1"></div>
          <div className="fileupload">
            <label htmlFor="file=upload2">
              <img src={uploadimage}></img>
            </label>
            <input onChange={this.upload} id="file=upload2" type="file"></input>
          </div>
          <div className="mainpage_line"></div>
        </div>

        <div className="progressBar">
          <ProgressBar
            animated
            variant="success"
            now={this.state.progressBar}
            label={`${this.state.progressBar}% completed`}
          />
        </div>
        {this.state.postArray.map((item) => (
          <Post
            id={item.postId}
            userName={item.userName}
            postImage={item.postPath}
            likes={item.likeCount}
          ></Post>
        ))}
      </div>
    );
  }
}

export default MainPage;
