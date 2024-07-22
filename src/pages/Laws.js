import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NavbarLaw from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import { changeMode } from "../Slices/Modes/Mode";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import "./index.css";

export default function Laws() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.counter.value);

  const [mode, setMode] = useState(true);
  const [lawName, setLawName] = useState("");
  const [lawsList, setLawsList] = useState([]);
  const [searchColor, setSearchColor] = useState("#cccccc");
  const [closeButtonVisibility, setCloseButtonVisibility] = useState("hidden");
  const [bgColor, setBgColor] = useState("white");
  const [textColor, setTextColor] = useState("#1a1a1a");
  const [notFoundVisibility, setNotFoundVisibility] = useState("none");

  useEffect(() => {
    if (location?.state === "Main") {
      window.scrollTo(0, 0);
    }
    fetchLaws();
    changeBG();
  }, [location, isDarkMode]);

  const fetchLaws = async () => {
    try {
      const response = await axios.get(
        `https://legis-code.onrender.com/lawNames`
      );
      setLawsList(response.data);
    } catch (error) {
      console.error(error);
      alert("Got Error While Getting Try Again..!");
    }
  };

  const changeBG = () => {
    if (isDarkMode) {
      setBgColor("#1a1a1a");
      setTextColor("white");
      setMode(false);
    } else {
      setBgColor("white");
      setTextColor("#1a1a1a");
      setMode(true);
    }
  };

  const handleSearchFocus = () => {
    setSearchColor("#4296f4");
    setCloseButtonVisibility("visible");
  };

  const handleSearchBlur = () => {
    setSearchColor("#cccccc");
    if (!lawName) setCloseButtonVisibility("hidden");
  };

  const handleToggleMode = () => {
    dispatch(changeMode());
  };

  const handleLawClick = (law, index) => {
    navigate(`/LawSection?law=${index}`);
  };

  const handleMoreInfoClick = () => {
    navigate("/", { state: "sub" });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setLawName(value);
    filterLaws(value);
  };

  const handleRemoveSearch = () => {
    setLawName("");
    filterLaws("");
    handleSearchBlur();
  };

  const filterLaws = (query) => {
    const filter = query.toUpperCase();
    const filteredLaws = lawsList.filter((law) =>
      law.toUpperCase().includes(filter)
    );
    setLawsList(filteredLaws);

    if (filteredLaws.length === 0) {
      setSearchColor("red");
      setNotFoundVisibility("block");
    } else {
      setSearchColor("#4296f4");
      setNotFoundVisibility("none");
    }
  };

  return (
    <>
      {lawsList.length !== 0 ? (
        <div style={{ background: bgColor }}>
          <NavbarLaw mode={isDarkMode} />
          <div className="sub-title">
            <p className="path-container">
              <span className="path" onClick={handleMoreInfoClick}>
                Home
              </span>
              /
            </p>
            <h1>Laws</h1>
          </div>
          <section className="search-container" style={{ background: bgColor }}>
            <div className="search-outer" style={{ borderColor: searchColor }}>
              <BsSearch id="iconSearch" style={{ color: searchColor }} />
              <input
                type="search"
                value={lawName}
                onChange={handleSearchChange}
                placeholder="search Law"
                className="search"
                id="search"
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                style={{ background: bgColor, color: textColor }}
              />
              <AiOutlineClose
                onClick={handleRemoveSearch}
                className="close"
                style={{
                  visibility: closeButtonVisibility,
                  background: bgColor,
                  color: textColor,
                }}
              />
            </div>
            <div>
              <div className="toggler" onClick={handleToggleMode}>
                <div
                  className="togglediv"
                  style={{
                    transition: "all 0.5s ease",
                    float: mode ? "left" : "right",
                  }}
                ></div>
              </div>
            </div>
          </section>
          <section
            className="Law-columns"
            style={{ background: bgColor, minHeight: "500px" }}
          >
            <ul className="ul-container" style={{ listStyleType: "number" }}>
              {lawsList.map((law, index) => (
                <h3
                  className="Law-col-item"
                  style={{ color: textColor }}
                  key={law}
                  onClick={() => handleLawClick(law, index)}
                >
                  <li>{law}</li>
                </h3>
              ))}
            </ul>
            <div style={{ display: notFoundVisibility }} className="not-found">
              <h4>Oops!</h4>
              <h6 style={{ color: textColor }}>
                We can't seem to find the <b>Law</b> <br />
                you're looking for
              </h6>
            </div>
          </section>
          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
