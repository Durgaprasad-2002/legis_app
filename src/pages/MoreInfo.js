import React, { useState, useEffect } from "react";
import NavbarLaw from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import Footer from "./Footer";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import axios from "axios";
import Loader from "./Loader";

export default function MoreInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) {
      fetchBlogData(id);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const fetchBlogData = async (id) => {
    try {
      const response = await axios.get(
        `https://legis-code.onrender.com/getBlog/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
      alert("Got Error While Getting Try Again..!");
    }
  };

  const navigateTo = (path) => {
    navigate(`${path}/?p=1`, { state: "sub" });
  };

  const mainContent = (
    <>
      <NavbarLaw />
      <div className="sub-title">
        <p className="path-container">
          <span className="path" onClick={() => navigateTo("")}>
            Home
          </span>{" "}
          /
          <span className="path" onClick={() => navigateTo("/blog")}>
            Blogs
          </span>
        </p>
        <h1>{data.title}</h1>
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
                alt={data.title}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdxXTJfjkJRIYLXuESrhcWOZFpV6b27WQFoXKXWMqxs_7X2HNR5b9h93oNkWszI6uNj2k&usqp=CAU")
                }
              />
            </div>
            <p className="blog-para">{data.desc}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );

  return <>{data?.title ? mainContent : <Loader />}</>;
}
