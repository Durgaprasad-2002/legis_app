import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { hover } from "@testing-library/user-event/dist/hover";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

export default function Carousel() {
  return (
    <div className="carousel-container">
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators" id="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner" onPause={hover}>
          <div className="carousel-item active" data-bs-interval="3000">
            <img
              src="https://media.istockphoto.com/id/956243400/photo/close-up-lawyer-businessman-working-or-reading-lawbook-in-office-workplace-for-consultant.jpg?s=612x612&w=0&k=20&c=4kefBJNk1H0Y3hDUU_MmAEkqcJavLPlB6IhVB5C7UVk="
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-md-block text-white">
              <h5 className="car-heading">Civil Cases</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/11/Become_a_Lawyer.jpeg.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-md-block text-white">
              <h5 className="car-heading">Criminal Cases</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img
              src="https://media.istockphoto.com/id/1346190615/photo/court-of-justice-and-law-trial-female-public-defender-presenting-case-making-passionate.jpg?s=612x612&w=0&k=20&c=Xm6c8dyTb3dyiFZT7P6N6CT3ucm-KUdj1GXfLaKXZE4="
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-md-block text-white">
              <h5 className="car-heading">Federal Cases</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          {/* <span
            className="carousel-control-next-icon"
            aria-hidden="true"
            id="carousel-control"
          ></span> */}

          <IoIosArrowDropleft aria-hidden="true" className="swipe-icons" />
          <span className="visually-hidden">Next</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          {/* <span
            className="carousel-control-next-icon"
            aria-hidden="true"
            id="carousel-control"
          ></span> */}

          <IoIosArrowDropright aria-hidden="true" className="swipe-icons" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br />
      <br />
    </div>
  );
}

{
  /* <section className="works-container">
          <div className="work">
            <img
              className="workimg"
              src="https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhd3xlbnwwfHwwfHx8MA%3D%3D&w=600"
            />
            <h4 className="work-title">
              Crime Cases
              <br />
              <span onClick={() => ModalData()}>More Info</span>
            </h4>
          </div>
          <div className="work">
            <img
              className="workimg"
              src="https://images.unsplash.com/photo-1505664063603-28e48ca204eb?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhd3xlbnwwfHwwfHx8MA%3D%3D&w=600"
            />
            <h4 className="work-title">
              {" "}
              Accident Cases
              <br />
              <span onClick={() => ModalData()}>More Info</span>
            </h4>
          </div>
          <div className="work">
            <img
              className="workimg"
              src="https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhd3xlbnwwfHwwfHx8MA%3D%3D&w=600"
            />
            <h4 className="work-title">
              Civil Cases
              <br />
              <span onClick={() => ModalData()}>More Info</span>
            </h4>
          </div>
          <div className="work">
            <img
              className="workimg"
              src="https://images.unsplash.com/photo-1505664063603-28e48ca204eb?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhd3xlbnwwfHwwfHx8MA%3D%3D&w=600"
            />
            <h4 className="work-title">
              Family Cases
              <br />
              <span onClick={() => ModalData()}>More Info</span>
            </h4>
          </div>
          <div className="work">
            <img
              className="workimg"
              src="https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhd3xlbnwwfHwwfHx8MA%3D%3D&w=600"
            />

            <h4 className="work-title">
              Marriage Cases
              <br />
              <span onClick={() => ModalData()}>More Info</span>
            </h4>
          </div>
          <div className="work">
            <img
              className="workimg"
              src="https://images.unsplash.com/photo-1505664063603-28e48ca204eb?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhd3xlbnwwfHwwfHx8MA%3D%3D&w=600"
            />
            <h4 className="work-title">
              Federal Cases
              <br />
              <span onClick={() => ModalData()}>More Info</span>
            </h4>
          </div>
        </section> */
}
