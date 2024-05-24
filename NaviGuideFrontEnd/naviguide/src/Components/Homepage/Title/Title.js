import React from "react";
import "./Title.css";
import logo from "../images/logo.png";

const Title = () => {
  return (
    <section>
      <div className="title">
        <div id="img">
          <img src={logo} alt="logo" id="logo" />
        </div>
        <div id="h1div">
          <h1 id="headername">NaviGuide ...</h1>
        </div>
      </div>
      
    </section>
  );
};

export default Title;
