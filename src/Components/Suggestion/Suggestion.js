import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Suggestion.css";
import surya from "../../images/surya.jpg";
import samantha from "../../images/samantha.jpg";
import smriti from "../../images/smriti.jpg";
import virat from "../../images/virat.jpg";

export class Suggestion extends Component {
  render() {
    return (
      <div>
        <div className="suggestion_container">
          <div className="suggestion_header">Suggestions for you</div>
          <div className="suggestion_body">
            <Avatar
              style={{ height: "35px", width: "35px" }}
              src={virat}
            ></Avatar>
            <div className="suggestion_friendlist">virat.kohli</div>
          </div>
          <div className="suggestion_body">
            <Avatar
              style={{ height: "35px", width: "35px" }}
              src={samantha}
            ></Avatar>
            <div className="suggestion_friendlist">samantharuthprabhuoffl</div>
          </div>
          <div className="suggestion_body">
            <Avatar
              style={{ height: "35px", width: "35px" }}
              src={smriti}
            ></Avatar>
            <div className="suggestion_friendlist">smriti_mandhana</div>
          </div>
          <div className="suggestion_body">
            <Avatar
              style={{ height: "35px", width: "35px" }}
              src={surya}
            ></Avatar>
            <div className="suggestion_friendlist">actorsuriya</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Suggestion;
