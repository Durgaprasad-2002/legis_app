import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.css";
import "./Navbar.css";
import "./index.css";
import { BsArrowUpShort } from "react-icons/bs";
import title from "../Images/Logo1.png";
import { useState } from "react";
import { Link } from "react-router-dom";

function NavbarLaw() {
  let [pos, changepos] = useState("none");
  let [wi, setcol] = useState(0);
  let [hei, sethei] = useState(0);

  //-------------------------------------Trigger the Upnavigation button--------------------

  window.onscroll = () => scrollFunction();

  function scrollFunction() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      changepos("block");
      sethei(5);
      setcol(10);
    } else {
      changepos("none");
      setcol(0);
      sethei(0);
    }
  }

  //----------------scrolls to Top of Page-----------------------

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className="nav-body" style={{ transition: "all 0.5s linear " }}>
      <Navbar
        key="lg"
        expand="lg"
        className="mb-3 top fixed-top"
        style={{
          transition: "all 0.5s ease",
          boxShadow: `0px 0px ${wi}px 0px black`,
          padding: ` ${hei}px 0px ${hei}px 0px`,
        }}
      >
        <Container fluid>
          <Navbar.Brand className="title">
            <div className="logo-outer">
              <div className="LogoImg">
                <Link to="/">
                  <img className="title-img" src={title}></img>
                </Link>
              </div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-lg`}
            className="close"
          >
            <div className="outer">
              <div className="inner"></div>
              <div className="inner" style={{ width: "17px" }}></div>
              <div className="inner"></div>
            </div>
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            style={{ backgroundColor: "#1c305c" }}
          >
            <Offcanvas.Header closeButton className="close">
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Legis Law
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end  flex-grow-1 pe-3">
                <Nav.Link className="nav-item" href="/#about">
                  About
                </Nav.Link>
                <Nav.Link className="nav-item" href="/#contact">
                  Contact
                </Nav.Link>
                <Nav.Link className="nav-item" href="/">
                  Internship
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <BsArrowUpShort
        onClick={topFunction}
        style={{ display: pos }}
        id="toptoggle"
      />
    </div>
  );
}

export default NavbarLaw;
