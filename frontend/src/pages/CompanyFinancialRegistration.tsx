import React, { useState, useRef, useEffect } from 'react';
import '../styles/companyFinancialRegistration.css'; // Import your CSS file

interface AdditionalDetailsPageProps {
  // Add any props your component might receive here
}

const CompanyFinancialDetailsPage: React.FC<AdditionalDetailsPageProps> = () => {
  const [gstin, setGstin] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Odisha');
  const [pinCode, setPinCode] = useState(['', '', '', '', '', '']);
  const pinInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [errors, setErrors] = useState<{ gstin?: string; address1?: string; pinCode?: string }>({});

  useEffect(() => {
    pinInputRefs.current = pinInputRefs.current.slice(0, 6);
  }, []);

  const handlePinCodeChange = (index: number, value: string) => {
    const newPinCode = [...pinCode];
    const sanitizedValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
    newPinCode[index] = sanitizedValue;

    setPinCode(newPinCode);

    if (sanitizedValue && index < 5) {
      const nextInput = pinInputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleBackspace = (index: number) => {
    const newPinCode = [...pinCode];
    if (!newPinCode[index] && index > 0) {
      const prevInput = pinInputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
      newPinCode[index - 1] = '';
    }
    setPinCode(newPinCode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredPinCode = pinCode.join('');

    const newErrors: { gstin?: string; address1?: string; pinCode?: string } = {};

    if (!gstin.trim()) {
      newErrors.gstin = "GSTIN is required";
    }

    if (!address1.trim()) {
      newErrors.address1 = "Address Line 1 is required";
    }

    if (enteredPinCode.length !== 6) {
      newErrors.pinCode = "PIN Code must be 6 digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('GSTIN:', gstin);
      console.log('Address 1:', address1);
      console.log('Address 2:', address2);
      console.log('Country:', country);
      console.log('State:', state);
      console.log('PIN Code:', enteredPinCode);
      // Handle form submission here (e.g., API call)
    }
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const countries = [
    "India", "United States", "China", "Japan", "Germany", "United Kingdom",
    "France", "Canada", "Brazil", "Australia", "Russia", "South Korea",
    "Italy", "Spain", "Mexico", "Indonesia", "Netherlands", "Saudi Arabia",
    "Switzerland", "Sweden", "Belgium", "Austria", "Norway", "Denmark",
    "Finland", "Ireland", "Portugal", "Poland", "Greece", "Romania", "Hungary",
    "Czech Republic", "Slovakia", "Bulgaria", "Croatia", "Serbia", "Albania",
    "North Macedonia", "Bosnia and Herzegovina", "Montenegro", "Kosovo",
    "Iceland", "Luxembourg", "Malta", "Liechtenstein", "Monaco", "San Marino",
    "Vatican City", // ... Add more countries as needed
  ];

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Thanks for registering</h1>
        <p>We need few more details for further process</p>
        <p>You are just few steps away!</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="gstin">GSTIN NO</label>
            <input
              type="text"
              id="gstin"
              placeholder="Ex: 1234567890"
              value={gstin}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGstin(e.target.value)}
              required
            />
            {errors.gstin && <p className="error-message">{errors.gstin}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="address1">Address Line 1</label>
            <input
              type="text"
              id="address1"
              placeholder="As per your company address"
              value={address1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress1(e.target.value)}
              required
            />
            {errors.address1 && <p className="error-message">{errors.address1}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="address2">Address Line 2</label>
            <input
              type="text"
              id="address2"
              placeholder="As per your company address"
              value={address2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress2(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Select your Country & State</label>
            <div className="country-state-wrapper">
              <select value={country} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCountry(e.target.value)}>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <select value={state} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(e.target.value)}>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>PIN Code</label>
            <div className="pincode-wrapper">
              {pinCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`pin-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePinCodeChange(index, e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Backspace') handleBackspace(index) }}
                  className="pin-input"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={el => pinInputRefs.current[index] = el}
                  required
                />
              ))}
            </div>
            {errors.pinCode && <p className="error-message">{errors.pinCode}</p>}
          </div>

          <div className="button-group">
            <button type="button" className="back-btn">Back</button>
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyFinancialDetailsPage;