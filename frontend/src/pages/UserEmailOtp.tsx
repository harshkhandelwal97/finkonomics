import React, { useState, useEffect, useRef } from 'react';
import "../styles/UserPhoneRegistration.css"; // Import the CSS file
const OTPScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState<number>(60); // Timer starts at 60 seconds
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const inputRefs = useRef<HTMLInputElement[]>([]); // Ref to store references to the input boxes

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

  const handleVerify = () => {
    const fullOtp = otp.join('');
    console.log('OTP entered:', fullOtp);
    // Add logic to verify OTP
  };

  const handleInputChange = (index: number, value: string) => {
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

  return (
    <>
      <div className="bg">
        <h3>Check your Email for the OTP</h3>
        <div className="form-container">
          <div className="form-box">
            {/* <h2 className="form-title">OTP Verification</h2> */}
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

export default OTPScreen;