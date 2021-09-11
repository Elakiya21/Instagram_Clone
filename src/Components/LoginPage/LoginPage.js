import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import insta_image from "../../images/9364675fb26a.svg";
import insta_logo from "../../images/logoinsta.png";
import "./LoginPage.css";
import fb from "../../images/fb.png";
import appStore from "../../images/app.png";
import playStore from "../../images/play.png";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SingUp/SignUp";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
    };
  }
  changeLogin = () => {
    if (this.state.isLogin) this.setState({ isLogin: false });
    else this.setState({ isLogin: true });
  };
  render() {
    return (
      <div className="loginpage_main">
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <center>
              <div className="loginpage_login">
                <div>
                  <img className="loginpage_logo" src={insta_logo}></img>
                </div>
                <div className="loginpage_form">
                  {this.state.isLogin ? <SignIn /> : <SignUp />}

                  <div className="loginpage_ordiv">
                    <div className="loginpage_hr"></div>
                    <div className="loginpage_or">OR</div>
                    <div className="loginpage_hr"></div>
                  </div>
                  <div className="loginpage_fbfp">
                    <div className="loginpage_fb">
                      <img src={fb}></img>Log in with Facebook
                    </div>
                    <div className="loginpage_fp">Forget password ?</div>
                  </div>
                </div>
              </div>
              <div className="loginpage_singupOption">
                {this.state.isLogin ? (
                  <div className="loginpage_singup">
                    Don't have an account?
                    <span onClick={this.changeLogin}>Sign up</span>
                  </div>
                ) : (
                  <div className="loginpage_singin">
                    Have an account?
                    <span onClick={this.changeLogin}>Sign in</span>
                  </div>
                )}
              </div>
              <div className="loginpage_app">
                <div className="loginPage_getapp">Get the app</div>
                <div className="loginpage_store">
                  <img src={appStore}></img>
                  <img src={playStore}></img>
                </div>
              </div>
            </center>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
