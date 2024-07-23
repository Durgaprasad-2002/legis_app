import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NavbarLaw from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader_LAWS";
import { changeMode } from "../Slices/Modes/Mode";
import "./index.css";

export default function SubLawDetails() {
  const [lawName, setLawName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [details, setDetails] = useState([]);
  const [lawIndex, setLawIndex] = useState("");

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [mode, setMode] = useState(true);
  const [bgColor, setBgColor] = useState("white");
  const [textColor, setTextColor] = useState("#1a1a1a");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    changeBackground();
  }, [count]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lawIndex = params.get("law");
    const chapter = params.get("chapter");
    const section = params.get("section");
    setLawIndex(lawIndex);
    fetchDetails(lawIndex, chapter, section);
  }, []);

  const changeBackground = () => {
    if (count) {
      setBgColor("#1a1a1a");
      setTextColor("white");
      setMode(false);
    } else {
      setBgColor("white");
      setTextColor("#1a1a1a");
      setMode(true);
    }
  };

  const handleToggle = () => {
    dispatch(changeMode());
  };

  const fetchDetails = (law, chapter, section) => {
    axios
      .get(
        `https://legis-code.onrender.com/LawDetails/?law=${law}&chapter=${chapter}&section=${section}`
      )
      .then((response) => {
        const data = response.data;
        setLawName(data.name);
        setSectionName(data.Data.name);
        setDetails(data.Data.details);
      })
      .catch((error) => {
        console.error(error);
        alert("Got Error While Getting Try Again..!");
      });
  };

  const navigateTo = (text) => {
    navigate(`/${text}`, { state: "sub" });
  };

  const navigateToChapter = () => {
    navigate(`/LawSection?law=${lawIndex}`);
  };

  const renderDetails = (details) => {
    return details.map((detail, index) => {
      if (typeof detail === "string") {
        return (
          <li key={index} style={{ marginBottom: "15px" }}>
            {detail}
          </li>
        );
      } else {
        return (
          <li key={index}>
            {detail.name}
            <ul id="innerlist" style={{ color: textColor }}>
              {detail.details.map((subDetail, subIndex) => {
                if (typeof subDetail === "string") {
                  return <li key={subIndex}>{subDetail}</li>;
                } else {
                  return (
                    <li key={subIndex}>
                      {subDetail.name}
                      <ul id="innerlist" style={{ color: textColor }}>
                        {subDetail.details.map((innerDetail, innerIndex) => (
                          <li key={innerIndex}>{innerDetail}</li>
                        ))}
                      </ul>
                    </li>
                  );
                }
              })}
            </ul>
            <br />
          </li>
        );
      }
    });
  };

  const MainContent = (
    <>
      <NavbarLaw />
      <div className="sub-title">
        <p className="path-container">
          <span className="path" onClick={() => navigateTo("")}>
            Home
          </span>{" "}
          /
          <span className="path" onClick={() => navigateTo("law")}>
            {" "}
            Laws
          </span>{" "}
          /
          <span className="path" onClick={navigateToChapter}>
            {" "}
            Chapters
          </span>{" "}
          /
        </p>
        <h1>{lawName}</h1>
      </div>

      <div
        className="SubLawDetails"
        style={{
          minHeight: "68vh",
          background: bgColor,
          color: textColor,
          paddingBottom: "50px",
        }}
      >
        <h3
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "nowrap",
            textAlign: "left",
          }}
        >
          {sectionName}
          <div
            className="toggler"
            onClick={handleToggle}
            style={{ marginRight: "0px", minWidth: "50px" }}
          >
            <div
              className="togglediv"
              style={{
                transition: "all 0.5s ease",
                float: mode ? "left" : "right",
              }}
            ></div>
          </div>
        </h3>
        <br />
        <ul style={{ color: textColor }}>{renderDetails(details)}</ul>
      </div>
      <Footer />
    </>
  );

  return <>{details.length ? MainContent : <Loader />}</>;
}
