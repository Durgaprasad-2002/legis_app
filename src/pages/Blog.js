import React from "react";
import NavbarLaw from "./Navbar";
import "./index.css";
import { BsLink45Deg } from "react-icons/bs";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { FaCaretLeft } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";

export default function Blog() {
  let { pg } = useParams();
  let navigate = useNavigate();
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
    setpageno(pg);
    GetData(pg);
  }, []);

  const HandlePage = (e) => {
    let currentPage = Number(pg);
    let val = Number(e.target.value);
    let newPage = val + currentPage;
    alert(newPage);
    if (newPage > 0 && newPage <= blogs.totalPages) {
      window.location.pathname = `/blog/${newPage}`;
    }
  };

  //------------------- Navigating to Components-------------------

  const MoreInfoComponent = (text) => {
    // alert(text);
    navigate(`/sub?id=${text}`, { state: "sub" });
  };

  const MoreInfoComponentH = (text) => {
    navigate("/", { state: "sub" });
  };

  let MainCon = (
    <>
      <NavbarLaw />
      <div className="blog-title">
        <p className="path-container">
          {" "}
          <span className="path" onClick={() => MoreInfoComponentH("")}>
            Home
          </span>{" "}
        </p>
        <h1>Blogs </h1>
      </div>
      <section>
        <div className="columns">
          {/*  */}
          {blogArr.map((data, key) => {
            return (
              <>
                <div className="col-item">
                  {" "}
                  <div className="img-outer">
                    <img
                      className="img-blog"
                      src={data.image.replace(
                        "http://localhost:8000",
                        "https://tense-elk-jumper.cyclic.app"
                      )}
                      // loading="lazy"
                    />
                  </div>
                  <div className="outer-linker">
                    <BsLink45Deg className="linker" />
                  </div>
                  <h6 className="date">
                    Published in <b>Legis Law</b> on October 31,2023
                  </h6>
                  <h3>{data.title}</h3>
                  <span onClick={() => MoreInfoComponent(data._id)}>
                    Read More {"  "}››
                  </span>
                </div>
              </>
            );
          })}

          {/*  */}
        </div>
        <br />
        <h5 className="tog-btn-above">More content</h5>
        <div className="toggle-button">
          <button onClick={HandlePage} value="-1">
            <FaCaretLeft /> Prev
          </button>
          .......
          <button onClick={HandlePage} value="1">
            Next
            <FaCaretRight />
          </button>
        </div>
      </section>
      <br />
      <Footer />
    </>
  );

  return <>{blogArr.length != 0 ? <>{MainCon}</> : <Loader />}</>;
}
