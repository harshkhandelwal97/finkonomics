import { useState } from 'react';
import '../styles/companyRegistration.css'; // Import CSS file for styling
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Material UI icons

const CompanyRegistrationPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    console.log('Legal Name of your brand:', brandName);
    console.log('Email Address:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Finkonomics</h1>
        <p>You are just few steps away!</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Legal Name of your brand</label>
            <input
              type="text"
              placeholder="Ex: Amazon pvt ltd"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Ex: office@amazon.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Create Password</label>
            <div className="password-wrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Ex: office@amazon.in"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {passwordVisible ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                placeholder="Ex: office@amazon.in"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="password-toggle"
              >
                {confirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn">Next</button>
        </form>

        <div className="support-login"> {/* New div for alignment */}
          <a href="/support" className="support-link">Support</a>
          <a href="/login" className="login-link">Have an account? <span>Login</span></a>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationPage;