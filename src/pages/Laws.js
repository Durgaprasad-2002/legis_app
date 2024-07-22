import React from "react";
import NavbarLaw from "./Navbar";
import "./index.css";
import { BsSearch, BsArrowRight } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../Slices/Modes/Mode";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Loader from "./Loader";

export default function Laws() {
  //--------------------to navigate Home------------------------------------
  let location = useLocation();

  useEffect(() => {
    if (location?.state == "Main") {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, [location]);

  let [LawName, setLawName] = useState("");

  let navigate = useNavigate();
  const MoreInfoComponent = (text) => {
    navigate(`/${text}?law=${LawName}`, { state: "sub" });
  };

  //---------------To change search bar Colors----------------------------------------------------
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  let [col, setcol] = useState("#cccccc");
  let [cldis, setcldis] = useState("hidden");
  const change = () => {
    setcol("#4296f4");
    setcldis("visible");
  };
  const notchange = () => {
    setcol("#cccccc");
    if (document.getElementById("search").value == "") setcldis("hidden");
  };

  //---------------To switch b/w  Dark and Light Mode -------------------------------------------

  let [mode, setmode] = useState(true);
  let [bgcol, setbgcol] = useState("white");
  let [txtcol, settxtcol] = useState("#1a1a1a");
  let [typ, settype] = useState("none");

  const changeBG = () => {
    if (count == true) {
      setbgcol("#1a1a1a");
      settxtcol("white");
      setmode(false);
    } else {
      setbgcol("white");
      settxtcol("#1a1a1a");
      setmode(true);
    }
  };

  useEffect(() => {
    changeBG();
  }, [count]);

  const handleToggle = () => {
    dispatch(changeMode());
  };

  //-----------Method for redirecting to sections----------------------------------

  const ToSubLaw = (val, ind) => {
    // alert(ind);
    navigate(`/LawSection?law=${ind}`);
  };

  const [lawsList, setlawsList] = useState([]);

  const GetLaws = () => {
    axios
      .get(`https://legis-code.onrender.com/lawNames`)
      .then((e) => {
        console.log(e.data);
        setlawsList(e.data);
      })
      .catch((e) => {
        console.log(e);
        alert("Got Error While Getting Try Again..!");
      });
  };

  useEffect(() => {
    GetLaws();
  }, []);

  //---------------------Dom Elements-----------------------------------------------

  let mainCon = (
    <div style={{ background: bgcol }}>
      <NavbarLaw mode={mode} />{" "}
      <div className="sub-title">
        <p className="path-container">
          <span className="path" onClick={() => MoreInfoComponent("")}>
            Home
          </span>{" "}
          /
        </p>
        <h1>Laws</h1>
      </div>
      <section className="search-container" style={{ background: bgcol }}>
        <div className="search-outer" style={{ borderColor: col }}>
          <BsSearch id="iconSearch" style={{ color: col }} />
          <input
            typeof="search"
            onKeyUp={FilterLaws}
            placeholder="search Law"
            className="search"
            id="search"
            onFocus={change}
            onBlur={notchange}
            style={{ background: bgcol, color: txtcol }}
          />
          <AiOutlineClose
            onClick={() => Remove()}
            className="close"
            style={{ visibility: cldis, background: bgcol, color: txtcol }}
          />
        </div>
        <div>
          <div className="toggler" onClick={handleToggle}>
            <div
              className="togglediv"
              style={{
                transition: "all 0.5s ease",
                float: `${mode == true ? "left" : "right"}`,
              }}
            ></div>
          </div>
        </div>
      </section>
      <section
        className="Law-columns"
        style={{ background: bgcol, minHeight: "500px" }}
      >
        <ul className="ul-container" style={{ listStyleType: "number" }}>
          {lawsList.map((ele, ind) => {
            return (
              <h3
                className="Law-col-item"
                style={{ color: txtcol }}
                key={ele}
                onClick={() => ToSubLaw(ele, ind)}
              >
                <li>{ele}</li>
              </h3>
            );
          })}
        </ul>
        <div style={{ display: typ }} className="not-found">
          <h4>Oops!</h4>
          <h6 style={{ color: txtcol }}>
            We can't seem to find the <b>Law</b> <br />
            you're looking for
          </h6>
        </div>
      </section>
      <Footer />
    </div>
  );

  //-------------------To remove typed text in search field --------------------------

  function Remove() {
    document.getElementById("search").value = "";
    FilterLaws();
    notchange();
  }

  //--------------------Filtering the Laws from search Input -------------------

  function FilterLaws() {
    let input = document.getElementById("search");
    let filter = input.value.toUpperCase();
    let container = document.getElementsByTagName("ul")[0];
    let eachval = container.getElementsByClassName("Law-col-item");
    let count = 0;

    for (var i = 0; i < eachval.length; i++) {
      let a = container.getElementsByClassName("Law-col-item")[i];

      let txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        eachval[i].style.display = "block";
      } else {
        eachval[i].style.display = "none";
      }
      if (eachval[i].style.display === "block") {
        count++;
      }
    }

    if (count == 0) {
      setcol("red");
      settype("block");
    } else {
      setcol("#4296f4");
      settype("none");
    }
  }

  return <>{lawsList.length != 0 ? <>{mainCon}</> : <Loader />}</>;
}
