import React, { useState } from 'react';
import '../styles/companyFinancialRegistration.css';

const CompanyBankDetails: React.FC = () => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Account Holder Name:', accountHolderName);
    console.log('Account Number:', accountNumber);
    console.log('Account Type:', accountType);
    console.log('Bank Branch:', bankBranch);
    console.log('IFSC Code:', ifscCode);
    // Handle form submission here (e.g., API call)
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Thanks for registering</h1>
        <p>We need few more details for further process</p>
        <p>You are just few steps away!</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="accountHolderName">Bank Account Holder Number</label>
            <input
              type="text"
              id="accountHolderName"
              placeholder="Ex: 1234567890"
              value={accountHolderName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountHolderName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="accountNumber">Bank Account Number</label>
            <input
              type="text"
              id="accountNumber"
              placeholder="Ex: 1234567890"
              value={accountNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountNumber(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="accountType">Account Type</label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAccountType(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="savings">Savings</option>
              <option value="current">Current</option>
              {/* Add more account types as needed */}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="bankBranch">Name of the bank branch</label>
            <input
              type="text"
              id="bankBranch"
              placeholder="As per your company address"
              value={bankBranch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBankBranch(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="ifscCode">IFSC Code</label>
            <input
              type="text"
              id="ifscCode"
              placeholder="As per your company address"
              value={ifscCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIfscCode(e.target.value)}
              required
            />
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

export default CompanyBankDetails;