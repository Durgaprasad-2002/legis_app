import React from "react";
import "./index.css";

export default function MarqueeAnimi() {
  return (
    <>
      <div className="marquue" style={{ position: "sticky" }}>
        <div className="marquee">
          <div className="track">
            <div className="content">
              &nbsp;<span>Legis Code</span> <span>Legis Code</span>{" "}
              <span>Legis Code</span> <span>Legis Code</span>{" "}
              <span>Legis Code</span>
              <span>Legis Code</span> <span>Legis Code</span>{" "}
              <span>Legis Code</span> <span>Legis Code</span>{" "}
              <span>Legis Code</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
