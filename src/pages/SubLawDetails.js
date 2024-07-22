import React, { useEffect } from "react";
import NavbarLaw from "./Navbar";
import Footer from "./Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../Slices/Modes/Mode";
import axios from "axios";
import Loader from "./Loader";

export default function SubLawDetails() {
  let [lawname, setlawName] = useState("");
  let [sectionName, setsectionName] = useState("");
  let [details, setdetails] = useState([]);
  //--------------------switch b/w dark and light theme------------------------

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  let [mode, setmode] = useState(true);
  let [bgcol, setbgcol] = useState("white");
  let [txtcol, settxtcol] = useState("#1a1a1a");

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

  //-----------------------------------Navigating to the previous components--------------------------

  let navigate = useNavigate();
  let location = useLocation();

  const MoreInfoComponent = (text) => {
    navigate(`/${text}`, { state: "sub" });
  };

  let [lawIndex, setLawindex] = useState("");

  const tochapter = (text) => {
    // alert();

    navigate(`/LawSection?law=${lawIndex}`);
  };

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  const GetDetails = (d1, d2, d3) => {
    axios
      .get(
        `https://legis-code.onrender.com/LawDetails/?law=${d1}&chapter=${d2}&section=${d3}`
      )
      .then((e) => {
        console.log(e.data);
        setlawName(e.data.name);
        setsectionName(e.data.Data.name);
        setdetails(e.data.Data.details);
      })
      .catch((err) => {
        console.log(err);
        alert("Got Error While Getting Try Again..!");
      });
  };

  useEffect(() => {
    let arr = window.location.href.split("?")[1].split("&");
    let lawIndex = arr[0].slice(4);
    setLawindex(lawIndex);
    let chapter = arr[1].slice(8);
    let section = arr[2].slice(8);
    // setlawName(law);
    console.log(lawIndex + " , " + chapter + " ," + section);
    GetDetails(lawIndex, chapter, section);
  }, []);

  let MainCon = (
    <>
      <NavbarLaw />
      <div className="sub-title">
        <p className="path-container">
          <span className="path" onClick={() => MoreInfoComponent("")}>
            Home
          </span>{" "}
          /{" "}
          <span className="path" onClick={() => MoreInfoComponent("law")}>
            Laws
          </span>{" "}
          /{" "}
          <span className="path" onClick={() => tochapter("LawSection")}>
            Chapters
          </span>{" "}
          /
        </p>
        <h1>{lawname}</h1>
      </div>

      <div
        className="SubLawDetails"
        style={{
          minHeight: "80vh",
          background: bgcol,
          color: txtcol,
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
          {sectionName}:{/* Section NAme */}
          <div
            className="toggler"
            onClick={handleToggle}
            style={{ marginRight: "0px", minWidth: "50px" }}
          >
            <div
              className="togglediv"
              style={{
                transition: "all 0.5s ease",
                float: `${mode == true ? "left" : "right"}`,
              }}
            ></div>
          </div>
        </h3>
        <br />

        <ul style={{ color: txtcol }}>
          {details.map((con) => {
            return (
              <>
                {typeof con == "string" ? (
                  <li key={con} style={{ marginBottom: "15px" }}>
                    {con}
                  </li>
                ) : (
                  <li key={con}>
                    {con.name}
                    <ul id="innerlist" style={{ color: txtcol }}>
                      {con.details.map((d) => {
                        return (
                          <>
                            {typeof d == "string" ? (
                              <li key={d}>{d}</li>
                            ) : (
                              <li key={d}>
                                {d.name}
                                <ul id="innerlist" style={{ color: txtcol }}>
                                  {d.details.map((dn) => {
                                    return <li>{dn}</li>;
                                  })}
                                </ul>
                              </li>
                            )}
                          </>
                        );
                      })}
                    </ul>
                    <br />
                  </li>
                )}
              </>
            );
          })}
        </ul>
      </div>
      <Footer />
    </>
  );

  return <>{details.length != 0 ? <>{MainCon}</> : <Loader />}</>;
}
