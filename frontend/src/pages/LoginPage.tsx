import { useState } from "react";
import "../styles/login.css"; // Import CSS file for styling
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { loginService } from "../service/authService";

const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default country code
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [loginMethod, setLoginMethod] = useState<"email" | "mobile">("email"); // Track login method

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "", mobileNumber: "" });

    let isValid = true;

    if (loginMethod === "email") {
      // Validate email
      if (!email.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
        isValid = false;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email format",
        }));
        isValid = false;
      }

      // Validate password
      if (!password.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required",
        }));
        isValid = false;
      }
    } else if (loginMethod === "mobile") {
      // Validate mobile number
      if (!mobileNumber.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobileNumber: "Mobile number is required",
        }));
        isValid = false;
      } else if (!/^\d{10}$/.test(mobileNumber)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobileNumber: "Mobile number must be 10 digits",
        }));
        isValid = false;
      }
    }

    if (isValid) {
      if (loginMethod === "email") {
        console.log("Email:", email);
        console.log("Password:", password);
      } else {
        console.log("Mobile Number:", `${countryCode} ${mobileNumber}`);
      }
      // Proceed with form submission (e.g., API call) here
    }

    try {
      const res = await loginService(email, password, mobileNumber);
      localStorage.setItem('token', res.token)
      localStorage.setItem('name', res.name)
      localStorage.setItem('id', res.id)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="_logo" />
        </div>
        <h1>Welcome to Finkonomics</h1>
        <p>You are just one step away!</p>


        <div className="login-method-toggle">
          <div className="btn">
            <button
              type="button"
              className={`toggle-btn ${loginMethod === "email" ? "active" : ""}`}
              onClick={() => setLoginMethod("email")}
            >
              Login with Email
            </button>
          </div>

          <div className="btn">
            <button
              type="button"
              className={`toggle-btn ${loginMethod === "mobile" ? "active" : ""}`}
              onClick={() => setLoginMethod("mobile")}
            >
              Login with Mobile
            </button>
          </div>
        </div>

        {loginMethod === "mobile" && (
          <div className="input-group-mobile">
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
            </div>

            <div className="mobile-number">
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
            {errors.mobileNumber && (
              <p className="error-message">{errors.mobileNumber}</p>
            )}
          </div>
        )}

        {loginMethod === "email" && (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        )}

        {loginMethod === "mobile" && (
          <button type="submit" className="login-btn" onClick={handleSubmit}>
            Login
          </button>
        )}

        <Link to={"/forgot_password"} className="forgot-password">
          Forgot your Password?
        </Link>

        <p className="register-link">
          New to Finkonomics? <Link to={"/user/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLoginPage;
