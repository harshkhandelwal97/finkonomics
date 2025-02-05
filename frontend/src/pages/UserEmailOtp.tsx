/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef } from "react";
import "../styles/UserPhoneRegistration.css";
import { verifyEmail } from "../service/authService"; // Make sure the path is correct
import { useSearchParams, useNavigate } from "react-router-dom"; // Import useNavigate
import logo1 from "../assets/logo1.svg";
import PageLoader from "@/components/PageLoader";
const UserOtpScreen = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>();
  const [searchParams] = useSearchParams();
  const seedId = searchParams.get("seedId") || "";
  const navigate = useNavigate(); // Initialize useNavigate



  useEffect(() => {
    // Define timerId with type

    if (timeLeft === 0) {
      setIsResendDisabled(false);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleResendOTP = () => {
    setTimeLeft(60);
    setIsResendDisabled(true);
    // Add logic to resend OTP (e.g., call an API)
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    try {
      setLoading(true)
      const res = await verifyEmail(seedId, fullOtp);
      navigate(res.redirectTo); // Use navigate for redirection
    } catch (error: any) { //Unexpected any. Specify a different type
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message);
      } else if (error.message) {
        setApiError(error.message);
      } else {
        setApiError("An error occurred during verification.");
      }
    } finally {
      setLoading(false)
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Optional chaining to prevent errors
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Optional chaining
    }
  };

  return (
    <div className="bg">
      {loading && <PageLoader />}
      <div className="form-container">
        <div className="form-box">
          <div className="logo1">
            <img src={logo1} alt='_logo1' />
          </div>
          <h3>Check your Email for the OTP</h3>
          <form>
            <h4>Check your given email ID</h4>
            <div className="otp-boxes">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
                  className="otp-input"
                />
              ))}
            </div>
            <div className="bottom-section">
              <div className="timer">
                {Math.floor(timeLeft / 60)}:
                {("0" + (timeLeft % 60)).slice(-2)}
              </div>
              <button onClick={handleResendOTP} disabled={isResendDisabled} className="resend-button">
                Resend OTP
              </button>
            </div>
            {apiError && <p className="error-message api-error">{apiError}</p>}
            <div className="form-buttons">
              <button type="button" className="form-button back-button">
                Back
              </button>
              <button type="button" onClick={handleVerify} className="form-button next-button">
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserOtpScreen;