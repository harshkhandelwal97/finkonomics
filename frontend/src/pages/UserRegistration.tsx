/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, FormEvent } from 'react';
import '../styles/UserRegistration.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from  "../assets/logo.svg";
import { registerService } from '../service/authService';
// Interface for validation errors
interface Errors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const UserRegistrationPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null); // Clear previous API errors
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await registerService(fullName, email, password);
        console.log("Registration successful:", response);
        navigate(response.redirectTo); // Your redirection path
      } catch (error :any) {
        console.error("Registration failed:", error);

        if (error.response && error.response.data && error.response.data.message) {
          setApiError(error.response.data.message);
        } else if (error.message) {
          setApiError(error.message);
        } else {
          setApiError("An error occurred during registration.");
        }
      }
    }
  };

  const validateForm = (): Errors => {
    const errors: Errors = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password cannot be blank';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  return (
    <div className="register-container">
      <div className="register-box">
      <div className="logo">
        <img src = {logo} alt = '_logo'/>
      </div>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Mail id</label>
            <input
              type="email"
              id="email"
              placeholder="Ex: office@amazon.in"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Choose a Password</label>
            <div className="password-wrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Ex: ••••••••••"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {passwordVisible ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Ex: ••••••••••"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="password-toggle"
              >
                {confirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          {apiError && <p className="error-message api-error">{apiError}</p>}

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