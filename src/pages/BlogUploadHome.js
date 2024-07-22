import React from "react";
import logo from "../Images/logo.png";
import { TbLogout2 } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import Loader from "./Loader";
import { useParams } from "react-router-dom";

export default function BlogUploadHome() {
  let { page } = useParams();

  useEffect(() => {
    if (localStorage.getItem("login") != "true") {
      window.location.pathname = "/BlogUploadLogin";
    }
  }, []);

  const [pageno, setpageno] = useState(1);
  const [blogs, setblogs] = useState([]);
  const [blogArr, setblogArr] = useState([]);

  let GetData = (page) => {
    axios
      .get(`https://legis-code.onrender.com/getAllBlogs/${page}`)
      .then((e) => {
        console.log(e.data);
        setblogs(e.data);
        setblogArr(e.data.blogs);
      })
      .catch((e) => {
        console.log(e);
        alert("Got Error While Getting Try Again..!");
      });
  };

  useEffect(() => {
    setpageno(page);
    GetData(page);
  }, []);

  const HandlePage = (e) => {
    let currentPage = Number(blogs.currentPage);
    let val = Number(e.target.value);
    let newPage = val + currentPage;
    if (newPage > 0 && newPage <= blogs.totalPages) {
      window.location.pathname = `/BlogUpload/${newPage}`;
    }
  };

  let Mian = (
    <>
      <div className="outer-BlogUpload-Main">
        <div className="navbar-blog-upload">
          <div className="r1-up-bg">
            <img src={logo} className="blog-logo" />
            <span className="logout-btn" title="Logout">
              <TbLogout2
                className="log-icon"
                title="Logout"
                onClick={() => {
                  localStorage.removeItem("login");
                  window.location.pathname = "/BlogUploadLogin";
                }}
              />
            </span>
          </div>
          <div className="r2-up-bg">
            <div class="search-icon">
              <FiSearch />
            </div>
            <div class="input-container">
              <input type="text" class="blog-search" placeholder="DD/MM/YYYY" />
            </div>
            <button
              class="upload-btn"
              onClick={() => {
                window.location.pathname = "/Upload";
              }}
            >
              Upload
            </button>
          </div>
        </div>
        <div
          className="container-fluid"
          style={{
            background: "rgb(241, 239, 239)",
            minHeight: "80vh",
            paddingTop: "10px",
          }}
        >
          {blogArr.map((data, key) => {
            return (
              <>
                <div className="bg-card row">
                  <div className="col-md-3">
                    <img
                      src={data.image.replace(
                        "http://localhost:8000",
                        "https://legis-code.onrender.com"
                      )}
                      className="blog-up-img"
                    />
                  </div>
                  <div className="container-details col-md-9">
                    <h4 className="up-title">{data.title}</h4>
                    <p className="text-color-1">published on 30/10/2007</p>
                    <div>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="toggle-button">
          <button onClick={HandlePage} value="-1">
            Prev
          </button>
          <button onClick={HandlePage} value="1">
            Next
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
  return <>{blogArr.length != 0 ? Mian : <Loader />}</>;
}
