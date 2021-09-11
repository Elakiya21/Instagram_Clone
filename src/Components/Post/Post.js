import React, { Component } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import postimage from "../../images/post.jpg";
import love from "../../images/love.svg";
import liked from "../../images/likeHeart.jpg";
import share from "../../images/share.svg";
import comment from "../../images/comment.svg";
import save from "../../images/save.svg";
import axios from "axios";

export class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentList: [],
      view: false,
      likeInc: this.props.likes,
    };
  }
  postLikes = () => {
    let payload = {
      postId: this.props.id,
      likeCount: this.state.likeInc + 1,
    };
    axios
      .put("https://instagram-clone-24-7.herokuapp.com/posts", payload)
      .then((res) => {})
      .catch((err) => {});
  };
  IncrementLike = () => {
    this.setState({ likeInc: this.state.likeInc + 1 });
    this.postLikes();
  };
  viewAll = () => {
    this.setState({ view: true });
  };
  setComment = (event) => {
    if (event.key == "Enter") {
      var comment = event.target.value;
      event.target.value = "";
      if (comment != null || comment != undefined) {
        const payload = {
          commentId: Math.floor(Math.random() * 1000000),
          userId: localStorage.getItem("users"),
          postId: this.props.id,
          timeStamp: new Date().getTime(),
          comment: comment,
        };
        axios
          .post("https://instagram-clone-24-7.herokuapp.com/comments", payload)
          .then((res) => {
            this.getComments();
          })
          .catch((err) => {});
      }
    }
  };
  componentDidMount = () => {
    this.getComments();
  };
  getComments = () => {
    axios
      .get(
        "https://instagram-clone-24-7.herokuapp.com/comments/" + this.props.id
      )
      .then((res) => {
        this.setState({ commentList: res.data });
      })
      .catch((err) => {});
  };
  render() {
    return (
      <div className="post_container">
        {/* header */}
        <div className="post_header">
          <Avatar className="post_image"></Avatar>
          <div className="post_text">{this.props.userName}</div>
        </div>
        {/* post */}
        <div className="post_post">
          <img src={this.props.postImage}></img>
        </div>
        {/* no of likes */}
        <div>
          <div className="post_likes_img">
            <img src={love} onClick={this.IncrementLike}></img>
            <img src={comment}></img>
            <img src={share}></img>
            <img src={save} className="post_save"></img>
          </div>
          <div className="posts_likes">{this.state.likeInc} likes</div>
        </div>
        {/* comment */}
        <div>
          <div className="post_comment">
            {this.state.commentList.map((item, index) =>
              this.state.view ? (
                <div className="comment">
                  {item.userName}:{item.comment}
                </div>
              ) : index < 5 ? (
                <div className="comment">
                  {item.userName}:{item.comment}
                </div>
              ) : (
                <span className="view" onClick={this.viewAll}>
                  view all
                </span>
              )
            )}
          </div>
          <div>
            <input
              className="post_addComment"
              type="text"
              placeholder="Add a comment..."
              onKeyPress={this.setComment}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
