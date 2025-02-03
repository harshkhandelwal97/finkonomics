import "./App.css";
import CompanyCard from "./components/companycard";
import landingPage from "./pages/LandingPage";
import Permission from "./pages/Permission";
import HistoryPage from "./pages/HistoryPage";
import CompanyLoginPage from "./pages/CompanyLoginPage";
import PhoneNumberScreen from "./pages/UserPhoneRegistration";
import OTPScreenPhone from "./pages/UserPhoneOtp";
import OTPScreen from "./pages/UserEmailOtp";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
// import UserRegistration from "./pages/UserRegistration";
import UserRegistrationPage from "./pages/UserRegistration";
import UserOtpScreen from "./pages/UserEmailOtp";
import Header1 from "./components/Header1";
import CompanyRegistrationPage from "./pages/CompanyRegistration";
import AdditionalDetailsPage from "./pages/CompanyFinancialRegistration";
import CompanyFinancialDetailsPage from "./pages/CompanyFinancialRegistration";
import CompanyBankDetails from "./pages/CompanyBankDetails";
import { NotificationsPage } from "./pages/NotificationPage";
import { PaymentReceipt } from "./pages/paymentReceipt";
function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header1 />
              <Homepage
                totalPoints={9875}
                totalValue="₹6325"
                savedAmount="₹5467"
              />
            
            </>
          }
        />
        <Route
          path="/permissions"
          element={
            <>
              <Permission />
              <Navbar />
            </>
          }
        />
        <Route path="/user/login" element={<LoginPage />} />

        <Route
          path="/history"
          element={
            <>
              <HistoryPage />
              <Navbar />
            </>
          }
        />
        <Route path="/user/register" element={<UserRegistrationPage />} />
        <Route
          path="/register/email-otp/verification"
          element={<UserOtpScreen />}
        />

      
        <Route
          path="/register/phone/verification"
          element={<PhoneNumberScreen />}
        />

         <Route
          path="/home/notification"
          element={<NotificationsPage />}
        />
        <Route
          path="/register/phone-otp/verification"
          element={<OTPScreenPhone />}
        />

          <Route
          path="/home/payment"
          element={<PaymentReceipt />}
        />
        <Route path="/company/register" element={<CompanyRegistrationPage />} />
        <Route path="/company/register/financial" element={<CompanyFinancialDetailsPage />} />
        <Route path="/company/register/financial/bank" element={<CompanyBankDetails />} />
      </Routes>
    </div>
  );
}

export default App;
