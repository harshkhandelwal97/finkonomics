import React, { useState, useEffect, useRef } from 'react';
import "../styles/UserPhoneRegistration.css"; // Import the CSS file
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyLoginOtp, verifyPhoneNo } from '../service/authService';
import logo1 from "../assets/logo1.svg";
const OTPScreenPhone: React.FC<{ path: string }> = ({ path }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState<number>(60); // Timer starts at 60 seconds
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const inputRefs = useRef<HTMLInputElement[]>([]); // Store references to input boxes
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const seedId = searchParams.get("seedId") || "";

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendDisabled(false); // Enable the Resend OTP button
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleResendOTP = () => {
    setTimeLeft(60); // Reset timer
    setIsResendDisabled(true); // Disable Resend OTP button
    // Add logic to resend OTP
  };
  const handleVerify = async () => {
    const fullOtp = otp.join('');
    try {

      if (path === 'login') {
        const res = await verifyLoginOtp(seedId, fullOtp);

        navigate("/");

        localStorage.setItem("token", res.token)
        localStorage.setItem('name', res.name)
        localStorage.setItem('id', res.id)

      } else if (path === 'register') {
        const res = await verifyPhoneNo(seedId, fullOtp);

        navigate("/permissions");

        localStorage.setItem("token", res.token)
        localStorage.setItem('name', res.name)
        localStorage.setItem('id', res.id)
      }
    } catch (error) {
      console.log(error)
      // Add logic to verify OTP
    }
    // Add logic to verify OTP
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Ensure only digits are entered

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input box
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to the previous input box on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleBack = () => {
    history.back()
  }

  return (
    <div className="bg">
      <div className="form-container">
        <div className="form-box">
          <div className="logo1">
            <img src={logo1} alt='_logo1' />
          </div>
          <h3>Check your Phone for the OTP</h3>
          <form>
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
                {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
              </div>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResendDisabled}
                className="resend-button"
              >
                Resend OTP
              </button>
            </div>
            <div className="form-buttons">
              <button type="button" className="form-button back-button" onClick={handleBack}>
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

export default OTPScreenPhone;
