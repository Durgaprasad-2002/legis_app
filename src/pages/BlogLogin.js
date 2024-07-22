import React from "react";
import "./index.css";
import logo from "../Images/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

export default function BlogLogin() {
  const PageRoute = () => {
    window.location.pathname = "/BlogUpload/1";
  };
  const [visOtp, setvisOtp] = useState(() => {
    const storedValue = localStorage.getItem("visOtp");
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  const [otp, setotp] = useState(() => {
    const storedValue = localStorage.getItem("otp");
    return storedValue !== null ? JSON.parse(storedValue) : 0;
  });

  useEffect(() => {
    localStorage.setItem("visOtp", JSON.stringify(visOtp));
  }, [visOtp]);

  useEffect(() => {
    localStorage.setItem("otp", JSON.stringify(otp));
  }, [otp]);

  // ----------------Counter ------------------------------------------

  const [counter, setCounter] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on component mount

  // Format seconds into minutes and seconds
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  useEffect(() => {
    if (counter <= 0) {
      setvisOtp(false);
      localStorage.setItem("visOtp", JSON.stringify(visOtp));
      setotp(null);
    }
  }, [counter]);

  // ----------------------------------------------------------------------------------

  function VerifyInput() {
    var input = document.getElementsByClassName("verifyInput")[0].value;
    if (input === otp) {
      localStorage.setItem("login", true);
    } else {
      alert("OTP doesn't matched");
    }
  }

  function isValidFormat() {
    let input = document.getElementsByClassName("verifyInput")[0].value.trim();
    if (input === otp) {
      // alert("Blog Page");
      setvisOtp(false);
      localStorage.setItem("visOtp", JSON.stringify(visOtp));
      localStorage.setItem("login", true);
      PageRoute();
    }
    const isNumeric = /^[0-9]+$/.test(input);
    const isValidLength = input.length <= 4;
    if (!(isNumeric && isValidLength)) alert("Enter Valid Input Format");
  }

  function GenerateOTP() {
    axios
      .get("https://legis-code.onrender.com/generateOTP")
      .then((response) => {
        setotp(response.data.data);
        setvisOtp(true);
        localStorage.setItem("visOtp", JSON.stringify(visOtp));
        setCounter(300);
        alert("OTP sent to registered mail");
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Some Error in Generating OTP, Please try again.");
      });
  }

  return (
    <>
      <div className="outer-login-page">
        <div className="login-card">
          <div className="aligner">
            {" "}
            <img src={logo} className="login-logo" />
            {/* <h4 className="login-text-head">Login</h4> */}
          </div>
          <br />
          <p className="text-color">
            Enter the OTP sent to registered mail for Login.
          </p>

          {visOtp == true ? (
            <>
              <div>
                <input
                  className="verifyInput"
                  type="phone"
                  autoComplete="false"
                  onInputCapture={isValidFormat}
                />
                <p className="text-color">
                  OTP Expires in{" "}
                  {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
                </p>
                {counter === 0 && <p>Timer expired!</p>}

                <button className="otp-sent-btn" onClick={VerifyInput}>
                  Verify
                </button>
              </div>
            </>
          ) : (
            <>
              {" "}
              <br />
              <button className="otp-sent-btn" onClick={GenerateOTP}>
                Send OTP
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
