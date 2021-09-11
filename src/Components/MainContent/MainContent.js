import React, { Component } from "react";
import "./MainContent.css";
import { Grid } from "@material-ui/core";
import StatusBar from "../StatusBar/StatusBar";
import MainPage from "../MainPage/MainPage";
import InfoSection from "../InfoSection/InfoSection";
import Suggestion from "../Suggestion/Suggestion";

export class MainContent extends Component {
  render() {
    return (
      <div className="main">
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={6}>
            <div>
              <StatusBar></StatusBar>
              <MainPage></MainPage>
            </div>
          </Grid>
          <Grid item xs={2}>
            <InfoSection></InfoSection>
            <Suggestion></Suggestion>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
    );
  }
}

export default MainContent;
