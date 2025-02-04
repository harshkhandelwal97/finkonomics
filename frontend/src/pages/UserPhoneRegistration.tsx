import React, { useState, useEffect } from 'react';
// import "../styles/otp.css"; // Import the CSS file
import "../styles/UserPhoneRegistration.css";
import { registerPhoneNo } from '../service/authService';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo1 from  "../assets/logo1.svg";
const PhoneNumberScreen: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60); // Timer starts at 60 seconds
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [searchParams] = useSearchParams();
  const seedId = searchParams.get("seedId") || "";

  const navigate = useNavigate();
  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendDisabled(false); // Enable the Resend OTP button when timer reaches 0
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleResendOTP = () => {
    setTimeLeft(60); // Reset timer to 60 seconds
    setIsResendDisabled(true); // Disable the Resend OTP button again
    // Add logic to resend OTP
  };

  
 
  const handleVerify = async() => {
    try {
      const res = await registerPhoneNo(seedId, mobileNumber)
      navigate(res.redirectTo);
    } catch (error) {
      console.log(error);
      
    }
    // Add logic to verify phone number or send OTP
  };

  return (
    <>
      <div className="bg">
        <div className="form-container">
          <div className="form-box">
          <div className="logo1">
        <img src = {logo1} alt = '_logo1'/>
      </div>
          <h3>You are just one step away</h3>
            <form>
            <div className="mobile-input-group">
            {/* <label>Mobile Number</label> */}
            <div className="mobile-wrapper">
              <select
                className="country-code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+1">+1 (USA)</option>
                <option value="+91">+91 (India)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japan)</option>
              </select>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
          </div>
              <div className="bottom-section">
                <div className="timer">
                  {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
                </div>
                <button
                  onClick={handleResendOTP}
                  disabled={isResendDisabled}
                  className="resend-button"
                >
                  Resend OTP
                </button>
              </div>
              <div className="form-buttons">
                <button type="button" className="form-button back-button">
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleVerify}
                  className="form-button next-button"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneNumberScreen;