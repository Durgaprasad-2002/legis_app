import React, { useState, useEffect, useCallback } from "react";
import NavbarLaw from "./Navbar";
import "./index.css";
import { BsLink45Deg } from "react-icons/bs";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function Blog() {
  const { pg } = useParams();
  const navigate = useNavigate();
  const [pageno, setPageno] = useState(parseInt(pg, 10) || 1);
  const [blogs, setBlogs] = useState(null);
  const [blogArr, setBlogArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = useCallback(async (page) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://legis-code.onrender.com/getAllBlogs/${page}`
      );
      console.log(response.data);
      setBlogs(response.data);
      setBlogArr(response.data.blogs);
    } catch (err) {
      console.error(err);
      setError("Got an error while fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const page = parseInt(pg, 10) || 1;
    setPageno(page);
    fetchBlogs(page);
  }, [pg, fetchBlogs]);

  const handlePageChange = (increment) => {
    const newPage = pageno + increment;
    if (newPage > 0 && newPage <= (blogs?.totalPages || 1)) {
      navigate(`/blog/${newPage}`);
    }
  };

  const navigateToMoreInfo = (id) => {
    navigate(`/sub?id=${id}`, { state: "sub" });
  };

  const navigateToHome = () => {
    navigate("/", { state: "sub" });
  };

  const renderBlogItems = () =>
    blogArr.map((blog) => (
      <div className="col-item" key={blog._id}>
        <div className="img-outer">
          <img
            className="img-blog"
            src={blog.image.replace(
              "http://localhost:8000",
              "https://legis-code.onrender.com"
            )}
            alt={blog.title}
            onError={(e) =>
              (e.currentTarget.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdxXTJfjkJRIYLXuESrhcWOZFpV6b27WQFoXKXWMqxs_7X2HNR5b9h93oNkWszI6uNj2k&usqp=CAU")
            }
          />
        </div>
        <div className="outer-linker">
          <BsLink45Deg className="linker" />
        </div>
        <h6 className="date">
          Published in <b>Legis Law</b> on January 20, 2024
        </h6>
        <h3>{blog.title}</h3>
        <span onClick={() => navigateToMoreInfo(blog._id)}>Read More ››</span>
      </div>
    ));

  return (
    <>
      <NavbarLaw />
      <div className="blog-title">
        <p className="path-container">
          <span className="path" onClick={navigateToHome}>
            Home
          </span>
        </p>
        <h1>Blogs</h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <section>
          <div className="columns">
            {blogArr.length > 0 ? (
              renderBlogItems()
            ) : (
              <div
                style={{
                  height: "70vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <h4>No Blogs are added</h4>
              </div>
            )}
          </div>
          <br />
          <h5 className="tog-btn-above"></h5>
          <div className="toggle-button">
            <button onClick={() => handlePageChange(-1)} disabled={pageno <= 1}>
              <FaCaretLeft /> Prev
            </button>
            <button
              onClick={() => handlePageChange(1)}
              disabled={pageno >= blogs.totalPages}
            >
              Next <FaCaretRight />
            </button>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
