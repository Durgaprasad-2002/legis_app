import React from "react";
import "./index.css";
import logo from "../Images/logo.png";
import { TbLogout2 } from "react-icons/tb";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import axios from "axios";
import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("login") != "true") {
      navigate("/BlogUploadLogin");
    }
  }, []);

  const [UploadData, setUploadData] = useState({
    title: "",
    desc: "",
    image: "",
  });

  const HandleChange = (e) => {
    setUploadData({
      ...UploadData,
      [e.target.name]: e.target.value,
    });
    console.log(UploadData);
  };

  const [previewSource, setPreviewSource] = useState("");

  const HandleImage = (e) => {
    setPreviewSource(e.target.files[0]);
    console.log(UploadData);
    //-----file reader To verify the Image by viewing It----------------------
    // const reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onloadend = () => {
    //   setUploadData({
    //     ...UploadData,
    //     image: reader.result,
    //   });
    //   setPreviewSource(reader.result);
    //   console.log(reader.result);
    //   alert("Image Saved");
    // };
    // reader.onerror = () => {
    //   console.error("Someting wrong with Image, Upload Again..!");
    //   alert("Someting wrong with Image, Upload Again..!");
    // };
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", previewSource);
    formData.append("title", UploadData.title);
    formData.append("desc", UploadData.desc);

    axios
      .post("https://legis-code.onrender.com/uploadBlog", formData)
      .then((e) => {
        console.log(e.data);
        alert("uploaded");
        navigate("/BlogUpload/1");
      })
      .catch((e) => {
        console.log(e);
        alert("Got Error While Uploading Try Again..!");
      });
  };

  return (
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
                  navigate("/BlogUploadLogin/1");
                }}
              />
            </span>
          </div>
        </div>

        {/*-------------------- Form to Upload-------------------- */}
        <form
          onSubmit={HandleSubmit}
          className="form-div"
          method="post"
          enctype="multipart/form-data"
        >
          <div className="holder-upload">
            <label>Title</label>
            <textarea
              className="title-field"
              required
              name="title"
              onChange={HandleChange}
            />
          </div>
          <div className="holder-upload">
            <label>Description</label>
            <textarea
              className="description-field"
              rows={5}
              required
              name="desc"
              onChange={HandleChange}
            />
          </div>
          <div className="drag-drop-conatiner">
            <div class="file-upload-form">
              <label for="file" class="file-upload-label">
                <div class="file-upload-design">
                  <span class="browse-button">Browse file</span>
                </div>
                <input
                  id="file"
                  type="file"
                  required
                  name="image"
                  onChange={HandleImage}
                />
              </label>
            </div>
          </div>
          <button type="submit" className="form-upload-submit">
            {" "}
            Upload
          </button>

          {/* <img src={previewSource} style={{ height: "100px" }} /> */}
        </form>
        {/* --------------------------------------------------------------------------------------- */}
        <br />
        <br />
        <Footer />
      </div>
    </>
  );
}
