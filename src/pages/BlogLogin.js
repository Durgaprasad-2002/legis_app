import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
import logo from "../Images/logo.png";
import axios from "axios";

export default function BlogLogin() {
  const [visOtp, setVisOtp] = useState(() => {
    return JSON.parse(localStorage.getItem("visOtp")) || false;
  });

  const [otp, setOtp] = useState(() => {
    return JSON.parse(localStorage.getItem("otp")) || 0;
  });

  const [counter, setCounter] = useState(300); // 300 seconds = 5 minutes
  const [error, setError] = useState("");

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  useEffect(() => {
    localStorage.setItem("visOtp", JSON.stringify(visOtp));
  }, [visOtp]);

  useEffect(() => {
    localStorage.setItem("otp", JSON.stringify(otp));
  }, [otp]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (counter <= 0) {
      setVisOtp(false);
      localStorage.setItem("visOtp", JSON.stringify(false));
      setOtp(0);
    }
  }, [counter]);

  const navigateToBlogUpload = () => {
    window.location.pathname = "/BlogUpload/1";
  };

  const verifyInput = () => {
    const input = document.querySelector(".verifyInput").value;
    if (input === String(otp)) {
      localStorage.setItem("login", true);
      navigateToBlogUpload();
    } else {
      alert("OTP doesn't match");
    }
  };

  const isValidFormat = () => {
    const input = document.querySelector(".verifyInput").value.trim();
    const isNumeric = /^[0-9]+$/.test(input);
    const isValidLength = input.length <= 4;

    if (input === String(otp)) {
      setVisOtp(false);
      localStorage.setItem("visOtp", JSON.stringify(false));
      localStorage.setItem("login", true);
      navigateToBlogUpload();
    } else if (!(isNumeric && isValidLength)) {
      alert("Enter a valid input format");
    }
  };

  const generateOTP = async () => {
    try {
      const response = await axios.get(
        "https://legis-code.onrender.com/generateOTP"
      );
      setOtp(response.data.data);
      setVisOtp(true);
      setCounter(300);
      alert("OTP sent to registered mail");
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating OTP, please try again.");
      setError("Error generating OTP, please try again.");
    }
  };

  return (
    <div className="outer-login-page">
      <div className="login-card">
        <div className="aligner">
          <img src={logo} className="login-logo" alt="Logo" />
        </div>
        <br />
        <p className="text-color">
          Enter the OTP sent to registered mail for login.
        </p>

        {visOtp ? (
          <>
            <div>
              <input
                className="verifyInput"
                type="tel"
                autoComplete="off"
                onInput={isValidFormat}
              />
              <p className="text-color">
                OTP Expires in{" "}
                {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
              </p>
              {counter === 0 && <p>Timer expired!</p>}

              <button className="otp-sent-btn" onClick={verifyInput}>
                Verify
              </button>
            </div>
          </>
        ) : (
          <>
            <br />
            <button className="otp-sent-btn" onClick={generateOTP}>
              Send OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
