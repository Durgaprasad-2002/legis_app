import React, { lazy, useState } from "react";
import "./index.css";
// import NavbarLaw from "./Navbar";
// import RoundAni from "./RoundAni";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.css";
import { GoLaw } from "react-icons/go";
import { BsCardText } from "react-icons/bs";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { FaHands } from "react-icons/fa";
import About from "../Images/about.jpg";
import ConatctForm from "./ConatctForm";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
// import CardSlide from "./CardSlide";
// import MarqueeAnimi from "./MarqueeAnimi";
// import Carousel from "./Carousel";

const NavbarLaw = lazy(() => import("./Navbar"));
const CardSlide = lazy(() => import("./CardSlide"));
const MarqueeAnimi = lazy(() => import("./MarqueeAnimi"));
const Carousel = lazy(() => import("./Carousel"));

export default function Home() {
  //---------------------------Counter value Filler -----------------------------------------------------

  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);
  const maxValue1 = 79;
  const maxValue2 = 256;
  const maxValue3 = 324;

  const incrementCounters = () => {
    if (counter1 < maxValue1) {
      setCounter1((prevCounter) => prevCounter + 1);
    }
    if (counter2 < maxValue2) {
      setCounter2((prevCounter) => prevCounter + 1);
    }
    if (counter3 < maxValue3) {
      setCounter3((prevCounter) => prevCounter + 1);
    }
  };

  setTimeout(incrementCounters, 20);

  //----------------------------Home Varibale-------------------------------------

  let maincon = (
    <div>
      <div id="#" className="main-bg">
        <NavbarLaw />
        <section className="title-main">
          <ul className="wrapper">
            <Link
              to={`/law`}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <Button className="icon facebook">
                <span className="tooltip">
                  <GoLaw />
                </span>
                <span>Laws</span>
              </Button>
            </Link>
            <Link
              to="/blog/1"
              style={{ textDecoration: "none" }}
              activeClassName="active"
            >
              <button className="icon twitter">
                <span className="tooltip">
                  <BsCardText />
                </span>
                <span>Blogs</span>
              </button>
            </Link>

            <button className="icon instagram">
              <span className="tooltip" id="t1" style={{ height: "43px" }}>
                <GoLaw
                  style={{
                    fontSize: "17px",
                    marginLeft: "4.2px",
                    marginTop: "-13px",
                  }}
                />
                <br />
                <FaHands style={{ marginTop: "-65px" }} />
              </span>
              <span>Legal Assistance</span>
            </button>
          </ul>
          <br />
          <br />
        </section>
      </div>
      <MarqueeAnimi />
      <BiSolidQuoteLeft className="quote-icon" />
      <>
        <div className="quote-text">
          <span className="h3">
            Promote and protect the independence of lawyers
            <div className="underline"></div>
          </span>
          <p className="quote">
            <br />
            <span className="spacer"></span>
            Lawyers for Lawyers promotes and preserves the independence of the
            legal profession worldwide and defends the professional rights of
            lawyers to provide legal services safely and independently, without
            fear of reprisal. We safeguard the lawyers’ role in protecting the
            rule of law and human rights and ensuring effective justice for all
            by acting wherever lawyers are under threat. In doing so, we refer
            to internationally recognized human rights laws and standards,
            including the UN Basic Principles on the Role of Lawyers.
            <br />
            <br />
            <span className="mission">
              <div className="bar"></div>
              <strong>mission</strong>
            </span>
          </p>
        </div>
        {/* <BiSolidQuoteRight className="quote-icon1" /> */}
      </>

      <br />
      <br />
      <br />
      <br />
      <section className="container-fluid card-blog-outer">
        <div className="row">
          <div className="col-md-8 vision-p">
            <h2>
              Vision
              <h6 className="underline"></h6>
            </h2>
            <p>
              We strive for a world where lawyers can practice law freely and
              independently to effectively fulfil their role in upholding the
              rule of law and the protection of human rights. Lawyers should be
              able to do their job without improper interference or fear of
              reprisal. Always and everywhere. Also, when that does not suit the
              government, the bar association, or the establishment.
            </p>
          </div>
          <div className="col-md-4 More_img">
            <CardSlide />
          </div>
        </div>{" "}
      </section>

      <br />

      <div>
        <div className="Counters" id="element">
          <div className="counter-title">
            <h2>
              Our
              <br />
              Acheivements
            </h2>
          </div>
          <div className="counter">
            <div className="count-value">
              {counter1}
              <sup>+</sup>
            </div>
            <div className="count-row">
              <div className="count-d2">
                <h4>People Visited</h4>
              </div>
            </div>
          </div>
          <div className="counter">
            <div className="count-value">
              {counter2}
              <sup>+</sup>
            </div>
            <div className="count-row">
              <div className="count-d2">
                {" "}
                <h4>Number of Laws Refered</h4>
              </div>
            </div>
          </div>
          <div className="counter">
            <div className="count-value">
              {counter3}
              <sup>+</sup>
            </div>
            <div className="count-row">
              <div className="count-d2">
                <h4>Legal Assistance Provided</h4>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div style={{ textAlign: "center" }}>
          <h3 className="contact-bf">
            Our Works <br />
          </h3>
        </div>
        <br />

        <Carousel />

        <div style={{ textAlign: "center" }} id="about">
          <h3 className="contact-bf">
            About <span style={{ fontWeight: "400" }}>us</span>
          </h3>
        </div>

        <br />
        <br />
        <div className="container">
          <div className="row about-container">
            <div className="col-md-4">
              <div className="about-img-outer">
                <img loading="lazy" className="about-img" src={About} />
              </div>
            </div>
            <div className="col-md-8">
              <p className="about-para">
                <br />
                An About Us page is a section on a website that provides
                information about a company, organization, or individual. It's
                an opportunity to tell your brand's story, share your vision,
                history, values, and achievements, and introduce team members.
                <br />
                <br />
                It's an opportunity to tell your brand's story, share your
                vision, history, values, and achievements, and introduce team
                members.It's an opportunity to tell your brand's story, share
                your vision, history, values, and achievements, and introduce
                team members.
                <br />
                <br />
                <button id="bt1">About</button>
                <br />
              </p>
            </div>
          </div>
        </div>
        <br id="contact" />
        {/* <h3 className="contact-bf">
          Want to Resolve <br /> A Case
        </h3> */}

        <br />
        {/* <RoundAni loading="lazy" /> */}
        <br />
        <br />

        <br />

        <ConatctForm />
        <br />
      </div>
      <Footer />

      {/* ----------------------------------------------Modal Card-------------------------------------------- */}
    </div>
  );

  return maincon;
}
