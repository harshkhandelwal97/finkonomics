import { useState } from 'react';
import '../styles/login.css'; // Import your CSS file for styling
// import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e :React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Finkonomics</h1>
        <p>You are just one step away!</p>

        <button className="google-login-btn">
        <img src='/images/googleLogo.svg' alt="Google Logo" className="google-logo" /> 
          Login with Google
        </button>

        <div className="separator">
          <hr />
          <span>Or</span>
          <hr />
        </div>

        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
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

export default LoginPage;