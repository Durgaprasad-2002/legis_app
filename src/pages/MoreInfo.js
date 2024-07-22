import React, { useState, useEffect } from "react";
import NavbarLaw from "./Navbar";
import { useLocation } from "react-router-dom";
import "./index.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import axios from "axios";
import Loader from "./Loader";

export default function MoreInfo() {
  let location = useLocation();
  let navigate = useNavigate();
  const MoreInfoComponent = (text) => {
    navigate(`${text}/?p=1`, { state: "sub" });
  };

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  let [data, setData] = useState({});

  const GetData = (id) => {
    axios
      .get(`https://legis-code.onrender.com/getBlog/${id}`)
      .then((e) => {
        console.log(e.data);
        setData(e.data);
      })
      .catch((e) => {
        console.log(e);
        alert("Got Error While Getting Try Again..!");
      });
  };

  useEffect(() => {
    let id = window.location.href.split("?")[1].slice(3);
    // alert(id);
    GetData(id);
  }, []);

  let MainCon = (
    <>
      <NavbarLaw />

      <div className="sub-title">
        <p className="path-container">
          {" "}
          <span className="path" onClick={() => MoreInfoComponent("")}>
            Home
          </span>{" "}
          /{" "}
          <span className="path" onClick={() => MoreInfoComponent("/blog")}>
            Blogs
          </span>{" "}
        </p>
        <h1> {data.title}</h1>
      </div>

      <section className="container-fluid">
        <div className="row card-blog-outer">
          <div className="col-md-12">
            <h2 className="blog-main-title">{data.title}</h2>

            <div className="Published">
              <h5>
                Published by <b>Legis Code</b>
              </h5>
              <h6>January 20, 2024</h6>
            </div>

            <div className="sub-blog-image-outer">
              <img
                src={data.image?.replace(
                  "http://localhost:8000",
                  "https://legis-code.onrender.com"
                )}
                className="sub-blog-image"
              />
            </div>

            <p className="blog-para">{data.desc}</p>
          </div>
        </div>{" "}
      </section>
      <Footer />
    </>
  );

  return <>{data?.title != undefined ? <>{MainCon}</> : <Loader />}</>;
}
