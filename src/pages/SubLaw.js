import React from "react";
import "./index.css";
import NavbarLaw from "./Navbar";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../Slices/Modes/Mode";
import axios from "axios";
import Loader from "./Loader";

export default function SubLaw() {
  //-----------------Routing Catching parameters
  let navigate = useNavigate();
  let location = useLocation();

  //------------Navigate to home---------
  const MoreInfoComponent = (text) => {
    navigate(`/${text}`, { state: "Main" });
  };

  //-------------------Dark and Light mode method -------------

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  let [mode, setmode] = useState(true);
  let [bgcol, setbgcol] = useState("white");
  let [txtcol, settxtcol] = useState("#1a1a1a");
  let [title, settitle] = useState("");
  let [summary, setsummary] = useState("");

  const changeBG = () => {
    if (count === false) {
      setbgcol("white");
      settxtcol("#1a1a1a");
      setmode(true);
    } else {
      setbgcol("#1a1a1a");
      settxtcol("white");
      setmode(false);
    }
  };

  useEffect(() => {
    changeBG();
  }, [count]);

  const handleToggle = () => {
    dispatch(changeMode());
  };

  //-------------------------------Navigtes to the sections Content component--------------------------------
  let [lawName, setLawname] = useState("");
  const [SectionsList, setSectionsList] = useState([]);
  const [chapterList, setChapterList] = useState([]);

  const ToSubLawDetails = (chapterIndex, sectionIndex) => {
    let lawIndex = window.location.href.split("?")[1].slice(4);

    navigate(
      `/LawDetails?law=${lawIndex}&chapter=${chapterIndex}&section=${sectionIndex}`
    );
  };

  const GetSections = (law) => {
    axios
      .get(`https://legis-code.onrender.com/LawSections/${law}`)
      .then((e) => {
        console.log(e.data);
        setSectionsList(e.data);
        setLawname(e.data.name);
        setChapterList(e.data.Chapters);
        console.log(chapterList);
      })
      .catch((e) => {
        console.log(e);
        alert("Got Error While Getting Try Again..!");
      });
  };

  let [law, setLaw] = useState("");

  useEffect(() => {
    let lawIndex = window.location.href.split("?")[1].slice(4);
    // let newLaw = lawName.replaceAll("%20", " ");
    // setLaw(newLaw);
    GetSections(lawIndex);
  }, []);

  //---------------------Dom Elements --------------------

  let MainCon = (
    <div style={{ background: bgcol }}>
      <NavbarLaw />{" "}
      <div className="sub-title">
        <p className="path-container">
          <span className="path" onClick={() => MoreInfoComponent("")}>
            Home
          </span>{" "}
          /{" "}
          <span className="path" onClick={() => MoreInfoComponent("law")}>
            Laws
          </span>
          {"   "}/ {"   "}
          {lawName}
        </p>
        <h1>{}</h1>
      </div>
      <div className="summary" style={{ color: txtcol, background: bgcol }}>
        <h4
          className="chapter-name"
          style={{
            color: txtcol,
            background: bgcol,
            marginLeft: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Summary :{"  "}
          <div
            className="toggler"
            onClick={handleToggle}
            style={{ marginRight: "20px" }}
          >
            <div
              className="togglediv"
              style={{
                transition: "all 0.5s ease",
                float: `${mode == true ? "left" : "right"}`,
              }}
            ></div>
          </div>
        </h4>
        <p>
          <ul className="summary-ul">
            {Array.isArray(SectionsList.summary) ? (
              <>
                {" "}
                {/* {SectionsList.summary.map((ele) => {
                  return <li>{ele}</li>;
                })} */}
              </>
            ) : (
              <>{SectionsList.summary}</>
            )}
          </ul>
        </p>
      </div>
      <div
        className="SubLawContainer"
        style={{
          color: txtcol,
          background: bgcol,
          minHeight: "400px",
          paddingBottom: "50px",
        }}
      >
        {chapterList.map((e, ind) => {
          return (
            <li
              key={e.name}
              style={{ listStyleType: "none" }}
              className="outer-li"
            >
              <h4
                className="chapter-name"
                style={{
                  color: txtcol,
                  background: bgcol,
                }}
              >
                Chapter {"  "}
                {e.name
                  .split(" ")
                  .map((word, index) =>
                    index === 0
                      ? word.toUpperCase()
                      : word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              </h4>
              <ul className="Sections-names">
                {e.sections.map((sec, ind2) => {
                  return (
                    <li
                      key={sec.name}
                      onClick={() => ToSubLawDetails(ind, ind2)}
                    >
                      {sec.name}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </div>
      <Footer />
    </div>
  );

  return <>{chapterList.length != 0 ? <>{MainCon}</> : <Loader />}</>;
}
