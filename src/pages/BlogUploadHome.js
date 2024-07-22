import React, { useEffect, useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../Images/logo.png";
import Footer from "./Footer";
import Loader from "./Loader";
import "./index.css";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

export default function BlogUploadHome() {
  const { page } = useParams();
  const navigate = useNavigate();
  const [pageno, setPageno] = useState(page ? parseInt(page) : 1);
  const [blogs, setBlogs] = useState([]);
  const [blogArr, setBlogArr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("login") !== "true") {
      navigate("/BlogUploadLogin");
    }
  }, [navigate]);

  const getData = async (pageNum) => {
    try {
      const response = await axios.get(
        `https://legis-code.onrender.com/getAllBlogs/${pageNum}`
      );
      setBlogs(response.data);
      setBlogArr(response.data.blogs);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error while fetching data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageno(page ? parseInt(page) : 1);
    getData(page ? parseInt(page) : 1);
  }, [page]);

  const handlePage = (e) => {
    const currentPage = blogs.currentPage;
    const newPage = currentPage + Number(e.target.value);
    if (newPage > 0 && newPage <= blogs.totalPages) {
      navigate(`/BlogUpload/${newPage}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("login");
    navigate("/BlogUploadLogin");
  };

  const handleUpload = () => {
    navigate("/Upload");
  };

  return (
    <div className="outer-BlogUpload-Main">
      <div className="navbar-blog-upload">
        <div className="r1-up-bg">
          <img src={logo} className="blog-logo" alt="Logo" />
          <span className="logout-btn" title="Logout">
            <TbLogout2
              className="log-icon"
              title="Logout"
              onClick={handleLogout}
            />
          </span>
        </div>
        <div className="r2-up-bg">
          <div className="search-icon">
            <FiSearch />
          </div>
          <div className="input-container">
            <input
              type="text"
              className="blog-search"
              placeholder="DD/MM/YYYY"
            />
          </div>
          <button className="upload-btn" onClick={handleUpload}>
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
        {loading ? (
          <Loader />
        ) : (
          blogArr.map((data) => (
            <div className="bg-card row" key={data._id}>
              <div className="col-md-3">
                <img
                  src={data.image.replace(
                    "http://localhost:8000",
                    "https://legis-code.onrender.com"
                  )}
                  className="blog-up-img"
                  alt={data.title}
                />
              </div>
              <div className="container-details col-md-9">
                <h4 className="up-title">{data.title}</h4>
                <p className="text-color-1">Published on 30/10/2007</p>
                <div>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <br />
      <h5 className="tog-btn-above">More content</h5>
      <div className="toggle-button">
        <button
          onClick={() => handlePage(-1)}
          value="-1"
          disabled={pageno <= 1}
        >
          <FaCaretLeft /> Prev
        </button>
        .......
        <button
          onClick={handlePage}
          value="1"
          disabled={pageno >= blogs.totalPages}
        >
          Next <FaCaretRight />
        </button>
      </div>

      <Footer />
    </div>
  );
}
