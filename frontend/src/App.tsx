import './App.css';
import CompanyCard from './components/companycard';
import landingPage from './pages/LandingPage';
import Permission from './pages/Permission';
import HistoryPage from './pages/HistoryPage';
import CompanyLoginPage from './pages/CompanyLoginPage';
import PhoneNumberScreen from './pages/UserPhoneRegistration';
import OTPScreenPhone from './pages/UserPhoneOtp';
import OTPScreen from './pages/UserEmailOtp';
import { Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import UserRegistration from './pages/UserRegistration';
import UserOtpScreen from './pages/UserEmailOtp';
function App() {

  return (
    <div className='App'>
      <Routes>

        <Route path='/' element={
          <>
            <Homepage
              totalPoints={9875}
              totalValue="₹6325"
              savedAmount="₹5467"
            />
            <Navbar />
          </>
        }
        />

        <Route path='/permissions' element={
          <>
            <Permission />
            <Navbar />
          </>
        } />
        <Route path='/user/login' element={<LoginPage />} />

        <Route path='/history' element={
          <>
            <HistoryPage />
            <Navbar />
          </>}
        />
        <Route path='/user/register' element={<UserRegistration />} />
        <Route path="/register/email-otp/verification" element={<UserOtpScreen />} />
        <Route path="/register/phone/verification" element={<PhoneNumberScreen />} />
        <Route path="/register/phone-otp/verification" element={<OTPScreenPhone />} />
      </Routes>
    </div>
  );
}


export default App;
