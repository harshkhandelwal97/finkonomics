import React, { useState } from 'react';
import '../styles/UserRegistration.css'
import { Visibility, VisibilityOff } from '@mui/icons-material';

const UserRegistrationPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState('');
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
    console.log('Full Name:', fullName);
    console.log('Email Address:', email);
    console.log('Password:', password);
    // Handle form submission logic here (e.g., API call)
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Finkonomics</h1>
        <p>You are just few steps away!</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Ex: John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Mail id</label>
            <input
              type="email"
              id="email"
              placeholder="Ex: office@amazon.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Choose a Password</label>
            <div className="password-wrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Ex: ••••••••••"
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Ex: ••••••••••"
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

          <div className="btn-container">
            <button className="back-btn">Back</button>
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>

        <div className="terms-conditions">
          
            By clicking on Register, you agree to our{' '}
            <a href="/terms" className="terms-link">
              Terms and Conditions
            </a>

          
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationPage;