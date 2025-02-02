import './App.css';
// import CompanyCard from './components/companycard';
// import landingPage from './pages/LandingPage';\
// import Permission from './pages/Permission';
// import LoginPage from './pages/loginPage';
// import HistoryPage from './pages/HistoryPage';
// import  Homepage  from  './pages/HomePage'
import { Homepage } from './pages/HomePage';
import CompanyLoginPage from './pages/CompanyLoginPage';
import URegistrationForm from './pages/UserRegistration';
import PhoneNumberScreen from './pages/UserPhoneRegistration';
import OTPScreenPhone from './pages/UserPhoneOtp';
import OTPScreen from './pages/UserEmailOtp';
function App()
{

  return (
    <div className='App'>
      {/* <Permission /> */}
      {/* <LoginPage/> */}
      {/* <HistoryPage/> */}
      {/* <Homepage
        totalPoints={9875}
        totalValue="₹6325"
        savedAmount="₹5467"
      /> */}
      {/* <CompanyLoginPage/> */}
      {/* <URegistrationForm/> */}
      {/* <PhoneNumberScreen /> */}
      <OTPScreen/>
    </div>
  );
}


export default App;
