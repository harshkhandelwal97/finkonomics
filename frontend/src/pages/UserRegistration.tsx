import { useState } from "react";
import "../styles/user_registration.css";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import Material UI icons

const URegistrationForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <div className="bg">
        <h3>You are just a few steps away!</h3>
        <div className="form-container">
          <div className="form-box">
            <h2 className="form-title"></h2>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Mail id"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Choose a Password</label>
                <div className="form-password">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle"
                  >
                    {passwordVisible ? <Visibility />:<VisibilityOff />} {/* Material UI icons */}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="form-password">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="password-toggle"
                  >
                    {confirmPasswordVisible ? <Visibility />:<VisibilityOff />} {/* Material UI icons */}
                  </button>
                </div>
              </div>
              <div className="form-buttons">
                <button type="button" className="form-button back-button">
                  Back
                </button>
                <button type="submit" className="form-button next-button">
                  Next
                </button>
              </div>
              <p className="form-footer">
                By clicking on Register, you agree to our{" "}
                <a href="#" className="form-link">
                  Terms and Conditions
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default URegistrationForm;