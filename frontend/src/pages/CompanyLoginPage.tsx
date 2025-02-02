import { useState } from 'react';
import '../styles/login.css'; // Import CSS file for styling

const CompanyLoginPage = () => {
  const [sellerId, setSellerId] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default country code

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Seller ID:', sellerId);
    console.log('Password:', password);
    console.log('Mobile Number:', `${countryCode} ${mobileNumber}`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Finkonomics</h1>
        <p>You are just one step away!</p>

        <div className="mobile-input-group">
            {/* <label>Mobile Number</label> */}
            <div className="mobile-wrapper">
              <select
                className="country-code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
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

        <div className="separator">
          <hr />
          <span>Or</span>
          <hr />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Seller ID</label>
            <input
              type="email"
              placeholder="Seller ID"
              value={sellerId}
              onChange={(e) => setSellerId(e.target.value)}
              required
            />
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
          </div>
{/* 
          <div className="mobile-input-group">
            <label>Mobile Number</label>
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
          </div> */}

          <button type="submit" className="login-btn">Login</button>
        </form>

        <a href="/forgot_password" className="forgot-password">Forgot your Password?</a>

        <p className="register-link">
          New to Finkonomics? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default CompanyLoginPage;
