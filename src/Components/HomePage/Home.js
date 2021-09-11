import React, { Component } from "react";
import MainContent from "../MainContent/MainContent";
import Navbar from "../NaveBar/Navbar";

export class home extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <MainContent></MainContent>
      </div>
    );
  }
}

export default home;
