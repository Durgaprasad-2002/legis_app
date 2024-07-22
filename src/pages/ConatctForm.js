import React from "react";
import "./index.css";

export default function ConatctForm() {
  return (
    <div className="form">
      <br />
      <div className="container-fluid">
        <div className="row top-title">
          <h3 className="contact-title"></h3>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="pos-top">
            {" "}
            <div className="row">
              <div className="col-md-4">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  className="input"
                  type="number"
                  placeholder="Phone"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <textarea
                  className="txt"
                  rows={3}
                  placeholder="Message"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button className="contact-btn">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* <div style={{ margin: "0px 20px 0px 20px" }}>
        <div className="Details-bar">
          <h2 className="text-details">For Legal Assistance </h2>
          <button className="Detail-btn">Contact US</button>
        </div>
      </div> */}
    </div>
  );
}
