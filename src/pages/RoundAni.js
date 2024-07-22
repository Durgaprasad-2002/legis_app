import React from "react";
import "./index.css";
import ani from "../Images/anilogo.png";

export default function RoundAni() {
  return (
    <>
      <div className="rotate-div">
        <img src={ani} className="animate" />
      </div>
    </>
  );
}
