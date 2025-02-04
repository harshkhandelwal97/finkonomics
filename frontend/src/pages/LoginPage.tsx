// import { useState } from 'react';
// import '../styles/login.css'; // Import CSS file for styling

// const UserLoginPage = () => {
//   const [email, setEmail] = useState(''); // Changed to email
//   const [password, setPassword] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [countryCode, setCountryCode] = useState('+91'); // Default country code
//   const [errors, setErrors] = useState({ email: '', password: '', mobileNumber: '' }); // Changed to email

//   const handleSubmit = (e:React.FormEvent) => {
//     e.preventDefault();

//     // Reset errors
//     setErrors({ email: '', password: '', mobileNumber: '' }); // Changed to email

//     let isValid = true;

//     if (!email.trim()) { // Changed to email
//       setErrors(prevErrors => ({ ...prevErrors, email: 'Email is required' })); // Changed to email
//       isValid = false;
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) { // Email validation regex
//       setErrors(prevErrors => ({ ...prevErrors, email: 'Invalid email format' })); // Changed to email
//       isValid = false;
//     }


//     if (!password.trim()) {
//       setErrors(prevErrors => ({ ...prevErrors, password: 'Password is required' }));
//       isValid = false;
//     }

//     if (!mobileNumber.trim()) {
//       setErrors(prevErrors => ({ ...prevErrors, mobileNumber: 'Mobile number is required' }));
//       isValid = false;
//     } else if (!/^\d{10}$/.test(mobileNumber)) {  // Basic mobile number validation (10 digits)
//       setErrors(prevErrors => ({ ...prevErrors, mobileNumber: 'Mobile number must be 10 digits' }));
//       isValid = false;
//     }


//     if (isValid) {
//       console.log('Email:', email); // Changed to email
//       console.log('Password:', password);
//       console.log('Mobile Number:', `${countryCode} ${mobileNumber}`);
//       // Proceed with form submission (e.g., API call) here
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h1>Welcome to Finkonomics</h1>
//         <p>You are just one step away!</p>

//         <div className="mobile-input-group">
//             {/* <label>Mobile Number</label> */}
//             <div className="mobile-wrapper">
//               <select
//                 className="country-code"
//                 value={countryCode}
//                 onChange={(e) => setCountryCode(e.target.value)}
//               >
//                 <option value="+1">+1 (USA)</option>
//                 <option value="+91">+91 (India)</option>
//                 <option value="+44">+44 (UK)</option>
//                 <option value="+61">+61 (Australia)</option>
//                 <option value="+81">+81 (Japan)</option>
//               </select>
//               <div className="mobile-number">
//               <input
//                 type="tel"
//                 placeholder="Mobile Number"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 required
//               />
//               </div>
            
//           </div>
//           {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
//         </div>

//         <div className="separator">
//           <hr />
//           <span>Or</span>
//           <hr />
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Email</label> {/* Changed to email */}
//             <input
//               type="email" // Keep as email type
//               placeholder="Email" // Changed to email
//               value={email} // Changed to email
//               onChange={(e) => setEmail(e.target.value)} // Changed to email
//               required
//             />
//             {errors.email && <p className="error-message">{errors.email}</p>} {/* Changed to email */}
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {errors.password && <p className="error-message">{errors.password}</p>}
//           </div>

//           <button type="submit" className="login-btn">Login</button>
//         </form>

//         <a href="/forgot_password" className="forgot-password">Forgot your Password?</a>

//         <p className="register-link">
//           New to Finkonomics? <a href="/register">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserLoginPage;
import { useState } from 'react';
import '../styles/UserRegistration.css'; // Import CSS file for styling

const UserLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default country code
  const [errors, setErrors] = useState({ email: '', password: '', mobileNumber: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: '', password: '', mobileNumber: '' });

    let isValid = true;

    // Validate email
    if (!email.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Email is required' }));
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Invalid email format' }));
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, password: 'Password is required' }));
      isValid = false;
    }

    // Validate mobile number
    if (!mobileNumber.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, mobileNumber: 'Mobile number is required' }));
      isValid = false;
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      setErrors(prevErrors => ({ ...prevErrors, mobileNumber: 'Mobile number must be 10 digits' }));
      isValid = false;
    }

    if (isValid) {
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Mobile Number:', `${countryCode} ${mobileNumber}`);
      // Proceed with form submission (e.g., API call) here
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Finkonomics</h1>
        <p>You are just one step away!</p>

        <div className="input -group">
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
            <div className="mobile-number">
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
          </div>
          {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
        </div>

        <div className="separator">
          <hr />
          <span>Or</span>
          <hr />
        </div>

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
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <a href="/forgot_password" className="forgot-password">Forgot your Password?</a>

        <p className="register-link">
          New to Finkonomics? <a href="user/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default UserLoginPage;
