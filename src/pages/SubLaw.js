import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NavbarLaw from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader_LAWS";
import { changeMode } from "../Slices/Modes/Mode";
import "./index.css";

export default function SubLaw() {
  const navigate = useNavigate();
  const location = useLocation();
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [mode, setMode] = useState(true);
  const [bgColor, setBgColor] = useState("white");
  const [textColor, setTextColor] = useState("#1a1a1a");
  const [lawName, setLawName] = useState("");
  const [sectionsList, setSectionsList] = useState([]);
  const [chapterList, setChapterList] = useState([]);

  useEffect(() => {
    handleModeChange();
  }, [count]);

  useEffect(() => {
    const lawIndex = new URLSearchParams(window.location.search).get("law");
    if (lawIndex) {
      fetchSections(lawIndex);
    }
  }, []);

  const handleModeChange = () => {
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

  const fetchSections = async (law) => {
    try {
      const response = await axios.get(
        `https://legis-code.onrender.com/LawSections/${law}`
      );
      const data = response.data;
      setSectionsList(data);
      setLawName(data.name);
      setChapterList(data.Chapters);
    } catch (error) {
      console.error(error);
      alert("Got Error While Getting Try Again..!");
    }
  };

  const navigateToSubLawDetails = (chapterIndex, sectionIndex) => {
    const lawIndex = new URLSearchParams(window.location.search).get("law");
    navigate(
      `/LawDetails?law=${lawIndex}&chapter=${chapterIndex}&section=${sectionIndex}`
    );
  };

  const navigateTo = (text) => {
    navigate(`/${text}`, { state: "Main" });
  };

  const mainContent = (
    <div style={{ background: bgColor }}>
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
          / {lawName}
        </p>
        <h1>{lawName}</h1>
      </div>
      <div
        className="summary"
        style={{ color: textColor, background: bgColor }}
      >
        <h4
          className="chapter-name"
          style={{
            color: textColor,
            background: bgColor,
            marginLeft: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Summary :
          <div
            className="toggler"
            onClick={handleToggle}
            style={{ marginRight: "20px" }}
          >
            <div
              className="togglediv"
              style={{
                transition: "all 0.5s ease",
                float: mode ? "left" : "right",
              }}
            ></div>
          </div>
        </h4>
        <p>
          <ul className="summary-ul">
            {Array.isArray(sectionsList.summary) ? (
              sectionsList.summary.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <>{sectionsList.summary}</>
            )}
          </ul>
        </p>
      </div>
      <div
        className="SubLawContainer"
        style={{
          color: textColor,
          background: bgColor,
          minHeight: "400px",
          paddingBottom: "50px",
        }}
      >
        {chapterList.map((chapter, chapterIndex) => (
          <li
            key={chapter.name}
            style={{ listStyleType: "none" }}
            className="outer-li"
          >
            <h4
              className="chapter-name"
              style={{ color: textColor, background: bgColor }}
            >
              Chapter{" "}
              {chapter.name
                .split(" ")
                .map((word, index) =>
                  index === 0
                    ? word.toUpperCase()
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </h4>
            <ul className="Sections-names">
              {chapter.sections.map((section, sectionIndex) => (
                <li
                  key={section.name}
                  onClick={() =>
                    navigateToSubLawDetails(chapterIndex, sectionIndex)
                  }
                >
                  {section.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </div>
      <Footer />
    </div>
  );

  return <>{chapterList.length ? mainContent : <Loader />}</>;
}
