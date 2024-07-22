import React from "react";
import vision from "../Images/vision.jpg";
import "./index.css";

export default function CardSlide() {
  return (
    <>
      <div className="vision-img-outer">
        <img className="vision-img" src={vision} />
        <h4 className="img-back-text">
          Legis Code
          <br />
          We are here to help you
        </h4>
      </div>
    </>
  );
}
