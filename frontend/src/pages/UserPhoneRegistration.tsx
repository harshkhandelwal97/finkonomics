import React, { useState, useEffect } from 'react';
// import "../styles/otp.css"; // Import the CSS file
import "../styles/UserPhoneRegistration.css";

const PhoneNumberScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // Phone number state
  const [timeLeft, setTimeLeft] = useState<number>(60); // Timer starts at 60 seconds
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    // console.log('Seller ID:', sellerId);
    // console.log('Password:', password);
    console.log('Mobile Number:', `${countryCode} ${mobileNumber}`);
  };
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
    console.log('Phone number entered:', phoneNumber);
    // Add logic to verify phone number or send OTP
  };

  return (
    <>
      <div className="bg">
        <h3>Enter your Phone Number</h3>
        <div className="form-container">
          <div className="form-box">
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